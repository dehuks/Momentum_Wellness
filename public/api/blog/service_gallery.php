<?php

require_once __DIR__ . '/auth.php';

$pdo = blog_db();
$method = $_SERVER['REQUEST_METHOD'];

// Public read - the Services detail page needs this with no login.
if ($method === 'GET') {
    $key = trim($_GET['key'] ?? '');
    if (!$key) {
        blog_json(400, ['success' => false, 'error' => 'key is required']);
    }

    $stmt = $pdo->prepare(
        'SELECT id, image_url, caption FROM service_gallery WHERE service_key = ? ORDER BY sort_order ASC, id ASC'
    );
    $stmt->execute([$key]);
    blog_json(200, ['success' => true, 'images' => $stmt->fetchAll()]);
}

blog_require_role(['admin']);
blog_require_ajax_header();

if ($method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true) ?: [];
    $key = trim($body['service_key'] ?? '');
    $url = trim($body['image_url'] ?? '');
    $caption = trim($body['caption'] ?? '');

    if (!$key || !$url) {
        blog_json(400, ['success' => false, 'error' => 'service_key and image_url are required']);
    }

    $orderStmt = $pdo->prepare('SELECT COALESCE(MAX(sort_order), -1) + 1 FROM service_gallery WHERE service_key = ?');
    $orderStmt->execute([$key]);
    $nextOrder = (int) $orderStmt->fetchColumn();

    $stmt = $pdo->prepare(
        'INSERT INTO service_gallery (service_key, image_url, caption, sort_order) VALUES (?, ?, ?, ?)'
    );
    $stmt->execute([$key, $url, $caption ?: null, $nextOrder]);

    blog_json(200, ['success' => true, 'id' => (int) $pdo->lastInsertId()]);
}

if ($method === 'PUT') {
    $body = json_decode(file_get_contents('php://input'), true) ?: [];
    $id = (int) ($body['id'] ?? 0);
    $caption = trim($body['caption'] ?? '');

    if (!$id) {
        blog_json(400, ['success' => false, 'error' => 'id is required']);
    }

    $pdo->prepare('UPDATE service_gallery SET caption = ? WHERE id = ?')->execute([$caption ?: null, $id]);
    blog_json(200, ['success' => true]);
}

if ($method === 'DELETE') {
    parse_str(file_get_contents('php://input'), $params);
    $id = (int) ($_GET['id'] ?? $params['id'] ?? 0);

    if (!$id) {
        blog_json(400, ['success' => false, 'error' => 'id is required']);
    }

    $pdo->prepare('DELETE FROM service_gallery WHERE id = ?')->execute([$id]);
    blog_json(200, ['success' => true]);
}

blog_json(405, ['success' => false, 'error' => 'Method not allowed']);
