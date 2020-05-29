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

}


?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php print $pName;?>的主页</title>
	<link rel="stylesheet" type="text/css" href="css/personal.css">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="fonts/iconfont.css">
    <link rel="stylesheet" type="text/css" href="../css/header.css">
	<link rel="stylesheet" type="text/css" href="../library/css/viewChapter.css"/>
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
			<div class="intr_hp" style="background: url(../userFile/<?php print $pId;?>/headPortrait.jpg);background-size: cover;" id="change_info_cont">
				<a href="../changeInfo" target="_blank"><p id="change_info">修改信息</p></a>
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
				<p id="follow_cont">关注作者</p>
			</div>
		</div>
	</div>
	<!-- 主题内容 -->
	<div class="content">
		<nav class="nav">
			<ul>
				<li id="tab1" class="choice"><p class="iconfont icon-dingdan" style="font-size: 28px" id="title_article">&nbsp;文章</p></li>
				<li id="tab2"><p class="iconfont icon-collection" style="font-size: 28px" id="title_favorite">&nbsp;收藏</p></li>
				<li id="tab3"><p class="iconfont icon-shuangren" style="font-size: 28px" id="title_follow">&nbsp;关注</p></li>
				<li id="tab4"><p class="iconfont icon-pencil" style="font-size: 28px" id="title_draft">&nbsp;草稿</p></li>
			</ul>
		</nav>
		
		<!-- 我的文章容器 -->
		<div class="wenzhang trans1">
		
		</div><!-- 我的文章容器结束 -->
		
		<!-- 我的收藏 -->
   		<div class="tab-item trans2">
		
   		</div><!-- 我的收藏容器结束 -->
		
		<!-- 我的关注 -->
   		<div class="tab-item trans3">
		
   		</div>
		
		<!-- 我的草稿 -->
   		<div class="tab-item trans4">
		
   			
   		</div>
   		<div class="qiehuan">
			<div class="turnleft"><p class="glyphicon glyphicon-menu-left previous_page"></p></div>
			<div><p class="glyphicon glyphicon-menu-right next_page"></p></div>
		</div>
	</div>
	
	<!-- 沾满整个屏幕的容器，展示章节目录 -->
	<div id="show_chapter_cont">
		<!-- 展示章节目录容器 -->
		<div id="show_chapter">
			<!-- 关闭窗口的叉号 -->
			<div id="close_window">×</div>
			
			<!-- 文章标题 -->
			<h1 id="title"></h1>
			
			<!-- 装载章节的容器 -->
			<div id="chapter_cont">
				
			</div>
		</div>
	</div><!-- 满屏容器结束 -->
	
	<script src="../js/deleteCookieOtherPage.js"></script>
	<script src="js/personalAjax.js"></script>
	<!-- <script src="js/viewchapter.js"></script> -->
</body>
</html>