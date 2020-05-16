<?php
include("../php/dbConnect.php");
// 访问的Id
$pId=mysqli_real_escape_string($dbc,$_GET['pid']);
$queryPid="SELECT * FROM user WHERE userId=".$pId;
$result=mysqli_query($dbc,$queryPid);

$pName='';
$pSex='';
$pOld='';
$pPlace='';
$pSing='';
$pArticleNum='';
$pFavoriteNum='';
$pFollowNum='';
$pDraft='';
$pFanNum='';
$pUpNum='';
$allReadNum='';

if(mysqli_num_rows($result)!=1){
	// 未查询到有用户
	
	include("../php/dbClose.php");
	die();
}
else{
	// 查询到有用户
	$row=mysqli_fetch_assoc($result);
	
	$pName=$row['userName'];
	$pSex=$row['sex'];
	$pOld=$row['old'];
	$pPlace=$row['place'];
	$pSign=$row['sign'];
	$pArticleNum=$row['articleNum'];
	$pFavoriteNum=$row['favoriteNum'];
	$pFollowNum=$row['followNum'];
	$pDraftNum=$row['draftNum'];
	$pFanNum=$row['fanNum'];
	$pUpNum=$row['upNum'];
	$pAllReadNum=$row['allReadNum'];
	
	// 用户文章
	$queryArticle="SELECT * FROM article WHERE userId=".$pId." AND state='2';";
	$resultArticle=mysqli_query($dbc,$queryArticle);
	
	// 用户收藏
	$queryFavorite="SELECT articleId FROM favorite WHERE userId=".$pId;
	$resultFavorite=mysqli_query($dbc,$queryFavorite);
	
	// 用户关注
	$queryFollow="SELECT * FROM follow WHERE userId=".$pId;
	$resultFollow=mysqli_query($dbc,$queryFollow);
	
	// 用户草稿
	$queryDraft="SELECT * FROM article,serial WHERE userId=".$pId." AND article.articleId=serial.articleId AND (article.state='1' OR serial.state='1');";
	$resultDraft=mysqli_query($dbc,$queryDraft);
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>personal</title>
	<link rel="stylesheet" type="text/css" href="css/personal.css">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="fonts/iconfont.css">
    <link rel="stylesheet" type="text/css" href="../css/header.css">
    <script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
	<script>
		$(document).ready(function(){
		  $("#tab1").click(function(){
		    $(".trans1").show();
		    $(".trans2").hide();
		    $(".trans3").hide();
		    $(".trans4").hide();
		    $("#tab1").addClass("choice");
		    $("#tab2").removeClass("choice");
		    $("#tab3").removeClass("choice");
		    $("#tab4").removeClass("choice");
		  });
		  // $("#show").click(function(){
		  //   $("p").show();
		  // });
		  $("#tab2").click(function(){
		    $(".trans2").show();
		    $(".trans1").hide();
		    $(".trans3").hide();
		    $(".trans4").hide();
		    $("#tab2").addClass("choice");
		    $("#tab1").removeClass("choice");
		    $("#tab3").removeClass("choice");
		    $("#tab4").removeClass("choice");
		  });
		  $("#tab3").click(function(){
		    $(".trans3").show();
		    $(".trans2").hide();
		    $(".trans1").hide();
		    $(".trans4").hide();
		    $("#tab3").addClass("choice");
		    $("#tab2").removeClass("choice");
		    $("#tab1").removeClass("choice");
		    $("#tab4").removeClass("choice");
		  });
		  $("#tab4").click(function(){
		    $(".trans4").show();
		    $(".trans2").hide();
		    $(".trans3").hide();
		    $(".trans1").hide();
		    $("#tab4").addClass("choice");
		    $("#tab2").removeClass("choice");
		    $("#tab3").removeClass("choice");
		    $("#tab1").removeClass("choice");
		  });
		  //收藏图标隐藏显示
		  $(".open").click(function(){
		    $(".close").show();
		    $(".open").hide();
		  });
		  $(".close").click(function(){
		    $(".open").show();
		    $(".close").hide();
		  });
		  //删除图标悬停
		  $("#hoverdel").hover(function(){
		    $("#delete").css("display","block");
		    },function(){
		    $("#delete").css("display","none");
		  });
		  $("#delete").click(function(){
    		$(".tipdel").toggle();
  		  });
		  //关注图标悬停
		  $(".ap_button").hover(function(){
		    $(".ap_but1").css("display","block");
		    },function(){
		    $(".ap_but1").css("display","none");
		  });
		  //草稿部分删除图标
		  $("#hover_caog").mouseenter(function(){
    		$("#de_caog").css("display","block");
  			});
  		  $("p").mouseleave(function(){
    		$("#de_caog").css("display","none");
  		  });
  		  $("#de_caog").click(function(){
    		$(".tipdel").toggle();
  		  });
		});
	</script>
</head>
<body>
	<!-- 顶部盒子 -->
	<?php print '<input type="hidden" value="'.$pId.'" id="hidden_inp_pid">'; ?>
	<script src="../include/header.js"></script>
	<!-- 右侧简介 -->
	<div class="introduce" style="background: url(img/bg.jpg);background-size: cover;">
		<div style="width: 100%;height: 620px;background-color: rgba(0,0,0,0.3);">
			<div class="intr_hp" style="background: url(img/touxiang.jpg);background-size: cover;" id="change_info_cont">
				<p id="change_info">修改信息</p>
			</div>
			<div class="intr_name">
				<div class="authorname"><p>&nbsp;
					<?php print $pName; ?>
				</p>
				</div>
				<div class="intr_other"><p>性别：
				<?php 
					if($pSex=='0'){ 
						print '保密';
					}
					else{
						if($pSex=='1'){
							print '男';
						}
						else{
							print '女';
						}
					}
				?>
				&nbsp;&nbsp;年龄：<?php print $pOld; ?>&nbsp;&nbsp;居住地：<?php print $pPlace; ?> </p></div>
			</div>
			<div class="authorgraph">
				<p>"&nbsp;&nbsp;&nbsp;
					<?php print $pSign; ?>
				"</p>
			</div>
			<div class="authordata">
				<p class="data_num">粉丝数：<?php print $pFanNum; ?></p>
				<p class="data_num">点赞数：<?php print $pUpNum; ?></p>
				<p class="data_num">总阅读：<?php print $pAllReadNum; ?></p>
			</div>
		</div>
	</div>
	<!-- 主题内容 -->
	<div class="content">
		<nav class="nav">
			<ul>
				<li id="tab1" class="choice"><p class="iconfont icon-dingdan" style="font-size: 28px">&nbsp;文章</p></li>
				<li id="tab2"><p class="iconfont icon-collection" style="font-size: 28px">&nbsp;收藏</p></li>
				<li id="tab3"><p class="iconfont icon-shuangren" style="font-size: 28px">&nbsp;关注</p></li>
				<li id="tab4"><p class="iconfont icon-pencil" style="font-size: 28px">&nbsp;草稿</p></li>
			</ul>
		</nav>
		
		<!-- 我的文章容器 -->
		<div class="wenzhang trans1">
		<?php
			// 文章数量
			$resultArticleNum=mysqli_num_rows($resultArticle);
			if($resultArticleNum==0){
				// 无文章
				print '<p class="not_article">没有文章</p>';
			}
			else{
				// 有文章
				for($i=0;$i<$resultArticleNum;$i++){
					$row=mysqli_fetch_assoc($resultArticle);
					if($row['unSerial']=='0'){
						// 单篇文章
						$articlePreview=substr($row['articleText'],0,180);
						
						print '<!-- 第N篇 --><div class="partone" id="hoverdel"><div class="title"><p>'.$row['title'].'</p></div>'.
					'<div class="tipdel"><button class="but">删除</button><button class="butother">取消</button></div><div id="icon_sc" style="top: 35px">'.
					'<a class="glyphicon glyphicon-trash" style="font-size: 20px;color: black;text-decoration: none;" id="delete"></a></div>'.
					'<div class="duanwen" id="del"><p><a href="../read/index.php?aid='.$row['articleId'].'" target="_blank">'.$articlePreview.'</a>......</p></div><div class="downright"><ul><li></li>'.
					'<li class="iconfont icon-view">&nbsp;&nbsp;'.$row['readNum'].'</li><li class="iconfont icon-good">&nbsp;&nbsp;'.$row['upNum'].'</li></ul></div></div>';	
					}
					else{
						// 连载文章
						print '<!-- 第N篇 --><div class="partone"><div class="title">'.$row['title'].'</div>'.
						'<div style="margin-left: 10px;margin-top: 5px;font-size: 13px;float: left;border: 1px solid #4bb8ed;color: #4bb8ed;">连载</div>'.
						'<div class="duanwen"><p class="view_chapter">查看章节</p></div><div class="downright"><ul><li></li><li class="iconfont icon-view">&nbsp;&nbsp;'.$row['readNum'].'</li>'.
						'<li class="iconfont icon-good">&nbsp;&nbsp;'.$row['upNum'].'</li></ul></div></div>';
					}
					
					if($i%2!=1&&($resultArticleNum>=2)){
						// 奇数篇打印中间隔行
						print '<!-- 中间隔行 --><div class="middle"></div>';
					}
				}
			}		
		?>
		</div><!-- 我的文章容器结束 -->
		
		<!-- 我的收藏 -->
   		<div class="tab-item trans2">
		<?php
			// 收藏数量
			$resultFavoriteNum=mysqli_num_rows($resultFavorite);
			if($resultFavoriteNum==0){
				// 无收藏
				print '<p class="not_article">没有收藏文章</p>';
			}
			else{
				function aidGetArticle($aid){
					// 通过articleId获取文章信息并打印,用于查看收藏
					$query="SELECT * FROM article WHERE articleId=".$aid;
					global $dbc;
					$result=mysqli_query($dbc,$query);
					$row=mysqli_fetch_assoc($result);
					
					if($row['unSerial']=='0'){
						// 单篇文章
						print '<!-- 第N篇收藏 --><div class="partone"><div class="title"><p>'.$row['title'].'</p></div><div id="icon_sc">'.
						'<a class="iconfont icon-mark open" style="font-size: 30px;color: #f6c160;text-decoration: none;" title="取消收藏"></a>'.
						'<a class="iconfont icon-mark-o close" style="font-size: 30px;color: #f6c160;text-decoration: none;opacity: 1" title="收藏该文章">'.
						'</a></div><div class="duanwen"><p>'.substr($row['articleText'],0,180).'......</p></div><div class="downright"><ul><li class="userName" style="width:180px;text-align:right">'.$row['userName'].
						'</li><li class="iconfont icon-view">&nbsp;&nbsp;'.$row['readNum'].'</li><li class="iconfont icon-good">&nbsp;&nbsp;20</li>'.
						'</ul></div></div>';	
					}
					else{
						// 连载文章
						print '<!-- 第N篇 --><div class="partone"><div class="title">'.$row['title'].'</div>'.
						'<div style="margin-left: 10px;margin-top: 5px;font-size: 13px;float: left;border: 1px solid #4bb8ed;color: #4bb8ed;">连载</div>'.
						'<div class="duanwen"><p>查看章节</p></div><div class="downright"><ul><li class="userName" style="width:180px;text-align:right">'.$row['userName'].'</li><li class="iconfont icon-view">&nbsp;&nbsp;'.$row['readNum'].'</li>'.
						'<li class="iconfont icon-good">&nbsp;&nbsp;'.$row['upNum'].'</li></ul></div></div>';
					}
				}
				
				// 有收藏
				for($i=0;$i<$resultFavoriteNum;$i++){
					$favoriteAid=mysqli_fetch_assoc($resultFavorite)['articleId'];//得到收藏文章的articleId;
					aidGetArticle($favoriteAid);
				
					if(($i%2!=1)&&($resultFavoriteNum>=2)){
						// 奇数篇打印中间隔行
						print '<!-- 中间隔行 --><div class="middle"></div>';
					}
				}
			}
		?>			
   		</div><!-- 我的收藏容器结束 -->
		
		<!-- 我的关注 -->
   		<div class="tab-item trans3">
		<?php
			$resultFollowNum=mysqli_num_rows($resultFollow);
			if($resultFollowNum==0){
				// 无关注
				print '<p class="not_article">没有关注的作者</p>';
			}
			else{
				// 有关注
				function uidGetUser($uid){
					// 通过userId获取用户信息并打印,用于查看关注
					$query="SELECT * FROM user WHERE userId=".$uid;
					
					$result=mysqli_query($aid,$query);
					$row=mysqli_fetch_assoc($result);
					
					print '<div class="partone"><div class="attentionpeop"><img src="../userFile/'.$row['userId'].'/headPortrait.jpg"></div>'.
					'<div class="ap_content"><div class="ap_name"><p style="margin-top: 20px">'.$row['userName'].'</p></div><div class="ap_button">'.
					'<button class="ap_but1">取消关注</button><button class="ap_but2">已关注</button></div><div class="ap_intro"><p style="margin-top: 8px">'.
					'共发表了'.$row['articleNum'].'篇文章</p></div></div></div>';
				}
				
				for($i=0;$i<$resultFollowNum;$i++){
					$followUid=mysqli_fetch_assoc($resultFollow);
					uidGetUser($followUid);
					
					if(($i%2!=1)&&($resultFollowNum>=2)){
						// 奇数篇打印中间隔行
						print '<!-- 中间隔行 --><div class="middle"></div>';
					}
				}
			}
		?>
   		</div>
		
		<!-- 我的草稿 -->
   		<div class="tab-item trans4">
		<?php
			$resultDraftNum=mysqli_num_rows($resultDraft);
			if($resultDraftNum==0){
				// 无草稿
				print '<p class="not_article">没有草稿</p>';
				
			}
			else{
				// 有草稿
				for($i=0;$i<$resultDraftNum;$i++){
					$row=mysql_fetch_assoc($resultDraft);
					
					if($row['unSerial']=='0'){
						// 单篇
						print '<div class="partone" id="hover_caog"><div class="title"><p>'.$row['title'].'</p></div><div class="tipdel">'.
						'<button class="but">删除</button><button class="butother">取消</button></div><div id="icon_sc" style="top: 35px">'.
						'<a class="glyphicon glyphicon-trash" style="font-size: 20px;color: black;text-decoration: none;" id="de_caog"></a>'.
						'</div><div class="duanwen"><p>'.$row['articleText'].substr(0,60).'......</p></div><div class="downright"></div></div>';
					}
					else{
						// 连载
						print '<div class="partone"><div class="title">'.row['chapterTitle'].'</div><div style="margin-left: 10px;margin-top: 5px;font-size: 13px;float: '.
						'left;border: 1px solid #4bb8ed;color: #4bb8ed;">连载</div><div class="duanwen"><p>查看目录</p></div><div class="downright"><p style="float: right;">'.
						$row['title'].'</p></div></div>';
					}
					
					if(($i%2!=1)&&($resultDraftNum>=2)){
						// 奇数篇打印中间隔行
						print '<!-- 中间隔行 --><div class="middle"></div>';
					}
				}
			}
			
			include("../php/dbClose.php");
		?>
   			
   		</div>
   		<div class="qiehuan">
			<div class="turnleft"><p class="glyphicon glyphicon-menu-left"></p></div>
			<div><p class="glyphicon glyphicon-menu-right"></p></div>
		</div>
	</div>
	<script src="../js/deleteCookieOtherPage.js"></script>
	<script src="js/personalAjax.js"></script>
</body>
</html>