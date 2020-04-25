<?php
//保存草稿脚本
include("../../php/dbConnect.php");

//声明单篇文章各插入的列值
$title=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['title']));
$userId=$_POST['userId'];
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
$state=1;
$articleText='';
$wordNum=$_POST['wordNum'];
$date=time();

//声明连载文章各插入的列值
$chapterTitle='';
$chapterNum='';
$chapterClass='';
$serialText='';
$dateSerial='';
if($unSerial==1){
	$chapterTitle=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['chapterTitle']));
	$chapterNum=mysqli_real_escape_string($dbc,$_POST['chapterNum']);
	$chapterClass=mysqli_real_escape_string($dbc,$_POST['chapterClass']);
	$serialText=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['serialText']));
	$wordNum=$_POST['wordNum'];
	$dateSerial=time();
}

//单篇文章插入
if($unSerial==0){
	$articleText=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['articleText']));
	$insertArticle="INSERT INTO article(title,userId,userName,type,nature,oriAuthor,unSerial,state,articleText,wordNum,date) VALUES('$title',$userId,'$userName','$type','$nature','$oriAuthor','$unSerial','$state','$articleText','$wordNum',$date);";
	$result=mysqli_query($dbc,$insertArticle);
	// print "单篇插入---";
	// print "插入语句：".$insertArticle."-----";
	// print "单篇文章插入错误：".mysqli_error($dbc);
	print mysqli_affected_rows($dbc);
}

//连载文章插入
if($unSerial==1){
	$articleText='连载文章';
	$insertArticle="INSERT INTO article(title,userId,userName,type,nature,oriAuthor,unSerial,state,articleText,wordNum,date) VALUES('$title',$userId,'$userName','$type','$nature','$oriAuthor','$unSerial','$state','$articleText',0,$date);";
	mysqli_query($dbc,$insertArticle);
	//$articleId=mysqli_query($dbc,"SELECT LAST_INSERT_ID()");
	$articleId=1;
	$insertSerial="INSERT INTO serial(articleId,chapterTitle,chapterNum,chapterClass,serialText,wordNum,date) VALUES($articleId,'$chapterTitle',$chapterNum,'$chapterClass','$serialText',$wordNum,$date);";
	print "单篇插入语句：".$insertArticle."------连载插入语句：".$insertSerial."------";
	mysqli_query($dbc,$insertArticle);
	mysqli_query($dbc,$insertSerial);
	// print mysqli_error($dbc);
	print mysqli_affected_rows($dbc);
}

//错误情况
if($unSerial!=1&&$unSerial!=0){
	print "error";
}

include("../../php/dbClose.php");
?>