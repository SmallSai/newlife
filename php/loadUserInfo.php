<?php
// 此脚本可通用，用于检查是否为登录状态

include("dbConnect.php");

if(isset($_COOKIE['comic'])&&isset($_COOKIE['anima'])){ //验证是否存有cookie，即是否在登录状态

	$userAccount=mysqli_real_escape_string($dbc,$_COOKIE['comic']);
	$password=mysqli_real_escape_string($dbc,$_COOKIE['anima']);
	
	//匹配身份信息是否正确
	$queryUser="SELECT userId,userName FROM user WHERE (userAccount='".$userAccount."' OR userName='".$userAccount."') AND userPass='".$password."';";
	if($result=mysqli_query($dbc,$queryUser)){
		print json_encode(mysqli_fetch_assoc($result));
	}
	else{ //身份匹配不正确
		print '0';
	}
}
else{ //未登录状态
	print '1';
}

include("dbClose.php");
?>