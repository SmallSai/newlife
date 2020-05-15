<?php
// 查询是否已点赞脚本，点赞文章，取消点赞
include("../../php/dbConnect.php");

$userId=mysqli_real_escape_string($dbc,$_GET['userId']);
$operaFlag=$_GET['operaFlag'];// 操作标记，1-查询是否点赞，2-点赞操作，3-取消点赞

//1-查询是否点赞
if($operaFlag==1){
	if(isset($_GET['articleId'])){
		
		$articleId=mysqli_real_escape_string($dbc,$_GET['articleId']);
		// print "aid:".$articleId."-----";
		$query="SELECT * FROM up WHERE userId=".$userId." AND articleId=".$articleId.";";
		$result=mysqli_query($dbc,$query);
		$resultNum=mysqli_num_rows($result);
		// print "错误：".mysqli_error($dbc);
		// print "语句：".$query;
		if($resultNum>=1){
			print 1;
		}
		else{
			print 0;
		}
	
	}
	else{
		if(isset($_GET['chapterId'])){
			
			$chapterId=mysqli_real_escape_string($dbc,$_GET['chapterId']);
			$query="SELECT * FROM up WHERE userId=".$userId." AND chapterId=".$chapterId.";";
			// print "查询语句:".$query;
			$result=mysqli_query($dbc,$query);
			$resultNum=mysqli_num_rows($result);
			if($resultNum>=1){
				print 1;
			}
			else{
				print 0;
			}
		}
	}
}

//2-点赞操作
if($operaFlag==2){
	if(isset($_GET['articleId'])){
		$articleId=mysqli_real_escape_string($dbc,$_GET['articleId']);
		$insert="INSERT INTO `up`(userId,articleId) VALUES(".$userId.",".$articleId.")";
		mysqli_query($dbc,$insert);
		
		// 正常情况输出1，表示成功插入点赞信息
		print mysqli_affected_rows($dbc);
		
		// 文章点赞数+1
		$updateUpNum="UPDATE article SET upNum=upNum+1 WHERE articleId=".$articleId;
		mysqli_query($dbc,$updateUpNum);	
	}
	else{
		if(isset($_GET['chapterId'])){
			$chapterId=mysqli_real_escape_string($dbc,$_GET['chapterId']);
			$insert="INSERT INTO `up`(userId,chapterId) VALUES(".$userId.",".$chapterId.")";
			mysqli_query($dbc,$insert);
			
			// 正常情况输出1，表示成功插入点赞信息
			print mysqli_affected_rows($dbc);
			
			// 章节点赞数+1
			$updateUpNum="UPDATE serial SET upNum=upNum+1 WHERE chapterId=".$chapterId;
			mysqli_query($dbc,$updateUpNum);	
		}
	}
}

//3-取消点赞
if($operaFlag==3){
	if(isset($_GET['articleId'])){
		$articleId=mysqli_real_escape_string($dbc,$_GET['articleId']);
		$delete="DELETE FROM `up` WHERE userId=".$userId." AND articleId=".$articleId;
		mysqli_query($dbc,$delete);
		
		// 正常情况输出1，表示成功插入点赞信息
		print mysqli_affected_rows($dbc);
		
		// 文章点赞数-1
		$updateUpNum="UPDATE article SET upNum=upNum-1 WHERE articleId=".$articleId;
		mysqli_query($dbc,$updateUpNum);
	}
	else{
		if(isset($_GET['chapterId'])){
			$chapterId=mysqli_real_escape_string($dbc,$_GET['chapterId']);
			$delete="DELETE FROM `up` WHERE userId=".$userId." AND chapterId=".$chapterId;
			mysqli_query($dbc,$delete);
			
			// 正常情况输出1，表示成功插入点赞信息
			print mysqli_affected_rows($dbc);
			// print "取消点赞语句：".$delete;
			
			// 章节点赞数-1
			$updateUpNum="UPDATE serial SET upNum=upNum-1 WHERE chapterId=".$chapterId;
			mysqli_query($dbc,$updateUpNum);
	
		}
	}
}

include("../../php/dbClose.php");
?>