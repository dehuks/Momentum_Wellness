<?php

require_once __DIR__ . '/db.php';

function blog_session_start(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $config = require __DIR__ . '/config.php';

    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax',
        'secure' => $config['secure_cookies'],
    ]);

    session_name('blog_session');
    session_start();
}

function blog_json(int $status, array $body): void
{
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($body);
    exit();
}

// Mitigates CSRF on same-origin cookie auth: a cross-site form post can't set
// custom headers, so requiring one on every mutating request blocks the
// simplest forged-request attacks without needing a token round-trip.
function blog_require_ajax_header(): void
{
    if (($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') !== 'XMLHttpRequest') {
        blog_json(403, ['success' => false, 'error' => 'Forbidden']);
    }
}

function blog_current_user(): ?array
{
    blog_session_start();
    return $_SESSION['blog_user'] ?? null;
}

function blog_require_login(): array
{
    $user = blog_current_user();
    if (!$user) {
        blog_json(401, ['success' => false, 'error' => 'Not authenticated']);
    }
    return $user;
}

function blog_require_role(array $roles): array
{
    $user = blog_require_login();
    if (!in_array($user['role'], $roles, true)) {
        blog_json(403, ['success' => false, 'error' => 'Forbidden']);
    }
    return $user;
}
