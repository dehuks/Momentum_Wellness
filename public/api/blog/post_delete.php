<?php

require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    blog_json(405, ['success' => false, 'error' => 'Method not allowed']);
}

blog_require_ajax_header();
$user = blog_require_login();

$body = json_decode(file_get_contents('php://input'), true) ?: [];
$id = (int) ($body['id'] ?? 0);

if (!$id) {
    blog_json(400, ['success' => false, 'error' => 'Post id is required']);
}

$pdo = blog_db();
$stmt = $pdo->prepare('SELECT author_id FROM blog_posts WHERE id = ?');
$stmt->execute([$id]);
$post = $stmt->fetch();

if (!$post) {
    blog_json(404, ['success' => false, 'error' => 'Post not found']);
}

$canManage = in_array($user['role'], ['editor', 'admin'], true) || (int) $post['author_id'] === (int) $user['id'];
if (!$canManage) {
    blog_json(403, ['success' => false, 'error' => 'Forbidden']);
}

$pdo->prepare('DELETE FROM blog_posts WHERE id = ?')->execute([$id]);

blog_json(200, ['success' => true]);
