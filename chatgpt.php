<?php
// ChatGPT Integration PHP backend

header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);
$userMessage = $input["message"] ?? "";

$apiKey = "YOUR_OPENAI_API_KEY"; // <-- Replace with your key

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.openai.com/v1/chat/completions",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer $apiKey"
  ],
  CURLOPT_POSTFIELDS => json_encode([
    "model" => "gpt-3.5-turbo",
    "messages" => [
      ["role" => "system", "content" => "You are a helpful AI assistant for Karan Bitalkar's portfolio website."],
      ["role" => "user", "content" => $userMessage]
    ],
    "max_tokens" => 150,
    "temperature" => 0.7
  ])
]);

$response = curl_exec($curl);
curl_close($curl);

if ($response) {
  $result = json_decode($response, true);
  $reply = $result["choices"][0]["message"]["content"] ?? "I'm not sure how to respond.";
  echo json_encode(["reply" => $reply]);
} else {
  echo json_encode(["reply" => "API request failed."]);
}
?>
