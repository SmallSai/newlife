<?php
// 查看章节目录加载章节
include("../../php/dbConnect.php");

$aid=mysqli_real_escape_string($dbc,$_GET['aid']);
$query="SELECT * FROM serial WHERE articleId=".$aid;
$result=mysqli_query($dbc,$query);
$resultNum=mysqli_num_rows($result);
if($resultNum){
	for($i=0;$i<$resultNum;$i++){
		$row=mysqli_fetch_assoc($result);
		print json_encode($row);
		
		if($i<$resultNum-1){
			print ',';
		}
	}
}
else{
	print 0;
}

include("../../php/dbClose.php");
?>