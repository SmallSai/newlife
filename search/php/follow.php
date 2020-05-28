<?php
// 查看用户间的关注情况
include("../../php/dbConnect.php");

$userId=mysqli_real_escape_string($dbc,$_GET['userId']);
$beFollowUserId=mysqli_real_escape_string($dbc,$_GET['beFollowUid']);
$flag=$_GET['flag'];//操作标记，1-查询被关注，2-关注，3-取关

// 查询被关注
if($flag==1){
	$query="SELECT * FROM follow WHERE userId=".$userId." AND beFollowUid=".$beFollowUserId;
	$result=mysqli_query($dbc,$query);
	print mysqli_num_rows($result);//返回0表示还未关注，1表示已经关注
	// print '被关注的uid：'.$beFollowUserId;
}

// 关注作者
if($flag==2){
	// 关注者与被关注者的ID插入到关注表中
	$insert="INSERT INTO follow VALUES(".$userId.",".$beFollowUserId.");";
	mysqli_query($dbc,$insert);
	if(mysqli_affected_rows($dbc)==1){
		// 插入成功，让被关注者粉丝数加1
		$update="UPDATE user SET fanNum=fanNum+1 WHERE userId=".$beFollowUserId;
		mysqli_query($dbc,$update);
		print 1;
	}
	else{
		// 插入失败，已经关注
		print "语句：".$insert;
		print "错误：".mysqli_error($dbc);
		print 0;
	}
}

// 取关操作
if($flag==3){
	$delete="DELETE FROM follow WHERE userId=".$userId." AND beFollowUid=".$beFollowUserId;
	mysqli_query($dbc,$delete);
	print mysqli_affected_rows($dbc);
	
	// 被关注者关注数-1
	$update="UPDATE user SET fanNum=fanNum-1 WHERE userId=".$beFollowUserId;
	mysqli_query($dbc,$update);
}


include("../../php/dbClose.php");
?>