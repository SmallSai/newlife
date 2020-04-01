<?php
	include("../../php/dbConnect.php");
	
	$inpEmail=mysqli_real_escape_string($dbc,$_POST['email']);//获得前端发送的邮箱
	
	$query="SELECT email FROM user WHERE email=".$inpEmail.";";
	$result=mysqli_query($dbc,$query);
	print mysqli_num_rows($dbc);
	
	include("../../php/dbClose.php");
?>