<?php

// Copy this file to config.php (gitignored) and fill in real values locally,
// or rely on getenv() in production the same way public/paystack/verify.php
// reads PAYSTACK_SECRET_KEY from the hosting environment.

return [
    'db_host' => getenv('BLOG_DB_HOST') ?: '127.0.0.1',
    'db_name' => getenv('BLOG_DB_NAME') ?: 'blog',
    'db_user' => getenv('BLOG_DB_USER') ?: 'root',
    'db_pass' => getenv('BLOG_DB_PASS') ?: '',
    // Set to true only when serving over HTTPS (prod). Keeping it false in
    // local dev lets the session cookie work over plain http://localhost.
    'secure_cookies' => (bool) (getenv('BLOG_SECURE_COOKIES') ?: false),
];
