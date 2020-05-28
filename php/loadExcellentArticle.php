<?php
include("dbConnect.php");
// 加载优秀文章
$query="SELECT * FROM article WHERE isExcellent='1' AND unSerial='0' ORDER BY RAND() LIMIT 4;";
$result=mysqli_query($dbc,$query);
$resultNum=mysqli_num_rows($result);

for($i=0;$i<$resultNum;$i++){
	$row=mysqli_fetch_assoc($result);
	print json_encode($row);
	
	if($i<$resultNum-1){
		print ',';
	}
}


include("dbClose.php");
?>