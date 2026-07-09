<?php

require_once __DIR__ . '/auth.php';

$pdo = blog_db();
$method = $_SERVER['REQUEST_METHOD'];

// Public read - the live site needs this with no login to render pages.
if ($method === 'GET') {
    $stmt = $pdo->query('SELECT content_key, image_url FROM site_images');
    $images = [];
    foreach ($stmt->fetchAll() as $row) {
        $images[$row['content_key']] = $row['image_url'];
    }
    blog_json(200, ['success' => true, 'images' => $images]);
}

blog_require_role(['admin']);
blog_require_ajax_header();

if ($method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true) ?: [];
    $key = trim($body['key'] ?? '');
    $url = trim($body['image_url'] ?? '');

    if (!$key || !$url) {
        blog_json(400, ['success' => false, 'error' => 'key and image_url are required']);
    }

    $stmt = $pdo->prepare(
        'INSERT INTO site_images (content_key, image_url) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE image_url = VALUES(image_url)'
    );
    $stmt->execute([$key, $url]);

    blog_json(200, ['success' => true]);
}

if ($method === 'DELETE') {
    parse_str(file_get_contents('php://input'), $params);
    $key = trim($_GET['key'] ?? $params['key'] ?? '');

    if (!$key) {
        blog_json(400, ['success' => false, 'error' => 'key is required']);
    }

    $pdo->prepare('DELETE FROM site_images WHERE content_key = ?')->execute([$key]);
    blog_json(200, ['success' => true]);
}

blog_json(405, ['success' => false, 'error' => 'Method not allowed']);
