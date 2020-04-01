<?php
	
	$inpEmail=$_POST['email'];//获取用户邮箱
	include("../../include/PHPMailer-master/index.php");//加载邮件类
	$randCode=rand(10000,99999);//生成验证码
	
	session_start();
	$_SESSION[$inpEmail]=$randCode;//用session将邮箱与验证码绑定
	ob_end_clean();
	Email::sendEmail($inpEmail,$randCode);
				
?>