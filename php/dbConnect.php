<?php
	//数据库连接
	// $dbHost='39.98.117.187';
	$dbHost='localhost';
	$dbUser='saiA';
	$dbPassword='pass321';
	$dbc=mysqli_connect($dbHost,$dbUser,$dbPassword);
	if(!$dbc){
		die("数据库连接失败：".mysqli_connect_error());
	}
	mysqli_select_db($dbc,'newlife');
?>