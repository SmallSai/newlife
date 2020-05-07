<?php
//加载草稿章节标题
include("../../php/dbConnect.php");

$articleId=mysqli_real_escape_string($dbc,htmlspecialchars($_GET['articleId']));
$query="SELECT * FROM serial WHERE articleId=".$articleId.";";

$result=mysqli_query($dbc,$query);
$resultNum=mysqli_num_rows($result);
if($resultNum==0){
	print 0;
}
else{
	for($i=0;$i<$resultNum;$i++){
		print json_encode(mysqli_fetch_assoc($result));
		
		if($i<($resultNum-1)){
			print ',';
		}
	}
}

include("../../php/dbClose.php");
?>