<?php
// echo file_get_contents("./06 tea.json");
header("content-type:text/html;charset=UTF-8");

$db = mysqli_connect("127.0.0.1","root","","tea");
$page =$_REQUEST["page"];
$start = ($page-1)*40;
$type = $_REQUEST["type"];
if($type == "default"){
    $sql = "SELECT * FROM tea LIMIT $start,40";
}elseif($type =="dsc"){
    $sql = "SELECT * FROM tea ORDER BY price LIMIT $start,40";
}elseif($type =="asc"){
    $sql = "SELECT * FROM tea ORDER BY price LIMIT $start,40";
}
$result = mysqli_query($db,$sql);
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);


echo json_encode($data,true);



?>