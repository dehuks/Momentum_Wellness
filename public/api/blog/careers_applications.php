<?php

require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    blog_json(405, ['success' => false, 'error' => 'Method not allowed']);
}

blog_require_role(['admin', 'editor']);

$pdo = blog_db();
$stmt = $pdo->query(
    'SELECT id, name, email, phone, message, cv_path, cover_letter_path, created_at
     FROM career_applications ORDER BY created_at DESC'
);

blog_json(200, ['success' => true, 'applications' => $stmt->fetchAll()]);
