<?php
/**
 * Paystack Transaction Verification
 *
 * Upload this file to: public_html/paystack/verify.php on HostAfrica cPanel
 *
 * Set PAYSTACK_SECRET_KEY in cPanel → Software → Environment Variables
 * Do NOT hardcode the secret key here.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

// Get secret key from cPanel environment variables
$secret = getenv('PAYSTACK_SECRET_KEY');

if (!$secret) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server configuration error']);
    exit();
}

// Parse request body
$body = json_decode(file_get_contents('php://input'), true);
$reference = isset($body['reference']) ? trim($body['reference']) : '';

if (!$reference) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'No transaction reference provided']);
    exit();
}

// Verify with Paystack API
$url = 'https://api.paystack.co/transaction/verify/' . urlencode($reference);

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $secret,
        'Cache-Control: no-cache',
    ],
    CURLOPT_TIMEOUT => 30,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Could not reach Paystack']);
    exit();
}

$result = json_decode($response, true);

if (
    $httpCode === 200 &&
    isset($result['data']['status']) &&
    $result['data']['status'] === 'success'
) {
    echo json_encode([
        'success'   => true,
        'amount'    => $result['data']['amount'] / 100, // convert from kobo to KES
        'reference' => $reference,
        'email'     => $result['data']['customer']['email'] ?? '',
    ]);
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error'   => $result['message'] ?? 'Verification failed',
    ]);
}
