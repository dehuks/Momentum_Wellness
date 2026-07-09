<?php

require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    blog_json(405, ['success' => false, 'error' => 'Method not allowed']);
}

$user = blog_current_user();

if (!$user) {
    blog_json(401, ['success' => false, 'error' => 'Not authenticated']);
}

blog_json(200, ['success' => true, 'user' => $user]);
