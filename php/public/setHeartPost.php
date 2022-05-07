<?php
require_once '../_connection.php';
require_once '../_function.php';
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    //validate the request
    $hearted = $request->hearted;
    $uid = $request->uid;
    $statmentUpdateHeart = $pdo->prepare("UPDATE user SET hearted = :hearted WHERE uid = :uid");
    $statmentUpdateHeart->bindValue(':hearted', $hearted);
    $statmentUpdateHeart->bindValue(':uid', $uid);
    $statmentUpdateHeart->execute();
}
