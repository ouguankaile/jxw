<?php
//先链接数据库
$db = mysqli_connect("127.0.0.1","root","","tea");
// 编写SQL语句查询数据库中的数据
$sql = "SELECT * FROM tea" ;

// 把数据库已json个数返回
$result = mysqli_query($db,$sql);
$size = mysqli_num_rows($result);

// 假定每页显示20个商品数据
$count = ceil($size/50);
$data = array("count"=>$count);


echo json_encode($data,true);
?>