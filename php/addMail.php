<?php
include("dbConnect.php");

// 加载用户消息脚本
$userId=mysqli_real_escape_string($dbc,$_GET['uid']);
$query="SELECT banReason,u.userName,a.title,c.content,s.chapterTitle,l.chapterId,l.state,l.date FROM letter l LEFT JOIN article a ON l.articleId=a.articleId LEFT JOIN comment c ON l.commitId=c.commitId LEFT JOIN serial s ON s.chapterId=l.chapterId ".
"LEFT JOIN user u ON u.userId=l.actUserId WHERE l.userId=".$userId." AND l.unRead='1' ORDER BY l.date DESC;";
$result=mysqli_query($dbc,$query);
$resultNum=mysqli_num_rows($result);
for($i=0;$i<$resultNum;$i++){
	print json_encode(mysqli_fetch_assoc($result));
	if($i<$resultNum-1){
		print ',';
	}
}

// 将所有信息设为已读
$update="UPDATE letter SET unRead='2' WHERE userId=".$userId;
mysqli_query($dbc,$update);

include("dbClose.php");
?>