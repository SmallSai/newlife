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
	
	$commitId=mysqli_insert_id($dbc);//插入的评论ID
	
	// 返回插入行数，正常为1
	print mysqli_affected_rows($dbc);
	
	// 查询被点赞者uid
	$queryBeUid="SELECT userId FROM article WHERE articleId=".$articleId;
	$resultBeUid=mysqli_query($dbc,$queryBeUid);
	$beUid=mysqli_fetch_assoc($resultBeUid)['userId'];
	
	// 消息表插入评论消息
	$insertLetter="INSERT INTO letter(userId,articleId,commitId,actUserId,state,date) VALUES(".$beUid.",".$articleId.",".$commitId.",".$userId.",'2',".time().");";
	mysqli_query($dbc,$insertLetter);
	
}
else{
	if(key_exists("chapterId",$_GET)&&$_GET['chapterId']>0){
		// 该文章为连载文章
		$chapterId=mysqli_real_escape_string($dbc,$_GET['chapterId']);
		$insertComment="INSERT INTO comment (userId,userName,chapterId,content) VALUES(".$userId.",'".$userName."',".$chapterId.",'".$content."')";
		$result=mysqli_query($dbc,$insertComment);
		
		// 返回插入行数，正常为1
		print mysqli_affected_rows($dbc);
		
		// 查询连载文章对应的aid
		$queryArticleId="SELECT articleId FROM serial WHERE chapterId=".$chapterId;
		$resultArticleId=mysqli_query($dbc,$queryArticleId);
		$articleId=mysqli_fetch_assoc($resultArticleId)['articleId'];
		
		// 查询被点赞者uid
		$queryBeUid="SELECT userId FROM article WHERE articleId=".$articleId;
		$resultBeUid=mysqli_query($dbc,$queryBeUid);
		$beUid=mysqli_fetch_assoc($resultBeUid)['userId'];
		
		// 消息表插入评论消息
		$insertLetter="INSERT INTO letter(userId,chapterId,commitId,actUserId,state,date) VALUES(".$beUid.",".$chapterId.",".$commitId.",".$userId.",'2',".time().");";
		mysqli_query($dbc,$insertLetter);
	}
}


include("../../php/dbClose.php");
?>