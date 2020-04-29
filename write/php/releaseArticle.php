<?php
//发表文章脚本
include("../../php/dbConnect.php");

//声明单篇文章各插入的列值
$userId=mysqli_real_escape_string($dbc,$_POST['userId']);
$articleId=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['articleId']));
$title=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['title']));
$userName=$_POST['userName'];
$type=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['type']));
$nature=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['nature']));
$oriAuthor='';
if($nature!=1){
	$oriAuthor="无";
}
else{
	$oriAuthor=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['oriAuthor']));
}

$unSerial=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['unSerial']));
$state=2;//待审核
$articleText='';
$wordNum=$_POST['wordNum'];
$date=time();

//声明连载文章各插入的列值
$chapterTitle='';
$chapterNum='';
$chapterClass='';
$serialText='';
if($unSerial==1){
	$chapterTitle=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['chapterTitle']));
	$chapterNum=mysqli_real_escape_string($dbc,$_POST['chapterNum']);
	$chapterClass=mysqli_real_escape_string($dbc,$_POST['chapterClass']);
	$serialText=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['serialText']));
	$wordNum=$_POST['wordNum'];
}
	
if($unSerial==0){

	//情况1：直接发表新的单篇文章
	if($articleId==-1){
		$query="INSERT INTO article(title,userId,userName,type,nature,oriAuthor,unSerial,state,articleText,wordNum,date) VALUES('$title',$userId,'$userName','$type','$nature','$oriAuthor','$unSerial','$state','$articleText','$wordNum',$date);";
		mysqli_query($dbc,$query);
		print mysqli_affected_rows($dbc);
	}
	
	//情况2：从草稿中发表单篇文章
	if($articleId>=1){
		$query="UPDATE article SET title='".$title."',type='".$type."',nature='".$nature."',oriAuthor='".$oriAuthor."',unSerial='".$unSerial."',articleText='".$articleText."',state='".$state."',wordNum=".$wordNum.",date=".$date." WHERE articleId=".$articleId." AND userId=".$userId.";";
		mysqli_query($dbc,$query);
		print mysqli_affected_rows($dbc);
	}
	
	
}

if($unSerial==1){
	//情况3：直接发表新的连载文章以及章节
	if($articleId==-1){
		$insertArticle="INSERT INTO article(title,userId,userName,type,nature,oriAuthor,unSerial,state,articleText,wordNum,date) VALUES('$title',$userId,'$userName','$type','$nature','$oriAuthor','$unSerial','$state','$articleText',0,$date);";
		mysqli_query($dbc,$insertArticle);
		
		$getArticleId=mysqli_insert_id($dbc);
		$insertSerial="INSERT INTO serial(articleId,chapterTitle,chapterNum,chapterClass,serialText,state,wordNum,date) VALUES($getArticleId,'$chapterTitle',$chapterNum,'$chapterClass','$serialText',$state,$wordNum,$date);";
		mysqli_query($dbc,$insertSerial);
		print mysqli_affected_rows($dbc);
	}
	
	//情况4：发表新的章节
	if($articleId>=1){
		if(array_key_exists("inputFlag",$_POST)&&$_POST['inputFlag']==1){ //新增加章节操作，ID为文章ID
			$updateArticle="UPDATE article SET title='".$title."',type='".$type."',nature='".$nature."',oriAuthor='".$oriAuthor."',unSerial='".$unSerial."',articleText='".$articleText."',state='".$state."',wordNum=".$wordNum.",date=".$date." WHERE articleId=".$articleId." AND userId=".$userId.";";
			mysqli_query($dbc,$updateArticle);
			
			$insertSerial="INSERT INTO serial(articleId,chapterTitle,chapterNum,chapterClass,serialText,state,wordNum,date) VALUES($articleId,'$chapterTitle',$chapterNum,'$chapterClass','$serialText',$state,$wordNum,$date);";
			mysqli_query($dbc,$insertSerial);
			print mysqli_affected_rows($dbc);
		}
		else{
			//这时为从草稿发布章节，$articleId为章节的ID
			$queryId="SELECT articleId FROM serial WHERE chapterId=".$articleId.";";
			$resultId=mysqli_query($dbc,$queryId);
			$getArticleId=mysqli_fetch_assoc($resultId)['articleId'];//由章节ID获取的文章ID
			
			//由文章ID获取用户ID
			$queryUser="SELECT userId FROM article WHERE articleId=".$getArticleId.";";
			$resultUser=mysqli_query($dbc,$queryUser);
			$getUserId=mysqli_fetch_assoc($resultUser)['userId'];
			
			//信息匹配的话进行更新文章，更新章节操作
			if(mysqli_num_rows($resultUser)&&($getUserId==$userId)){
				$queryArticle="UPDATE article SET title='".$title."',type='".$type."',nature='".$nature."',oriAuthor='".$oriAuthor."',unSerial='".$unSerial."',state='".$state."',wordNum=0,date=".$date." WHERE articleId=".$getArticleId.";";
				mysqli_query($dbc,$queryArticle);
				
				$querySerial="UPDATE serial SET chapterTitle='".$chapterTitle."',chapterNum='".$chapterNum."',chapterClass='".$chapterClass."',serialText='".$serialText."',state='".$state."',wordNum='".$wordNum."',date=".$date." WHERE chapterId=".$articleId.";";
				mysqli_query($dbc,$querySerial);
				print mysqli_affected_rows($dbc);
			}
		}
	}
}

include("../../php/dbClose.php");
?>