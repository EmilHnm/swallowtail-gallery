<?php
require_once '../_connection.php';
require_once '../_function.php';
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    //validate the request

    $id = $request->id;
    $statement = $pdo->prepare("SELECT uid, username, email, avatarImg, hearted FROM user WHERE uid = :uid");
    $statement->bindValue(':uid', $id);
    $statement->execute();
    $data = $statement->fetchAll(PDO::FETCH_ASSOC);
    if (count($data) > 0) {
        echo json_encode($data);
        http_response_code(201);
    } else {
        return http_response_code(401);
    }
}
