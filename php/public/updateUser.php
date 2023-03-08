<?php
require_once '../_connection.php';
require_once '../_function.php';
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    $uid = $request->uid;
    $username = $request->username;
    $email = $request->email;
    $statement = $pdo->prepare("SELECT * FROM `user` WHERE `email` = :email AND `uid` != :uid");
    $statement->bindValue(':email', $email);
    $statement->bindValue(':uid', $uid);
    $statement->execute();
    $data = $statement->fetchAll(PDO::FETCH_ASSOC);
    if (count($data) > 0) {
        return http_response_code(401);
    } else {
        $statement = $pdo->prepare("UPDATE `user` SET `username` = :username, `email` = :email WHERE `uid` = :uid");
        $statement->bindValue(':username', $username);
        $statement->bindValue(':email', $email);
        $statement->bindValue(':uid', $uid);
        $statement->execute();
        return http_response_code(201);
    }
}
