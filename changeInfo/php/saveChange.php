<?php
// 检查用户名字是否存在
include("../../php/dbConnect.php");

$userId=mysqli_real_escape_string($dbc,$_GET['userId']);
$userName=mysqli_real_escape_string($dbc,htmlspecialchars($_GET['userName']));
$sex=mysqli_real_escape_string($dbc,htmlspecialchars($_GET['sex']));
$place=mysqli_real_escape_string($dbc,htmlspecialchars($_GET['place']));
$sign=mysqli_real_escape_string($dbc,htmlspecialchars($_GET['sign']));
$old=mysqli_real_escape_string($dbc,htmlspecialchars($_GET['old']));


$query="SELECT userName FROM user WHERE userId<>".$userId." AND userName='".$userName."';";
$result=mysqli_query($dbc,$query);
$resultNum=mysqli_num_rows($result);

if($resultNum==0){
	// 不存在该昵称，可以更改
	$queryUpdate="UPDATE user SET userName='".$userName."', sex='".$sex."', place='".$place."', sign='".
	$sign."',old=".$old." WHERE userId=".$userId;
	
	$resultUpdate=mysqli_query($dbc,$queryUpdate);
	print mysqli_affected_rows($dbc);
	
	// 对文章表中冗余的userName更改
	$updateUserName="UPDATE article SET userName='".$userName."' WHERE userId=".$userId;
	mysqli_query($dbc,$updateUserName);
}
else{
	// 存在该昵称
	print 2;
}


include("../../php/dbClose.php");
?>