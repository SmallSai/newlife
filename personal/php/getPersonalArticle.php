<?php
// 加载用户文章，草稿等
include("../../php/dbConnect.php");

$flag=$_GET['flag'];//1-获取文章，2-获取收藏，3-获取关注，4-获取草稿
$pid=$_GET['pid'];

if($flag==1){
	// 用户文章
	$queryArticle="SELECT * FROM article WHERE userId=".$pid." AND state='3';";
	$resultArticle=mysqli_query($dbc,$queryArticle);
	
	// 文章数量
	$resultArticleNum=mysqli_num_rows($resultArticle);
	for($i=0;$i<$resultArticleNum;$i++){
		$row=mysqli_fetch_assoc($resultArticle);
		print json_encode($row);
		if($i<$resultArticleNum-1){
			print ',';
		}
	}
	
}

if($flag==2){
	// 用户收藏
	$queryFavorite="SELECT * FROM favorite f,article a WHERE a.articleId=f.articleId AND f.userId=".$pid;
	//print $queryFavorite;
	$resultFavorite=mysqli_query($dbc,$queryFavorite);

	// 收藏数量
	$resultFavoriteNum=mysqli_num_rows($resultFavorite);
	for($i=0;$i<$resultFavoriteNum;$i++){
		$row=mysqli_fetch_assoc($resultFavorite);
		print json_encode($row);
		if($i<$resultFavoriteNum-1){
			print ',';
		}
	}
	
}

if($flag==3){
	// 用户关注
	$queryFollow="SELECT u.userId AS userId,u.userName AS userName,u.articleNum AS articleNum FROM follow f,user u WHERE f.beFollowUid=u.userId AND f.userId=".$pid;
	$resultFollow=mysqli_query($dbc,$queryFollow);
	//print $queryFollow;
	// 关注数量
	$resultFollowNum=mysqli_num_rows($resultFollow);
	for($i=0;$i<$resultFollowNum;$i++){
		$row=mysqli_fetch_assoc($resultFollow);
		print json_encode($row);
		if($i<$resultFollowNum-1){
			print ',';
		}
	}
}

if($flag==4){
	// 用户草稿
	$queryDraft="SELECT * FROM article LEFT JOIN serial ON article.articleId=serial.articleId WHERE userId=".$pid." AND (article.state='1' OR serial.state='1');";
	//print $queryDraft;
	
	$resultDraft=mysqli_query($dbc,$queryDraft);
	
	// 草稿数量
	$resultDraftNum=mysqli_num_rows($resultDraft);
	for($i=0;$i<$resultDraftNum;$i++){
		$row=mysqli_fetch_assoc($resultDraft);
		print json_encode($row);
		if($i<$resultDraftNum-1){
			print ',';
		}
	}
}

include("../../php/dbClose.php");
?>