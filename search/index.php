<?php
include("../php/dbConnect.php");
// 用户输入关键字
$wd=mysqli_real_escape_string($dbc,$_GET['wd']);

// 查询作者AJAX
$queryAuthor="SELECT * FROM user WHERE userName LIKE '%".$wd."%';";
$resultAuthor=mysqli_query($dbc,$queryAuthor);
//print "作者数量".mysqli_num_rows($resultAuthor);

// 查询文章
$queryArticle="SELECT A.articleId AS AarticleId,title,articleText,userId,userName,nature,".
"oriAuthor,unSerial,A.readNum AS AreadNum,A.upNum AS AupNum,favoriteNum,A.date AS Adate,type".
",chapterId,B.articleId AS BarticleId,chapterTitle,serialText,B.readNum AS BreadNum,B.upNum ".
"AS BupNum,B.date AS Bdate FROM article A LEFT JOIN serial B ON A.state='2' AND A.articleId=B.articleId ".
"WHERE title LIKE '%".$wd."% OR articleText LIKE '%".$wd."%' OR chapterTitle LIKE '%".$wd."%' OR serialText LIKE '%".$wd."%' ORDER BY A.date DESC LIMIT 7;";

$resultArticle=mysqli_query($dbc,$queryArticle);


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
	
							
							print '<!-- 具体一个相关作者 --><div class="search_specific_article">'.
							'<img src="../userFile/'.$rowAuthor['userId'].'/headPortrait.jpg" alt="head" class="search_author_head">'.
							'<h1 class="search_author_name">'.$keyWdHead.'<span class="key_wd">'.$wd.'</span>'.$keyWdFooter.'</h1>'.
							'<h2 class="search_follow_mark">+关注<input type="hidden" value="'.$rowAuthor['userId'].'" class="follow_hidden_inp"></h2></div><div class="divsion"></div>';
							
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
					
				<!--第1篇-->
				<div class="real_time_article" >

					<!--标题处的一行-->
					<div class="title_row_cont" id="first_article">
						<div class="title_word">一日的春光</div>
						<div class="serial_mark_author_cont">
							<div class="serial_mark">连载</div>
							<div class="original_author">原作者：冰心</div>
						</div>
					</div>
					<!--预览文字-->
					<p class="article_preview">去年冬末，我给一位远方的朋友写信，曾说：“我要尽量的吞咽今年北平的春天。”

						　　今年北平的春天来的特别的晚，而且在还不知春在哪里的时候......
					</p>
					<!--文章底部阅读量等信息-->
					<div id="article_bottom_info_cont">
						<!--左侧阅读，点赞等logo-->
						<div class="info_logo_cont">
							<img src="../file/icon/browse.svg" class="info_logo">
							<span class="detailed_data">123</span>
							<img src="../file/icon/up.svg" class="info_logo">
							<span class="detailed_data">32</span>
							<img src="../file/icon/collection.svg" class="info_logo">
							<span class="detailed_data">55</span>
						</div>

						<!--右侧投稿者-->
						<div class="head_name_cont">
							<img src="../test/head_portrait.jpg" alt="head_portrait" class="head_portrait">
							<div class="user_name">陈独秀asdasd</div>
						</div>

					</div>
				</div>

				
				
				<!-- 无更多结果文字 -->
				<div class="real_time_article">
					<p id="no_result">没有更多结果了~</p>
				</div>
				
				</div><!-- 具体每个文章容器结束 -->
			</div>
			<!--搜索结果文章结束-->


		</div>
	<script src="../js/indexAjaxOtherPage.js"></script>
	<script src="js/index.js"></script>
	<script src="../js/myIndexOtherPage.js"></script>
	</body>
</html>
