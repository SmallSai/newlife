<?php
// 封禁用户
include("dbConnect.php");
$userId=$_GET['userId'];
$reason=$_GET['reason'];

$update="UPDATE user SET state='1' WHERE userId=".$userId;
print $update;
mysqli_query($dbc,$update);
print mysqli_affected_rows($dbc);

// 发送封禁消息
$insert="INSERT INTO letter(userId,state,date,banReason) VALUES(".$userId.",'6',".time().",'".$reason."');";
mysqli_query($dbc,$insert);

include("dbClose.php");
?>