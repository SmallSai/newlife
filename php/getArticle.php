<?php
// 获取各分类文章
include("dbConnect.php");

$articleClass=$_GET['articleClass'];

// $query="SELECT * FROM article WHERE state='2' AND type='".$articleClass."'ORDER BY articleId DESC LIMIT 7";

// 降序查询，id值大的排前面，限制最多查询7条记录
if($articleClass=='1'||$articleClass=='2'||$articleClass=='3'||$articleClass=='4'||$articleClass=='5'){
	$query="SELECT A.articleId AS AarticleId,title,articleText,userId,userName,nature,oriAuthor,unSerial,A.readNum AS AreadNum,A.upNum AS AupNum,favoriteNum,A.date AS Adate,type,chapterId,B.articleId AS BarticleId,chapterTitle,serialText,B.readNum AS BreadNum,B.upNum AS BupNum,B.date AS Bdate FROM article A LEFT JOIN serial B ON A.state='2' AND A.articleId=B.articleId WHERE A.type=".$articleClass." ORDER BY A.date DESC LIMIT 7;";
	// $query="SELECT A.articleId,title,userId,userName,nature,oriAuthor,unSerial,A.readNum,A.upNum,favoriteNum,A.date,type,chapterId,B.articleId,chapterTitle,serialText,B.readNum,B.upNum,B.date FROM article A LEFT JOIN serial B ON A.state='2' AND A.articleId=B.articleId WHERE A.type='1' ORDER BY A.date DESC LIMIT 7";"
}
else{
	if($articleClass=='6'){
		$query="SELECT A.articleId AS AarticleId,title,articleText,userId,userName,nature,oriAuthor,unSerial,A.readNum AS AreadNum,A.upNum AS AupNum,favoriteNum,A.date AS Adate,type,chapterId,B.articleId AS BarticleId,chapterTitle,serialText,B.readNum AS BreadNum,B.upNum AS BupNum,B.date AS Bdate FROM article A,serial B WHERE A.unSerial='1' AND A.articleId=B.articleId AND A.state='2' ORDER BY A.date DESC LIMIT 7";
	}
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
