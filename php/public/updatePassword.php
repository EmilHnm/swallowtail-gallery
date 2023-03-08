<?php
require_once '../_connection.php';
require_once '../_function.php';
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    $uid = $request->uid;
    $password = $request->password;
    $oldPassword = $request->oldPassword;
    echo $oldPassword;
    $statement = $pdo->prepare("SELECT * FROM `user` WHERE `password` = :oldPassword AND `uid` = :uid");
    $statement->bindValue(':oldPassword', $oldPassword);
    $statement->bindValue(':uid', $uid);
    $statement->execute();
    $data = $statement->fetchAll(PDO::FETCH_ASSOC);
    if (count($data) == 0) {
        return http_response_code(401);
    } else {
        $statement = $pdo->prepare("UPDATE `user` SET `password` = :password WHERE `uid` = :uid");
        $statement->bindValue(':password', $password);
        $statement->bindValue(':uid', $uid);
        $statement->execute();
        return http_response_code(201);
    }
}
