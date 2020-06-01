<?php
// 通过审核或拒绝通过文章
include("dbConnect.php");
$flag=$_GET['flag'];//1-通过 2-拒绝
$userId=$_GET['uid'];

if($flag==1){
	// 通过审核
	if(isset($_GET['aid'])){
		$aid=$_GET['aid'];
		$update="UPDATE article SET state='3' WHERE articleId=".$aid;
		$result=mysqli_query($dbc,$update);
		print mysqli_affected_rows($dbc);
		
		// 插入通过消息
		$insert="INSERT INTO letter(userId,articleId,state,date) VALUES(".$userId.",".$aid.",'0',".time().");";
		mysqli_query($dbc,$insert);
		//print $insert;
	}
	else{
		if(isset($_GET['cid'])){
			$cid=$_GET['cid'];
			$update="UPDATE serial SET state='3' WHERE chapterId=".$cid;
			$result=mysqli_query($dbc,$update);
			print mysqli_affected_rows($dbc);
			
			// 插入通过消息
			$insert="INSERT INTO letter(userId,chapterId,state,date) VALUES(".$userId.",".$cid.",'0',".time().");";
			//print $insert;
			mysqli_query($dbc,$insert);
		}
	}
}
else{
	if($flag==2){
		// 拒绝审核
		$banReason=$_GET['reason'];
		print "php:".$banReason;
		if(isset($_GET['aid'])){
			$aid=$_GET['aid'];
			$update="UPDATE article SET state='4' WHERE articleId=".$aid;
			$result=mysqli_query($dbc,$update);
			print mysqli_affected_rows($dbc);
			
			// 插入通过消息
			$insert="INSERT INTO letter(userId,articleId,state,date,banReason) VALUES(".$userId.",".$aid.",'1',".time().",'".$banReason."');";
			mysqli_query($dbc,$insert);
			//print $insert;
		}
		else{
			if(isset($_GET['cid'])){
				$cid=$_GET['cid'];
				$update="UPDATE serial SET state='4' WHERE chapterId=".$cid;
				$result=mysqli_query($dbc,$update);
				print mysqli_affected_rows($dbc);
				
				// 插入通过消息
				$insert="INSERT INTO letter(userId,chapterId,state,date,banReason) VALUES(".$userId.",".$cid.",'1',".time().",'".$banReason."');";
				mysqli_query($dbc,$insert);
				//print $insert;
			}
		}
	}
}


include("dbClose.php");

?>