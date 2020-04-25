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
			$userName="reader_".date('y').date('m').$randUserNameCode;
			// print "用户名字：".$randUserNameCode."<br>";
			
			//查询名字是否重复
			$queryNameExist="SELECT userName FROM user WHERE userName='".$userName."';";
			$result=mysqli_query($dbc,$queryNameExist);
			while(mysqli_num_rows($result)>=1){
				$randUserNameCode=rand(10000,99999); //用户随机尾数
				$userName="reader_"+date('y')+date('m')+$randUserNameCode;
				$queryNameExist="SELECT userName FROM user WHERE userName='".$userName."';";
				$result=mysqli_query($dbc,$queryNameExist);
			}
			
			$birth=time();
			
			//注册数据插入数据库
			$queryInsert="INSERT INTO user (userName,userAccount,userPass,birth) VALUE ('$userName','$inpEmail','$inpPassword','$birth');";
			mysqli_query($dbc,$queryInsert);
			print mysqli_affected_rows($dbc); //没有意外就是返回1
			
			//查询分配的id号，建立用户文件夹
			$querySelect="SELECT userId FROM user WHERE userAccount='".$inpEmail."';";
			$resultUid=mysqli_query($dbc,$querySelect);
			$row=mysqli_fetch_assoc($resultUid); //assoc字符索引，row数字索引，array数字加字符
			$userDir="../../userFile/".$row['userId']; //
			mkdir($userDir); //生成用户目录
			copy("../../userFile/public/headPortrait/head".rand(1,13).".jpg",$userDir."/headPortrait.jpg");
			
			//发送登录cookie
			setcookie('comic',$inpEmail,time()+604800,'/');//最后一个参数将cookie设置为全站有效
			setcookie('anima',$inpPassword,time()+604800,'/');
			
			//ob_end_clean();
		}
		else{//输入验证码不正确
			print '2';
			//ob_end_clean();
		}
	}
	else{
		print '0';//输入的邮箱未获取验证码，未发送过session
		//ob_end_clean();
	}
	include("../../php/dbClose.php");
?>