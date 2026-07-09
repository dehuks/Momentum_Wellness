<?php

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/slug.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    blog_json(405, ['success' => false, 'error' => 'Method not allowed']);
}

blog_require_ajax_header();
$user = blog_require_login();

$body = json_decode(file_get_contents('php://input'), true) ?: [];
$title = trim($body['title'] ?? '');
$excerpt = trim($body['excerpt'] ?? '');
$content = $body['content'] ?? '';
$featuredImage = trim($body['featured_image'] ?? '');
$status = ($body['status'] ?? 'draft') === 'published' ? 'published' : 'draft';

if (!$title || !$content) {
    blog_json(400, ['success' => false, 'error' => 'Title and content are required']);
}

$pdo = blog_db();
$slug = blog_unique_slug($pdo, $title);
$publishedAt = $status === 'published' ? date('Y-m-d H:i:s') : null;

$stmt = $pdo->prepare(
    'INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, status, author_id, published_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
);
$stmt->execute([$title, $slug, $excerpt, $content, $featuredImage ?: null, $status, $user['id'], $publishedAt]);

blog_json(200, ['success' => true, 'id' => (int) $pdo->lastInsertId(), 'slug' => $slug]);
