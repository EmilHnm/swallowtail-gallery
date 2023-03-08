<?php
require_once '../_connection.php';
require_once '../_function.php';

$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    //validate the request

    $uid = $request->id;
    $statementGetUser = $pdo->prepare("SELECT uid,username,email,avatarImg,hearted FROM user WHERE uid = :uid");
    $statementGetUser->bindValue(':uid', $uid);
    $statementGetUser->execute();
    $data = $statementGetUser->fetchAll(PDO::FETCH_ASSOC);
    $data = $data[0];
    $statementGetUserPostCount = $pdo->prepare("SELECT COUNT(*) FROM post WHERE uid = :uid");
    $statementGetUserPostCount->bindValue(':uid', $uid);
    $statementGetUserPostCount->execute();
    $data['postCount'] = $statementGetUserPostCount->fetchColumn();
    if (count($data) > 0) {
        echo json_encode($data);
        http_response_code(201);
    } else {
        return http_response_code(401);
    }
}
