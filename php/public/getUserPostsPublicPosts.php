<?php
require_once '../_connection.php';
require_once '../_function.php';
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    //validate the request

    $uid = $request->id;
    $statement = $pdo->prepare("SELECT * FROM post WHERE uid = :uid AND visibility = :visibility");
    $statement->bindValue(':uid', $uid);
    $statement->bindValue(':visibility', 1);
    $statement->execute();
    $data = $statement->fetchAll(PDO::FETCH_ASSOC);
    if (count($data) > 0) {
        echo json_encode($data);
        http_response_code(201);
    } else {
        return http_response_code(401);
    }
}
