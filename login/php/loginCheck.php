<?php
//登录检查
$inpAccount=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['userAccount']));
$inpPassword=md5(mysqli_real_escape_string($dbc,htmlspecialchars($_POST['password'])));

$query="SELECT * FROM user WHERE (userAccount='".$inpAccount."' OR userName='".$inpAccount."') AND userPass='".$inpPassword."';";
$result=mysqli_query($dbc,$query);
$resultNuum=mysqli_num_rows($result);

if($resultNuum==1){
	//发送登录cookie
	setcookie('comic',$inpAccount,time()+604800,'/');//最后一个参数将cookie设置为全站有效
	setcookie('anima',$inpPassword,time()+604800,'/');
	print '1';
}
else{
	print '0';
}
?>