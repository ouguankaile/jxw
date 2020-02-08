<?php
$db = mysqli_connect("127.0.0.1","root","","tea");
$account =$_REQUEST["account"];
$email =$_REQUEST["email"];
$password =$_REQUEST["password"];
$username =$_REQUEST["username"];
$phone =$_REQUEST["phone"];
$tel =$_REQUEST["tel"];
$companyName =$_REQUEST["companyName"];
$detailAdd =$_REQUEST["detailAdd"];

$sql = "SELECT * FROM companyreg WHERE account='$account'";

$result = mysqli_query($db,$sql);
if(mysqli_num_rows($result) == 0){
    $sql = "INSERT INTO `companyreg`(`id`, `account`, `email`, `password`, `username`, `phone`, `tel`, `companyName`, `detailAdd`) VALUES (NULL,'$account','$email','$password','$username','$phone','$tel','$companyName','$detailAdd')";
    $result = mysqli_query($db,$sql);

    $arr =array("status"=>"success","msg"=>"恭喜你，注册成功！");
    echo json_encode($arr);
}else{
    echo '{"status":"error","msg":"抱歉，该用户名已经被注册，请重新选择一个更优秀的名字！！"}';
}
?>