<?php
require_once '../_connection.php';
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    //validate the request
    if (trim($request->password) === '' || trim($request->email) === '') {
        return http_response_code(400);
    }
    // get data from database
    $email = $request->email;
    $password = $request->password;
    $statement = $pdo->prepare("SELECT uid,username,email,hearted FROM user WHERE email = :email AND password = :password");
    $statement->bindValue(':email', $email);
    $statement->bindValue(':password', $password);
    $statement->execute();
    $user = $statement->fetchAll(PDO::FETCH_ASSOC);
    if (count($user) > 0) {
        echo json_encode($user);
        http_response_code(201);
    } else {
        return http_response_code(401);
    }
}
