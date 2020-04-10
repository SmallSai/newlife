<?php
include("php/dbConnect.php");

if(isset($_COOKIE['user'])&&isset($_COOKIE['password'])){
	$userAccount=$_COOKIE['user'];
	$password=$_COOKIE['password'];
	
	$queryUser="SELECT userAccount FROM user WHERE (userAccount=".$userAccount." OR userName=".$userAccount.") AND password=".$password.";";
	if($result=mysqli_query($dbc,$queryUser)){
		print $userAccount;
	}
	else{
		print '0';
	}
}
else{ //未登录状态
	print '0';
}

include("php/dbClose.php");
?>