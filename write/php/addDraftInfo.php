<?php
//点击草稿加载草稿详细信息到页面
include("../../php/dbConnect.php");

$userId=mysqli_real_escape_string($dbc,$_GET['userId']);
$articleId=mysqli_real_escape_string($dbc,$_GET['articleId']);

if(array_key_exists("chapterId",$_GET)){
	//存在chapterId说明是查找连载文章信息
	$chapterId=$_GET['chapterId'];
	$query="SELECT * FROM article,serial WHERE article.userId=article.userId AND article.articleId=serial.articleId AND article.userId=".
	$userId." AND article.articleId=".$articleId." AND serial.chapterId=".$chapterId.";"; //多表查询
}
else{
	//不存在则查找单篇文章信息
	$query="SELECT * FROM article WHERE articleId=".$articleId." AND userId=".$userId.";";
}

// print "查询语句：".$query."------";
$result=mysqli_query($dbc,$query);
if(mysqli_num_rows($result)){ //如果查询到了信息
	$row=mysqli_fetch_assoc($result);
	print json_encode($row);
}

include("../../php/dbClose.php");
?>