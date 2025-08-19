<?php
// Define que a resposta será em formato JSON
header('Content-Type: application/json');

// --- CONFIGURAÇÃO ---
$makeWebhookUrl = 'https://hook.us2.make.com/vtas7k9o1rr3wgkm8rangfnnvm3l1a9e';

// --- SEGURANÇA ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método não permitido.']);
    exit;
}

// --- LÓGICA PRINCIPAL ---
$jsonInput = file_get_contents('php://input');
$data = json_decode($jsonInput);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'JSON inválido.']);
    exit;
}

$ch = curl_init($makeWebhookUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonInput);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($jsonInput)
]);

$response = curl_exec($ch);
$httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// --- RESPOSTA CORRIGIDA ---
if ($httpStatusCode == 200) {
    // Se o Make.com respondeu com sucesso, envie uma confirmação para o React.
    http_response_code(200); // 200 OK
    echo json_encode(['status' => 'success', 'message' => 'Lead enviado com sucesso.']);
} else {
    // Se houve erro, informe o React.
    http_response_code(502); // 502 Bad Gateway
    echo json_encode([
        'status' => 'error',
        'message' => 'O servidor intermediário falhou ao contatar o serviço de automação.',
        'upstream_status' => $httpStatusCode
    ]);
}
?>  