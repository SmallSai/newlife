<?php
	// 验证输入的邮箱是否已注册过,注释应写在php内，否则会作为responseText传回去
	
	include("../../php/dbConnect.php");
	
	$inpEmail=mysqli_real_escape_string($dbc,$_GET['email']);//获得前端发送的邮箱
	
	$query="SELECT userAccount FROM user WHERE userAccount='".$inpEmail."';";

	$result=mysqli_query($dbc,$query);
	print mysqli_num_rows($result);
	
	include("../../php/dbClose.php");
?>