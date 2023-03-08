<?php


$pdo = new PDO('mysql:host=localhost;port=3306;dbname=swallowtail_db', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
date_default_timezone_set("Asia/Ho_Chi_Minh");
