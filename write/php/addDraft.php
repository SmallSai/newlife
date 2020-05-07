<?php
//加载用户草稿脚本
include("../../php/dbConnect.php");
$userId=$_GET['userId'];

$queryArticle="SELECT articleId,title,unSerial FROM article WHERE userId=".$userId." AND state='1';";

$result=mysqli_query($dbc,$queryArticle);
$resultNum=mysqli_num_rows($result); //结果集行数

for($i=0;$i<$resultNum;$i++){
	$row=mysqli_fetch_assoc($result);
	print_r(json_encode($row));
	
	if($i<($resultNum-1)){
		print ',';
	}
	
}

include("../../php/dbClose.php");
?>