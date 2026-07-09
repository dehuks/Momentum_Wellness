<?php

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/slug.php';

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
$stmt = $pdo->prepare('SELECT * FROM blog_posts WHERE id = ?');
$stmt->execute([$id]);
$post = $stmt->fetch();

if (!$post) {
    blog_json(404, ['success' => false, 'error' => 'Post not found']);
}

$canManage = in_array($user['role'], ['editor', 'admin'], true) || (int) $post['author_id'] === (int) $user['id'];
if (!$canManage) {
    blog_json(403, ['success' => false, 'error' => 'Forbidden']);
}

$title = trim($body['title'] ?? $post['title']);
$excerpt = trim($body['excerpt'] ?? $post['excerpt']);
$content = $body['content'] ?? $post['content'];
$featuredImage = trim($body['featured_image'] ?? $post['featured_image'] ?? '');
$status = isset($body['status']) && $body['status'] === 'published' ? 'published' : (isset($body['status']) ? 'draft' : $post['status']);

if (!$title || !$content) {
    blog_json(400, ['success' => false, 'error' => 'Title and content are required']);
}

$slug = $title !== $post['title'] ? blog_unique_slug($pdo, $title, $id) : $post['slug'];
$publishedAt = $post['published_at'];
if ($status === 'published' && !$publishedAt) {
    $publishedAt = date('Y-m-d H:i:s');
}

$stmt = $pdo->prepare(
    'UPDATE blog_posts SET title = ?, slug = ?, excerpt = ?, content = ?, featured_image = ?, status = ?, published_at = ?
     WHERE id = ?'
);
$stmt->execute([$title, $slug, $excerpt, $content, $featuredImage ?: null, $status, $publishedAt, $id]);

blog_json(200, ['success' => true, 'id' => $id, 'slug' => $slug]);
