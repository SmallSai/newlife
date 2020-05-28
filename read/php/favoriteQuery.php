<?php
// 查询是否已收藏脚本，收藏文章，取消收藏，收藏连载文章的章节等于收藏整个文章
include("../../php/dbConnect.php");

$userId=mysqli_real_escape_string($dbc,$_GET['userId']);
$operaFlag=$_GET['operaFlag'];// 操作标记，1-查询是否收藏，2-收藏操作，3-取消收藏

// 获取文章ID或者章节ID
$articleId='';
$chapterId='';
	
if(isset($_GET['articleId'])){
	$articleId=mysqli_real_escape_string($dbc,$_GET['articleId']);
}
else{
	if(isset($_GET['chapterId'])){
		$chapterId=mysqli_real_escape_string($dbc,$_GET['chapterId']);
			
		$queryAid="SELECT articleId FROM serial WHERE chapterId=".$chapterId;
		$resultAid=mysqli_query($dbc,$queryAid);
		$articleId=mysqli_fetch_assoc($resultAid)['articleId'];
	}
}
	
//1-查询是否收藏
if($operaFlag==1){

	$query="SELECT * FROM favorite WHERE userId=".$userId." AND articleId=".$articleId.";";
	$result=mysqli_query($dbc,$query);
	$resultNum=mysqli_num_rows($result);
	if($resultNum>=1){
		print 1;
	}
	else{
		print 0;
	}
}

//2-收藏操作
if($operaFlag==2){
	$insert="INSERT INTO favorite(userId,articleId) VALUES(".$userId.",".$articleId.")";
	mysqli_query($dbc,$insert);
	
	// 正常情况输出1，表示成功插入收藏信息 
	print mysqli_affected_rows($dbc);
	
	// 文章收藏数+1
	$updateUpNum="UPDATE article SET favoriteNum=favoriteNum+1 WHERE articleId=".$articleId;
	mysqli_query($dbc,$updateUpNum);
	
	// 查询被点赞者uid
	$queryBeUid="SELECT userId FROM article WHERE articleId=".$articleId;
	$resultBeUid=mysqli_query($dbc,$queryBeUid);
	$beUid=mysqli_fetch_assoc($resultBeUid)['userId'];
	
	// 收藏消息插入
	$insertLetter="INSERT INTO letter(userId,articleId,actUserId,state,date) VALUES(".$beUid.",".$articleId.",".$userId.",'4',".time().");";
	mysqli_query($dbc,$insertLetter);
}

//3-取消收藏
if($operaFlag==3){
	$delete="DELETE FROM favorite WHERE userId=".$userId." AND articleId=".$articleId;
	mysqli_query($dbc,$delete);
	
	// 正常情况输出1，表示成功删除收藏信息
	print mysqli_affected_rows($dbc);
	
	// 文章收藏数-1
	$updateUpNum="UPDATE article SET favoriteNum=favoriteNum-1 WHERE articleId=".$articleId;
	mysqli_query($dbc,$updateUpNum);
	
	// 查询被点赞者uid
	$queryBeUid="SELECT userId FROM article WHERE articleId=".$articleId;
	$resultBeUid=mysqli_query($dbc,$queryBeUid);
	$beUid=mysqli_fetch_assoc($resultBeUid)['userId'];
	
	// 消息表删除信息
	$deleteLetter="DELETE FROM letter WHERE chapterId=".$chapterId." AND actUserId=".$userId." AND state='4';";
	mysqli_query($dbc,$deleteLetter);
}

include("../../php/dbClose.php");
?>