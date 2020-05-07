<?php
//保存草稿脚本
include("../../php/dbConnect.php");

//声明单篇文章各插入的列值
$articleId=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['articleId']));
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
if($unSerial==1){
	$chapterTitle=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['chapterTitle']));
	$chapterNum=mysqli_real_escape_string($dbc,$_POST['chapterNum']);
	$chapterClass=mysqli_real_escape_string($dbc,$_POST['chapterClass']);
	$serialText=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['serialText']));
	$wordNum=$_POST['wordNum'];
}

//单篇文章插入
if($unSerial==0){
	$articleText=mysqli_real_escape_string($dbc,htmlspecialchars($_POST['articleText']));
	
	//插入操作
	if($articleId==-1){//ID为-1表示是写新的文章
		$insertArticle="INSERT INTO article(title,userId,userName,type,nature,oriAuthor,unSerial,state,articleText,wordNum,date) VALUES('$title',$userId,'$userName','$type','$nature','$oriAuthor','$unSerial','$state','$articleText','$wordNum',$date);";
	}
	
	//更新操作
	if($articleId>=1){//存在
		$insertArticle="UPDATE article SET title='".$title."',type='".$type."',nature='".$nature."',oriAuthor='".$oriAuthor."',unSerial='".$unSerial."',articleText='".$articleText."',wordNum=".$wordNum.",date=".$date." WHERE articleId=".$articleId." AND userId=".$userId.";";
	}
	$result=mysqli_query($dbc,$insertArticle);
	// print "单篇插入---";
	// print "插入语句：".$insertArticle."-----";
	// print "单篇文章插入错误：".mysqli_error($dbc);
	if($articleId==-1){
		print mysqli_insert_id($dbc);//若是插入操作则需要返回ID，更新操作其ID早存在于隐藏input中了
	}
	else{
		print $articleId;
	}
}

//连载文章插入或更新
if($unSerial==1){
	$articleText='连载文章';
	
	//插入操作,新的连载文章
	if($articleId==-1){
		$insertArticle="INSERT INTO article(title,userId,userName,type,nature,oriAuthor,unSerial,state,articleText,wordNum,date) VALUES('$title',$userId,'$userName','$type','$nature','$oriAuthor','$unSerial','$state','$articleText',0,$date);";
		mysqli_query($dbc,$insertArticle);
		// $resultArticleId=mysqli_query($dbc,"SELECT LAST_INSERT_ID()");
		// articleId=mysqli_fetch_assoc($resultArticleId)['LAST_INSERT_ID()'];
		$mysqliArticleId=mysqli_insert_id($dbc);
		$insertSerial="INSERT INTO serial(articleId,chapterTitle,chapterNum,chapterClass,serialText,wordNum,date) VALUES($mysqliArticleId,'$chapterTitle',$chapterNum,'$chapterClass','$serialText',$wordNum,$date);";
		mysqli_query($dbc,$insertSerial);
		print mysqli_insert_id($dbc);//返回的是最后一次连载表插入得到的自增ID
	}
	
	
	
	//更新操作，更新现有连载文章，章节
	if($articleId>=1){
		
		if(array_key_exists("inputFlag",$_POST)&&$_POST['inputFlag']==1){
			//增加新的章节
			$queryArticle="UPDATE article SET title='".$title."',type='".$type."',nature='".$nature."',oriAuthor='".$oriAuthor."',unSerial='".$unSerial."',articleText='".$articleText."',wordNum=".$wordNum.",date=".$date." WHERE articleId=".$articleId." AND userId=".$userId.";";
			mysqli_query($dbc,$queryArticle);
			$quertInsertSerial="INSERT INTO serial(articleId,chapterTitle,chapterNum,chapterClass,serialText,wordNum,date) VALUES($articleId,'$chapterTitle',$chapterNum,'$chapterClass','$serialText',$wordNum,$date);";
			mysqli_query($dbc,$quertInsertSerial);
			// print "增加新章节操作：".$queryArticle."------".$quertInsertSerial."--------错误是：".mysqli_error($dbc)."-----";
			print mysqli_insert_id($dbc);
		}
		else{
			//增加新连载文章以及章节
			//由章节ID获取文章ID
			$queryId="SELECT articleId FROM serial WHERE chapterId=".$articleId.";";
			$resultId=mysqli_query($dbc,$queryId);
			$getArticleId=mysqli_fetch_assoc($resultId)['articleId'];//由章节ID获取的文章ID
			
			//由文章ID获取用户ID
			$queryUser="SELECT userId FROM article WHERE articleId=".$getArticleId.";";
			$resultUser=mysqli_query($dbc,$queryUser);
			// print "查询语句：".$queryId."-----";
			// print "查询语句：".$queryUser."-----";
			// print "错误：".mysqli_error($dbc)."---";
			$getUserId=mysqli_fetch_assoc($resultUser)['userId'];
			
			if(mysqli_num_rows($resultUser)&&($getUserId==$userId)){
				$queryArticle="UPDATE article SET title='".$title."',type='".$type."',nature='".$nature."',oriAuthor='".$oriAuthor."',unSerial='".$unSerial."',state='".$state."',wordNum=0,date=".$date." WHERE articleId=".$getArticleId.";";
				mysqli_query($dbc,$queryArticle);
				
				$querySerial="UPDATE serial SET chapterTitle='".$chapterTitle."',chapterNum='".$chapterNum."',chapterClass='".$chapterClass."',serialText='".$serialText."',wordNum='".$wordNum."',date=".$date." WHERE chapterId=".$articleId.";";
				mysqli_query($dbc,$querySerial);
				// print "查询语句：".$queryArticle."---";
				// print "错误是：".mysqli_error($dbc)."-------";
				print $articleId;
			}
			else{
				print 'error';//章节ID号和用户ID不匹配
			}
		}
	}
}

//错误情况
if($unSerial!=1&&$unSerial!=0){
	print "error";
}

include("../../php/dbClose.php");
?>