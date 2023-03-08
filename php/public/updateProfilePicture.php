<?php
require_once '../_connection.php';
require_once '../_function.php';

$uid = $_POST['uid'];
$image = $_POST['image'];

$statment = $pdo->prepare("UPDATE `user` SET `avatarImg` = :imgPath WHERE `uid` = :uid");
$statment->bindValue(':imgPath', $image);
$statment->bindValue(':uid', $uid);
$statment->execute();
