<?php

require_once __DIR__ . '/auth.php';

$admin = blog_require_role(['admin']);
$pdo = blog_db();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT id, name, email, role, created_at FROM blog_users ORDER BY created_at DESC');
    blog_json(200, ['success' => true, 'users' => $stmt->fetchAll()]);
}

blog_require_ajax_header();

if ($method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true) ?: [];
    $name = trim($body['name'] ?? '');
    $email = trim(strtolower($body['email'] ?? ''));
    $password = (string) ($body['password'] ?? '');
    $role = in_array($body['role'] ?? '', ['admin', 'editor', 'author'], true) ? $body['role'] : 'author';

    if (!$name || !$email || strlen($password) < 8) {
        blog_json(400, ['success' => false, 'error' => 'Name, email, and a password of at least 8 characters are required']);
    }

    $exists = $pdo->prepare('SELECT id FROM blog_users WHERE email = ?');
    $exists->execute([$email]);
    if ($exists->fetch()) {
        blog_json(409, ['success' => false, 'error' => 'A user with that email already exists']);
    }

    $stmt = $pdo->prepare('INSERT INTO blog_users (name, email, password_hash, role) VALUES (?, ?, ?, ?)');
    $stmt->execute([$name, $email, password_hash($password, PASSWORD_BCRYPT), $role]);

    blog_json(200, ['success' => true, 'id' => (int) $pdo->lastInsertId()]);
}

if ($method === 'PUT') {
    $body = json_decode(file_get_contents('php://input'), true) ?: [];
    $id = (int) ($body['id'] ?? 0);
    if (!$id) {
        blog_json(400, ['success' => false, 'error' => 'User id is required']);
    }

    $fields = [];
    $params = [];

    if (!empty($body['name'])) {
        $fields[] = 'name = ?';
        $params[] = trim($body['name']);
    }
    if (!empty($body['role']) && in_array($body['role'], ['admin', 'editor', 'author'], true)) {
        $fields[] = 'role = ?';
        $params[] = $body['role'];
    }
    if (!empty($body['password'])) {
        if (strlen($body['password']) < 8) {
            blog_json(400, ['success' => false, 'error' => 'Password must be at least 8 characters']);
        }
        $fields[] = 'password_hash = ?';
        $params[] = password_hash($body['password'], PASSWORD_BCRYPT);
    }

    if (!$fields) {
        blog_json(400, ['success' => false, 'error' => 'Nothing to update']);
    }

    $params[] = $id;
    $pdo->prepare('UPDATE blog_users SET ' . implode(', ', $fields) . ' WHERE id = ?')->execute($params);

    blog_json(200, ['success' => true]);
}

if ($method === 'DELETE') {
    parse_str(file_get_contents('php://input'), $params2);
    $id = (int) ($_GET['id'] ?? $params2['id'] ?? 0);
    if (!$id) {
        blog_json(400, ['success' => false, 'error' => 'User id is required']);
    }
    if ($id === (int) $admin['id']) {
        blog_json(400, ['success' => false, 'error' => 'You cannot delete your own account']);
    }

    $pdo->prepare('DELETE FROM blog_users WHERE id = ?')->execute([$id]);
    blog_json(200, ['success' => true]);
}

blog_json(405, ['success' => false, 'error' => 'Method not allowed']);
