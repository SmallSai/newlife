<?php
//删除文章脚本
include("../../php/dbConnect.php");

$userId=mysqli_real_escape_string($dbc,$_GET['userId']);
$articleId=mysqli_real_escape_string($dbc,$_GET['articleId']);
$inputFlag=$_GET['inputFlag'];

if($inputFlag==1||$inputFlag==2){//此时说明articleId是章节ID
	$queryUserId="SELECT userId FROM article,serial WHERE article.articleId=serial.articleId AND serial.chapterId=".$articleId.";";
	$userIdResult=mysqli_query($dbc,$queryUserId);
	$getUserId=mysqli_fetch_assoc($userIdResult)['userId'];
	
	if($getUserId==$userId){
		$deleteQuery="DELETE FROM serial WHERE chapterId=".$articleId.";";
		mysqli_query($dbc,$deleteQuery);
		print mysqli_affected_rows($dbc);
	}
	else{//userId不匹配
		print 'error';
	}
}

if($inputFlag==0){//此时articleId为单篇文章ID
	$deleteQuery="DELETE FROM article WHERE articleId=".$articleId." AND userId=".$userId.";";
	mysqli_query($dbc,$deleteQuery);
	print mysqli_affected_rows($dbc);
}
include("../../php/dbClose.php");
?>