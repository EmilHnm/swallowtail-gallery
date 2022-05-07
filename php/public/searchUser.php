<?php
require_once '../_connection.php';
require_once '../_function.php';
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    $condition = $request->search;

    $sstatement = $pdo->prepare("SELECT * FROM user WHERE username LIKE '%$condition%'");
    $sstatement->execute();
    $data = $sstatement->fetchAll(PDO::FETCH_ASSOC);
    if (count($data) > 0) {
        echo json_encode($data);
        http_response_code(201);
    } else {
        return http_response_code(401);
    }
}
