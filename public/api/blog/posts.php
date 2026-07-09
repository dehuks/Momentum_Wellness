<?php

require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    blog_json(405, ['success' => false, 'error' => 'Method not allowed']);
}

$pdo = blog_db();
$user = blog_current_user();

// Single post by slug (public) or id (admin editor - requires auth)
if (!empty($_GET['slug']) || !empty($_GET['id'])) {
    if (!empty($_GET['id'])) {
        blog_require_login();
        $stmt = $pdo->prepare(
            'SELECT p.*, u.name AS author_name FROM blog_posts p
             JOIN blog_users u ON u.id = p.author_id
             WHERE p.id = ?'
        );
        $stmt->execute([(int) $_GET['id']]);
    } else {
        $stmt = $pdo->prepare(
            'SELECT p.*, u.name AS author_name FROM blog_posts p
             JOIN blog_users u ON u.id = p.author_id
             WHERE p.slug = ?'
        );
        $stmt->execute([$_GET['slug']]);
    }
    $post = $stmt->fetch();

    if (!$post) {
        blog_json(404, ['success' => false, 'error' => 'Post not found']);
    }

    $isOwner = $user && ((int) $user['id'] === (int) $post['author_id'] || in_array($user['role'], ['editor', 'admin'], true));
    if ($post['status'] !== 'published' && !$isOwner) {
        blog_json(404, ['success' => false, 'error' => 'Post not found']);
    }

    blog_json(200, ['success' => true, 'post' => $post]);
}

// List
$page = max(1, (int) ($_GET['page'] ?? 1));
$pageSize = min(50, max(1, (int) ($_GET['page_size'] ?? 12)));
$offset = ($page - 1) * $pageSize;

$wantsAll = !empty($_GET['all']) && $user;

$where = 'WHERE p.status = "published"';
$params = [];

if ($wantsAll) {
    if ($user['role'] === 'author') {
        $where = 'WHERE p.author_id = ?';
        $params[] = $user['id'];
    } else {
        // editor/admin see every post regardless of status or author
        $where = '';
    }
}

$countStmt = $pdo->prepare("SELECT COUNT(*) FROM blog_posts p $where");
$countStmt->execute($params);
$total = (int) $countStmt->fetchColumn();

$sql = "SELECT p.*, u.name AS author_name FROM blog_posts p
        JOIN blog_users u ON u.id = p.author_id
        $where
        ORDER BY p.created_at DESC
        LIMIT $pageSize OFFSET $offset";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$posts = $stmt->fetchAll();

blog_json(200, [
    'success' => true,
    'posts' => $posts,
    'page' => $page,
    'page_size' => $pageSize,
    'total' => $total,
]);
