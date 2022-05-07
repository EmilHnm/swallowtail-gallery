<?php
require_once '../_connection.php';
require_once '../_function.php';
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {

    $request = json_decode($postdata);
    //validate the request
    if (trim($request->username) === '' || trim($request->password) === '' || trim($request->email) === '') {
        return http_response_code(400);
    }
    $username = trim($request->username);
    $password = trim($request->password);
    $email = trim($request->email);
    $uid = '';
    do {
        $uid = generateRandomString(8);
    } while (checkDatabase($uid, 2));

    $hearted = "[]";
    if (checkDatabase($email, 0)) {
        return http_response_code(401);
    }

    $statment = $pdo->prepare("INSERT INTO user (username,password,email,uid,hearted) 
                                VALUES (:username,:password, :email, :uid, :hearted)");
    $statment->bindValue(':username', $username);
    $statment->bindValue(':password', $password);
    $statment->bindValue(':email', $email);
    $statment->bindValue(':uid', $uid);
    $statment->bindValue(':hearted', $hearted);
    $statment->execute();
    $user = [
        'username' => $username,
        'email' => $email,
        'uid' => $uid,
        'hearted' => $hearted
    ];
    echo json_encode($user);
    http_response_code(201);
}
