<?php

require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    blog_json(405, ['success' => false, 'error' => 'Method not allowed']);
}

$pdo = blog_db();
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

$attemptStmt = $pdo->prepare(
    'SELECT COUNT(*) FROM career_submit_attempts WHERE ip_address = ? AND attempted_at > (NOW() - INTERVAL 1 HOUR)'
);
$attemptStmt->execute([$ip]);
if ((int) $attemptStmt->fetchColumn() >= 5) {
    blog_json(429, ['success' => false, 'error' => 'Too many submissions from this connection. Please try again later.']);
}

$pdo->prepare('INSERT INTO career_submit_attempts (ip_address) VALUES (?)')->execute([$ip]);

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');

if (!$name || !$email || !$message) {
    blog_json(400, ['success' => false, 'error' => 'Name, email, and message are required']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    blog_json(400, ['success' => false, 'error' => 'Please enter a valid email address']);
}

if (empty($_FILES['cv'])) {
    blog_json(400, ['success' => false, 'error' => 'A CV is required']);
}

function careers_save_upload(array $file, string $uploadDir): array
{
    if ($file['error'] === UPLOAD_ERR_INI_SIZE || $file['error'] === UPLOAD_ERR_FORM_SIZE) {
        return ['error' => 'File is too large for the server to accept. Please use a file under 5MB.'];
    }
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return ['error' => 'Upload failed (error code ' . $file['error'] . ')'];
    }

    $maxBytes = 5 * 1024 * 1024;
    if ($file['size'] > $maxBytes) {
        return ['error' => 'File must be under 5MB'];
    }

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    $allowed = [
        'application/pdf' => 'pdf',
        'application/msword' => 'doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
    ];

    $extension = $allowed[$mime] ?? null;
    if (!$extension) {
        return ['error' => 'Only PDF, DOC, or DOCX files are allowed'];
    }

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $filename = bin2hex(random_bytes(16)) . '.' . $extension;
    $destination = $uploadDir . '/' . $filename;

    if (!move_uploaded_file($file['tmp_name'], $destination)) {
        return ['error' => 'Failed to save file'];
    }

    return ['path' => '/uploads/careers/' . $filename];
}

$uploadDir = __DIR__ . '/../../uploads/careers';

$cvResult = careers_save_upload($_FILES['cv'], $uploadDir);
if (isset($cvResult['error'])) {
    blog_json(400, ['success' => false, 'error' => $cvResult['error']]);
}

$coverLetterPath = null;
if (!empty($_FILES['cover_letter']) && $_FILES['cover_letter']['error'] !== UPLOAD_ERR_NO_FILE) {
    $clResult = careers_save_upload($_FILES['cover_letter'], $uploadDir);
    if (isset($clResult['error'])) {
        blog_json(400, ['success' => false, 'error' => $clResult['error']]);
    }
    $coverLetterPath = $clResult['path'];
}

$stmt = $pdo->prepare(
    'INSERT INTO career_applications (name, email, phone, message, cv_path, cover_letter_path) VALUES (?, ?, ?, ?, ?, ?)'
);
$stmt->execute([$name, $email, $phone ?: null, $message, $cvResult['path'], $coverLetterPath]);

blog_json(200, ['success' => true]);
