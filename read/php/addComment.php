<?php
// 加载文章评论脚本
include("../../php/dbConnect.php");

$theId=null;
if(key_exists("articleId",$_GET)&&$_GET['articleId']>0){
	// 该文章为单篇文章
	$articleId=mysqli_real_escape_string($dbc,$_GET['articleId']);
	$quertComment="SELECT * FROM comment WHERE articleId=".$articleId;
	$result=mysqli_query($dbc,$quertComment);
	$resultNum=mysqli_num_rows($result);
	if($resultNum==0){
		// 没有评论
		print 0;
	}
	else{
		for($i=0;$i<$resultNum;$i++){
			$row=mysqli_fetch_assoc($result);
			print json_encode($row);
			
			if($i<($resultNum-1)){
				print ',';
			}
		}
	}
}
else{
	if(key_exists("chapterId",$_GET)&&$_GET['chapterId']>0){
		// 该文章为连载文章
		$chapterId=mysqli_real_escape_string($dbc,$_GET['chapterId']);
		$quertComment="SELECT * FROM comment WHERE chapterId=".$chapterId." ORDER BY commitId DESC";
		$result=mysqli_query($dbc,$quertComment);
		$resultNum=mysqli_num_rows($result);
		if($resultNum==0){
			// 没有评论
			print 0;
		}
		else{
			for($i=0;$i<$resultNum;$i++){
				$row=mysqli_fetch_assoc($result);
				print json_encode($row);
				
				if($i<($resultNum-1)){
					print ',';
				}
			}
		}
		
	}
}


include("../../php/dbClose.php");

?>