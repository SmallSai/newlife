<?php
// 检查用户名字是否存在
include("../../php/dbConnect.php");

$userId=mysqli_real_escape_string($dbc,$_GET['uid']);
$userName=mysqli_real_escape_string($dbc,htmlspecialchars($_GET['userName']));

$query="SELECT userName FROM user WHERE userId<>".$userId." AND userName='".$userName."';";
$result=mysqli_query($dbc,$query);
$resultNum=mysqli_num_rows($result);

if($resultNum==0){
	// 不存在该昵称，可以更改
	print 0;
}
else{
	// 存在该昵称
	print 1;
}

include("../../php/dbClose.php");
?>