<?php
//登录验证脚本
include("../../php/dbConnect.php");

//接收用户输入账号密码
$inpAccount=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['account']));
$inpPassword=md5(mysqli_real_escape_string($dbc,htmlspecialchars($_POST['password'])));

$queryAccount="SELECT userAccount,userPass FROM user WHERE userAccount='".$inpAccount."' OR userName='".$inpAccount."';";
if($result=mysqli_query($dbc,$queryAccount)){ //存在输入账号
	$userPass=mysqli_fetch_assoc($result)['userPass']; //获取用户密码
	if($inpPassword==$userPass){ //密码正确
		setcookie('comic',$inpAccount,time()+604800,'/'); //登录cookie一周后过期
		setcookie('anima',$inpPassword,time()+604800,'/');
		print '2';
	}
	else{ //密码不正确
		print '1';
	}
}
else{ //不存在输入账号
	print '0';
}
include("../../php/dbClose.php");
?>