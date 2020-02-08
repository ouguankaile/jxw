<?php
$db = mysqli_connect("127.0.0.1","root","","tea");
$type = $_REQUEST["type"];
$user_id = $_REQUEST["user_id"];
/* 1查询购物车中的所有商品信息 */
/* 接口：cart.php?type=get&user_id=xxx */
/* 权限：要求用户是登录状态，如果当前用户没有登录那么在加入购物车的时候应该先登录 */
if($type == "get"){
    $sql = "SELECT cart.*,goods.* FROM cart , goods WHERE cart.goods_id = goods.goods.id AND cart.user_id=$user_id";
    $result = mysqli_query($db,$sql);
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($data,true);

}
/* 2.加入购物车的功能 */
/* 接口：cart.php?type=add&goods_id=xxx&&user_id=xxx*/
/* 逻辑：如果该商品在购物车中已经存在，那么数量+1，否则添加一条商品记录 */
/* /* 权限：要求用户是登录状态，如果当前用户没有登录那么在加入购物车的时候应该先登录 */ 
elseif($type =="add"){
    $goods_id = $_REQUEST["goods_id"];
    $sql = "SELECT * FROM cart WHERE good_id = $goods_id AND user_id = $user_id";
    $result = mysqli_query($db,$sql);
    if(mysqli_num_rows($result) ==0){
        $sql = "INSERT INTO `cart` (`cart_id`,`user_id`,`goods_id`,`num`) VALUES(NULL, $user_id,$goods_id,1)";

    }else{
        $sql = "UPDATE `cart` SET `num`=`num`+1 WHERE `goods_id` = $goods_id AND user_id = $user_id";
    }
    $res = mysqli_query($db,$sql);
    echo json_encode(array("status" =>"success"));
}
/* 3.清空购物车 */
/* 接口：cart.php?type=clear */
/* 提示：在删除商品的时候提示并确认 */ 
elseif($type == "clear"){

}

/* 4.删除购物车商品 */
elseif($type == "delete"){
    $goods_id = $_REQUEST["goods_id"];
    $sql = "DELETE FROM `cart` WHERE goods_id = $goods_id AND user_id = $user_id";
    mysqli_query($db,$sql);
    echo json_encode(array("status"=>"success"),true);
}

/* 5.更新购物车商品数量 */

elseif($type =="updata"){
    $goods_id = $_REQUEST["goods_id"];
    $count = $_REQUEST["count"];
    $plusSql = "UPDATE `cart` SET `num`= $count WHERE `good_id` = $goods_id AND user_id = $user_id";
    mysqli_query($db,$plusSql);
    echo json_encode(array("status"=>"success"),true);
}

/* 6.获取购物车中的商品数量 */
elseif($type == "getCount"){
    $sql = "SELECT * FROM cart WHERE user_id =$user_id";
    $result = mysqli_query($db,$sql);
    $data = mysqli_fetch_all(mysqli_query($db,$sql),MYSQLI_ASSOC);
    $total = 0;
    for ($i = 0;$i<count($data);$i++){
        $total += $data[$i]["num"];
    }
    echo json_encode(array("status" =>"success","count" =>$total),true);
}
?>