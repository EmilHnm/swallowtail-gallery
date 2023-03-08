<?php
require_once '../_connection.php';
require_once '../_function.php';
$statement = $pdo->prepare("SELECT * FROM post WHERE visibility = :visibility");
$statement->bindValue(':visibility', '1');
$statement->execute();
$data = $statement->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);
