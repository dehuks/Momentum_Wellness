<?php

require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    blog_json(405, ['success' => false, 'error' => 'Method not allowed']);
}

blog_require_ajax_header();
blog_require_login();

if (empty($_FILES['image'])) {
    // If the whole request body exceeded post_max_size, PHP discards $_FILES
    // entirely before this script runs - that's the overwhelmingly common
    // cause of an empty upload, so say so instead of a bare "no image".
    if (empty($_POST) && (int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 0) {
        blog_json(400, ['success' => false, 'error' => 'Image is too large for the server to accept. Please use a file under 10MB.']);
    }
    blog_json(400, ['success' => false, 'error' => 'No image uploaded']);
}

$file = $_FILES['image'];

if ($file['error'] === UPLOAD_ERR_INI_SIZE || $file['error'] === UPLOAD_ERR_FORM_SIZE) {
    blog_json(400, ['success' => false, 'error' => 'Image is too large for the server to accept. Try a smaller file (under 10MB).']);
}

if ($file['error'] !== UPLOAD_ERR_OK) {
    blog_json(400, ['success' => false, 'error' => 'Upload failed (error code ' . $file['error'] . ')']);
}

$maxBytes = 10 * 1024 * 1024;

if ($file['size'] > $maxBytes) {
    blog_json(400, ['success' => false, 'error' => 'Image must be under 10MB']);
}

$imageInfo = @getimagesize($file['tmp_name']);
if ($imageInfo === false) {
    blog_json(400, ['success' => false, 'error' => 'File is not a valid image']);
}

$allowedTypes = [
    IMAGETYPE_JPEG => 'jpg',
    IMAGETYPE_PNG => 'png',
    IMAGETYPE_WEBP => 'webp',
    IMAGETYPE_GIF => 'gif',
];

$extension = $allowedTypes[$imageInfo[2]] ?? null;
if (!$extension) {
    blog_json(400, ['success' => false, 'error' => 'Only JPG, PNG, WEBP, or GIF images are allowed']);
}

$uploadDir = __DIR__ . '/../../uploads/blog';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$filename = bin2hex(random_bytes(16)) . '.' . $extension;
$destination = $uploadDir . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
    blog_json(500, ['success' => false, 'error' => 'Failed to save image']);
}

blog_json(200, ['success' => true, 'url' => '/uploads/blog/' . $filename]);
