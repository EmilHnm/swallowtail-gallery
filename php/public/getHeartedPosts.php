<?php
require_once '../_connection.php';
require_once '../_function.php';
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    //validate the request
    $conditionString = '';
    $heartPost = $request->heart;
    foreach ($heartPost as $key => $value) {
        if ($key != (count($heartPost) - 1)) {
            $conditionString .= "'" . $value . "',";
        } else {
            $conditionString .= "'" . $value . "'";
        }
    }
    $statement = $pdo->prepare("SELECT * FROM post WHERE id in ($conditionString)");
    $statement->execute();
    $data = $statement->fetchAll(PDO::FETCH_ASSOC);
    if (count($data) > 0) {
        echo json_encode($data);
        http_response_code(201);
    } else {
        return http_response_code(401);
    }
}
