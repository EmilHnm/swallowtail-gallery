<?php

// random string generator
function generateRandomString($length)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

// check if exist in database
function checkDatabase($string, $typeCheck)
{

    $pdoCheck = new PDO('mysql:host=localhost;dbname=swallowtail_db', 'root', '');
    $pdoCheck->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    date_default_timezone_set("Asia/Ho_Chi_Minh");
    switch ($typeCheck) {
        case 0: {

                $checkExistEmailStatement = $pdoCheck->prepare("SELECT * FROM user WHERE email = :email");
                $checkExistEmailStatement->bindValue(':email', $string);
                $checkExistEmailStatement->execute();
                $checkExist = $checkExistEmailStatement->fetchAll(PDO::FETCH_ASSOC);
                if (count($checkExist) > 0) {
                    $pdoCheck = null;
                    return true;
                } else {
                    $pdoCheck = null;
                    return false;
                }
            }
            break;
        case 1: {

                $checkExistStatement = $pdoCheck->prepare("SELECT * FROM post WHERE id = :id");
                $checkExistStatement->bindValue(':id', $string);
                $checkExistStatement->execute();
                $checkExist = $checkExistStatement->fetchAll(PDO::FETCH_ASSOC);
                if (count($checkExist) > 0) {
                    $pdoCheck = null;
                    return true;
                } else {
                    $pdoCheck = null;
                    return false;
                }
            }
        case 2: {

                $checkExistStatement = $pdoCheck->prepare("SELECT * FROM user WHERE uid = :uid");
                $checkExistStatement->bindValue(':uid', $string);
                $checkExistStatement->execute();
                $checkExist = $checkExistStatement->fetchAll(PDO::FETCH_ASSOC);
                if (count($checkExist) > 0) {
                    $pdoCheck = null;
                    return true;
                } else {
                    $pdoCheck = null;
                    return false;
                }
            }
        default: {
                $pdoCheck = null;
                return true;
            };
            break;
    }
}
