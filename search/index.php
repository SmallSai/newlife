<?php
include("../php/dbConnect.php");
// 用户输入关键字
$wd=mysqli_real_escape_string($dbc,$_GET['wd']);
if(!$wd){
	$wd="青春";
}

// 查询作者AJAX
$queryAuthor="SELECT * FROM user WHERE userName LIKE '%".$wd."%';";
$resultAuthor=mysqli_query($dbc,$queryAuthor);
//print "作者数量".mysqli_num_rows($resultAuthor);

//查询文章
$queryArticle="SELECT A.state AS Astate,B.state AS Bstate,A.articleId AS AarticleId,title,articleText,userId,userName,nature,".
"oriAuthor,unSerial,A.readNum AS AreadNum,A.upNum AS AupNum,favoriteNum,A.date AS Adate,type".
",chapterId,B.articleId AS BarticleId,chapterTitle,serialText,B.readNum AS BreadNum,B.upNum ".
"AS BupNum,B.date AS Bdate FROM article A LEFT JOIN serial B ON A.articleId=B.articleId ".
"WHERE (title LIKE '%".$wd."%' OR articleText LIKE '%".$wd."%' OR chapterTitle LIKE '%".$wd."%' OR serialText LIKE '%".$wd."%') AND ((A.state='3' AND A.unSerial='0') OR (A.unSerial='1' AND B.state='3')) ORDER BY A.date DESC LIMIT 7;";

//$queryArticle="SELECT A.state AS Astate,B.state AS Bstate,A.articleId AS AarticleId,title,articleText,userId,userName,nature,oriAuthor,unSerial,A.readNum AS AreadNum,A.upNum AS AupNum,favoriteNum,A.date AS Adate,type,chapterId,B.articleId AS BarticleId,chapterTitle,serialText,B.readNum AS BreadNum,B.upNum AS BupNum,B.date AS Bdate FROM article A LEFT JOIN serial B ON A.articleId=B.articleId WHERE ((A.state='3' AND A.unSerial='0') OR (A.unSerial='1' AND B.state='3')) ORDER BY A.date DESC LIMIT 7;";
 //print $queryArticle;
$resultArticle=mysqli_query($dbc,$queryArticle);
//print mysqli_num_rows($resultArticle);

include("../php/dbClose.php");
?>
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<title>搜索-
			<?php print $wd;?>
		</title>
		<link rel="stylesheet" href="../css/header.css"/>
		<link href="../css/general_purpose.css" rel="stylesheet">
		<link href="css/search.css" rel="stylesheet">
		<script src="../include/jquery-3.4.1.min.js"></script>
	</head>

	<body>
		<?php
			print "<input type='hidden' id='hidden_wd_html' value='".$wd."'>";
		?>
		
		<script src="../include/header.js"></script>
		

		<!--主视图容器-->
		<div id="main_view_cont">

			<!--搜索结果：作者-->
			<div id="search_author_cont">

				<!--结果框标题-->
				<h1 class="frame_title">
					<img src="image/group.svg" class="title_logo">相关作者
				</h1>

				<!-- 具体相关作者容器-->
				<div id="search_article">

					<?php
					// 总共搜索出的作者数
					$resultAuthorNum=mysqli_num_rows($resultAuthor);
					if($resultAuthorNum){
						// 有搜索结果
						for($i=0;$i<=6;$i++){
							$rowAuthor=mysqli_fetch_assoc($resultAuthor);
							
							$getUserName=$rowAuthor['userName'];
							
							$wdLength=mb_strlen($wd);//关键字长度
							$keyWdHead=strstr($getUserName,$wd,true);// 关键字之前部分
							$keyWdFooter=mb_substr(strstr($getUserName,$wd),$wdLength);//关键字之后部分
	
							
							print '<!-- 具体一个相关作者 --><a href="../personal/personal.php?pid='.$rowAuthor['userId'].'" target="_blank"><div class="search_specific_article">'.
							'<div class="search_author_head_div"><img src="../userFile/'.$rowAuthor['userId'].'/headPortrait.jpg" alt="head" class="search_author_head"></div></a>'.
							'<h1 class="search_author_name">'.$keyWdHead.'<span class="key_wd">'.$wd.'</span>'.$keyWdFooter.'</h1>'.
							'<h2 class="search_follow_mark" onload="checkFollow()"><span class="sp_follow_word">+关注</span><input type="hidden" value="'.$rowAuthor['userId'].'" class="follow_hidden_inp"></h2></div><div class="divsion"></div>';
							
							if($i==($resultAuthorNum-1)){
								// 已经历遍最后一个结果，退出
								break;
							}
						}									
					}
					else{
						// 没有搜索结果
						print "<p id='no_author'>没有找到相关作者~</p>";
					}
					
					?>

				</div>



			</div>

			<!--搜索结果：文章-->
			<div id="search_article_cont">

				<!--结果框文章-->
				<div id="search_article_class">
					<!-- 分类 -->
					<div id="class_cont">
						<p class="specifi_class" id="classYouth">青春</p>
						<p class="specifi_class" id="classReality">现实</p>
						<p class="specifi_class" id="classFantasy">幻想</p>
						<p class="specifi_class" id="classNovel">小说</p>
						<p class="specifi_class" id="classProse">散文</p>
						<p class="specifi_class" id="classSerial">连载</p>
					</div>
				</div>
				
				
				<!-- 具体每个文章容器 -->
				<div id="every_article_cont">
					
		
				
				<!-- 无更多结果文字 -->
				<div class="real_time_article" id="not_more_article">
					<p id="no_result">没有更多结果了~</p>
				</div>
				
				</div><!-- 具体每个文章容器结束 -->
			</div>
			<!--搜索结果文章结束-->


		</div>
	<script src="../js/indexAjaxOtherPage.js"></script>
	<script src="js/index.js"></script>
	<script src="js/indexUserInfo.js"></script>
	<script src="js/demo.js"></script>
	</body>
</html>
