<?php

require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    blog_json(405, ['success' => false, 'error' => 'Method not allowed']);
}

blog_session_start();
$_SESSION = [];
session_destroy();

blog_json(200, ['success' => true]);
