<?php
header("content-type:text/html;charset=UTF-8");
$db = mysqli_connect("127.0.0.1", "root", "", "tea");
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];
$sql = "SELECT * FROM companyreg WHERE username='$username'";
$result = mysqli_query($db,$sql);
if(mysqli_num_rows($result)==0){
    echo '{"status":"error","msg":"该用户不存在！"}';
}
else{
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    $_password = $data[0]["password"];
    $id = $data[0]["id"];
    if($_password != $password){
        echo '{"status":"errror","msg":"对不起，您的密码不正确"}';
    }else{
        echo "{\"status\":\"success\",\"msg\":\"登录成功！！！\",\"id\":$id}";
    }
}
?>