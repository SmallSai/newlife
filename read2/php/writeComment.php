<?php
// 写文章评论脚本
include("../../php/dbConnect.php");

$theId=null;
$userId=mysqli_real_escape_string($dbc,$_GET['uid']);
$userName=mysqli_real_escape_string($dbc,$_GET['userName']);

$content=mysqli_real_escape_string($dbc,htmlspecialchars($_GET['content']));

if(key_exists("articleId",$_GET)&&$_GET['articleId']>0){
	// 该文章为单篇文章
	$articleId=mysqli_real_escape_string($dbc,$_GET['articleId']);
	$insertComment="INSERT INTO comment (userId,userName,articleId,content) VALUES(".$userId.",'".$userName."',".$articleId.",'".$content."')";
	$result=mysqli_query($dbc,$insertComment);
	
	// 返回插入行数，正常为1
	print mysqli_affected_rows($dbc);
}
else{
	if(key_exists("chapterId",$_GET)&&$_GET['chapterId']>0){
		// 该文章为连载文章
		$chapterId=mysqli_real_escape_string($dbc,$_GET['chapterId']);
		$insertComment="INSERT INTO comment (userId,userName,chapterId,content) VALUES(".$userId.",'".$userName."',".$chapterId.",'".$content."')";
		$result=mysqli_query($dbc,$insertComment);
		
		// 返回插入行数，正常为1
		print mysqli_affected_rows($dbc);
		print mysqli_error($dbc);
	}
}


include("../../php/dbClose.php");
?>