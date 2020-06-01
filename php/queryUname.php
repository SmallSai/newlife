<?php
// 查询用户名字
include("dbConnect.php");
$userId=mysqli_real_escape_string($dbc,$_GET['uid']);
$query="SELECT userName FROM user WHERE userId=".$userId;
$result=mysqli_query($dbc,$query);
$getUName=mysqli_fetch_assoc($result)['userName'];
print $getUName;

include("dbClose.php");
?>