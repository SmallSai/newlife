<?php
// 获取青春分类文章
include("dbConnect.php");

$articleClass=$_GET['articleClass'];
// 降序查询，id值大的排前面，限制最多查询7条记录
$query="SELECT * FROM article WHERE state='2' AND type='".$articleClass."'ORDER BY articleId DESC LIMIT 7";

if($articleClass=='6'){
	$query="SELECT * FROM article,serial WHERE article.state='2' AND article.articleId=serial.articleId ORDER BY chapterId DESC LIMIT 7";
}

$result=mysqli_query($dbc,$query);

$resultNum=mysqli_num_rows($result); //结果行数

for($num=0;$num<$resultNum;$num++){
	$row=mysqli_fetch_assoc($result);
	print_r(json_encode($row));
	
	if($num<($resultNum-1)){
		print ',';
	}
	
}

mysqli_close($dbc);

?>
