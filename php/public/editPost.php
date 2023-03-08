<?php
require_once '../_connection.php';
require_once '../_function.php';


$title = $_POST['title'];
$description = $_POST['description'];
$visibility = $_POST['visibility'];
$image = $_POST['image'];
$uid = $_POST['uid'];
$id = $_POST['id'];



$statement = $pdo->prepare("UPDATE post SET title = :title, description = :description, visibility = :visibility, imagePath = :imagePath WHERE id = :id");
$statement->bindValue(':title', $title);
$statement->bindValue(':description', $description);
$statement->bindValue(':visibility', $visibility == 'public' ? 1 : 0);
$statement->bindValue(':imagePath', $image);
$statement->bindValue(':id', $id);
$statement->execute();
