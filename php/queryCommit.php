<?php
// 查询评论
include("dbConnect.php");
$commitId=mysqli_real_escape_string($dbc,$_GET['cid']);
$query="SELECT content FROM commit WHERE commitId=".$commitId;
$result=mysqli_query($dbc,$query);
$getContent=mysqli_fetch_assoc($result)['content'];
print $getContent;

include("dbClose.php");
?>