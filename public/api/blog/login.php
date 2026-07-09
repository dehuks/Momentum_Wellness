<?php

require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    blog_json(405, ['success' => false, 'error' => 'Method not allowed']);
}

$body = json_decode(file_get_contents('php://input'), true) ?: [];
$email = isset($body['email']) ? trim(strtolower($body['email'])) : '';
$password = isset($body['password']) ? (string) $body['password'] : '';

if (!$email || !$password) {
    blog_json(400, ['success' => false, 'error' => 'Email and password are required']);
}

$pdo = blog_db();

$attemptStmt = $pdo->prepare(
    'SELECT COUNT(*) FROM blog_login_attempts WHERE email = ? AND attempted_at > (NOW() - INTERVAL 15 MINUTE)'
);
$attemptStmt->execute([$email]);
if ((int) $attemptStmt->fetchColumn() >= 5) {
    blog_json(429, ['success' => false, 'error' => 'Too many failed attempts. Try again in 15 minutes.']);
}

$stmt = $pdo->prepare('SELECT id, name, email, password_hash, role FROM blog_users WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    $pdo->prepare('INSERT INTO blog_login_attempts (email) VALUES (?)')->execute([$email]);
    blog_json(401, ['success' => false, 'error' => 'Invalid email or password']);
}

$pdo->prepare('DELETE FROM blog_login_attempts WHERE email = ?')->execute([$email]);

blog_session_start();
session_regenerate_id(true);
$_SESSION['blog_user'] = [
    'id' => (int) $user['id'],
    'name' => $user['name'],
    'email' => $user['email'],
    'role' => $user['role'],
];

blog_json(200, ['success' => true, 'user' => $_SESSION['blog_user']]);
