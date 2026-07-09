<?php

// One-time CLI script to create the first admin account, since users.php
// requires an existing admin to create more users. Run locally or over SSH:
//   php bootstrap_admin.php "Jane Doe" jane@example.com "a-strong-password"
// Refuses to run over HTTP so it can't be used as an open account-creation endpoint.

if (php_sapi_name() !== 'cli') {
    http_response_code(403);
    exit('Forbidden');
}

require_once __DIR__ . '/db.php';

[$script, $name, $email, $password] = array_pad($argv, 4, null);

if (!$name || !$email || !$password) {
    fwrite(STDERR, "Usage: php bootstrap_admin.php <name> <email> <password>\n");
    exit(1);
}

if (strlen($password) < 8) {
    fwrite(STDERR, "Password must be at least 8 characters\n");
    exit(1);
}

$pdo = blog_db();

$existing = $pdo->prepare('SELECT id FROM blog_users WHERE email = ?');
$existing->execute([strtolower($email)]);
if ($existing->fetch()) {
    fwrite(STDERR, "A user with that email already exists\n");
    exit(1);
}

$stmt = $pdo->prepare('INSERT INTO blog_users (name, email, password_hash, role) VALUES (?, ?, ?, ?)');
$stmt->execute([$name, strtolower($email), password_hash($password, PASSWORD_BCRYPT), 'admin']);

echo "Created admin user #" . $pdo->lastInsertId() . " ($email)\n";
