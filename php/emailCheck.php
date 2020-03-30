<?php
	mysqli_select_db($dbc,'newlife');
	
	//获得前端发送的邮箱
	$email=$_POST['email'];
	
	$query="SELECT email FROM user WHERE email=".$email.";";
	$result=mysqli_query($dbc,$query);
	print mysqli_num_rows($dbc);
?>