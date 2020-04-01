<?php
	include("../../php/dbConnect.php");
	
	$inpRandCode=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['randCode']));//获得前端发送来的验证码
	$inpEmail=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['email']));//获得前端发送来的邮箱
	$inpPassword=md5($_POST['password']);//获得前端发送来的密码
	
	session_start();
	
	if(!empty($_SESSION[$inpEmail])){
		$randCode=$_SESSION[$inpEmail];//session键为发送的邮箱，值为发送到该邮箱的验证码
		if($inpRandCode==$randCode){//输入的验证码正确
			
			//以下生成用户信息
			$randUserNameCode=rand(10000,99999);//用户随机尾数
			$userName="reader_"+data('y')+data('m')+$randUserNameCode;
			
			//查询名字是否重复
			$queryNameExist="SELECT userName FROM user WHERE userName='$userName';";
			$result=mysqli_query($dbc,$queryNameExist);
			wihle(mysqli_num_rows($result)>=1){
				$randUserNameCode=rand(10000,99999);//用户随机尾数
				$userName="reader_"+data('y')+data('m')+$randUserNameCode;
				$queryNameExist="SELECT userName FROM user WHERE userName='$userName';";
				$result=mysqli_query($dbc,$queryNameExist);
			}
			
			$birth=time();
			
			$queryInsert="INSERT INTO user (userName,userAccount,userPass,birth) VALUE ('$userName','$inpEmail','$inpPassword','$birth')";
			print mysqli_affected_rows($dbc);//没有意外就是返回1
		}
		else{//输入验证码不正确
			print '0';
		}
	}
	else{
		print '0';//输入的邮箱未获取验证码，未发送过session
		ob_end_clean();
	}
	include("../../php/dbClose.php");
?>