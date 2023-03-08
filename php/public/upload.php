<?php
require_once '../_connection.php';
require_once '../_function.php';



$title = $_POST['title'];
$description = $_POST['description'];
$visibility = $_POST['visibility'];
$image = $_POST['image'];
$uid = $_POST['uid'];
$date = date("Y-m-d");
$id = '';
do {
    $id = generateRandomString(10);
    $statement = $pdo->prepare("SELECT * FROM `post` WHERE `id` = :id");
    $statement->bindValue(':id', $id);
    $statement->execute();
    $data = $statement->fetchAll(PDO::FETCH_ASSOC);
} while (count($data) > 0);

error_reporting(E_ERROR | E_PARSE);
$statment = $pdo->prepare("INSERT INTO post"
    . "(title,description,visibility,imagePath,uid,id,create_date)"
    . "VALUES (:title,:description,:visibility,:image,:uid,:id,:create_date)");
$statment->bindValue(':title', $title);
$statment->bindValue(':description', $description);
$statment->bindValue(':visibility', $visibility == 'public' ? 1 : 0);
$statment->bindParam(':image', $image, PDO::PARAM_LOB);
$statment->bindValue(':uid', $uid);
$statment->bindValue(':id', $id);
$statment->bindValue(':create_date', $date);
$statment->execute();



$post = [
    'title' => $title,
    'description' => $description,
    'visibility' => $visibility == 'public' ? 1 : 0,
    'image' => $image,
    'uid' => $uid,
    'id' => $id,
    'create_date' => $date
];

echo json_encode($post);
