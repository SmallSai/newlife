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
	header("Location:../");
	die();
}
else{
	// 查询到有用户
	$row=mysqli_fetch_assoc($dbc,$result);
	
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
	$queryArticle="SELECT * FROM article WHERE userId=".$pId;
	$resultArticle=mysqli_query($dbc,$queryArticle);
}

include("../php/dbClose.php");
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
			<div class="intr_hp" style="background: url(img/touxiang.jpg);background-size: cover;">
			</div>
			<div class="intr_name">
				<div class="authorname"><p>&nbsp;
					<?php print $pName; ?>
				</p>
				</div>
				<div class="intr_other"><p>性别：
				<?php 
					if(pSex=='0'){ 
						print '保密';
					}
					else{
						if(pSex=='1'){
							print '男';
						}
						else{
							print '女';
						}
					}
				?>
				&nbsp;&nbsp;年龄：<?php print $old; ?>&nbsp;&nbsp;居住地：<?php print $pPlace; ?> </p></div>
			</div>
			<div class="authorgraph">
				<p>"&nbsp;&nbsp;&nbsp;
					<?php print $pSign; ?>
				"</p>
			</div>
			<div class="authordata">
				<p>粉丝数：<?php print $pFanNum; ?></p>
				<p>点赞数：<?php print $pUpNum; ?></p>
				<p>总阅读：<?php print $pAllReadNum; ?></p>
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
		<div class="wenzhang trans1">
			
			<!-- 第N篇文章 -->
			<div class="partone" id="hoverdel">
				<div class="title">
					<p>济南的冬天</p>
				</div>
				<div class="tipdel">
					<button class="but">删除</button>
					<button class="butother">取消</button>
				</div>
				<div id="icon_sc" style="top: 35px">
					<a class="glyphicon glyphicon-trash" style="font-size: 20px;color: black;text-decoration: none;" id="delete"></a>
				</div>
				<div class="duanwen" id="del">
					<p>对于一个在北平住惯的人，像我，冬天要是不刮风，便觉得是奇迹；济南的冬天是没有风声的。对于一个刚由伦敦回来的人......</p>
				</div>
				<div class="downright">
					<ul>
						<li></li>
						<li class="iconfont icon-view">&nbsp;&nbsp;20</li>
						<li class="iconfont icon-good">&nbsp;&nbsp;20</li>
					</ul>
				</div>
			</div>
			
			<div class="middle"></div>
			
			<div class="partone">
				<div class="title">三国演义</div>
				<div style="margin-left: 10px;margin-top: 5px;font-size: 13px;float: left;border: 1px solid #4bb8ed;color: #4bb8ed;">连载</div>
				<div class="duanwen">
					<p>第一章：桃园三结义&nbsp;话说天下大势，分久必合，合久必分。周末七国纷争，并入于秦。及秦灭之后，楚、汉......</p>
				</div>
				<div class="downright">
					<ul>
						<li></li>
						<li class="iconfont icon-view">&nbsp;&nbsp;20</li>
						<li class="iconfont icon-good">&nbsp;&nbsp;20</li>
					</ul>
				</div>
			</div>
			
			<div class="partone">
				<div class="title">
					<p>济南的冬天</p>
				</div>
				<div class="duanwen">
					<p>对于一个在北平住惯的人，像我，冬天要是不刮风，便觉得是奇迹；济南的冬天是没有风声的。对于一个刚由伦敦回来的人......</p>
				</div>
				<div class="downright">
					<ul>
						<li></li>
						<li class="iconfont icon-view">&nbsp;&nbsp;20</li>
						<li class="iconfont icon-good">&nbsp;&nbsp;20</li>
					</ul>
				</div>
			</div>
			<div class="middle"></div>
		</div>
   		<div class="tab-item trans2">
			<div class="partone">
				<div class="title">
					<p>济南的冬天</p>
				</div>
				<div id="icon_sc">
					<a class="iconfont icon-mark open" style="font-size: 30px;color: #f6c160;text-decoration: none;" title="取消收藏"></a>
					<a class="iconfont icon-mark-o close" style="font-size: 30px;color: #f6c160;text-decoration: none;opacity: 1" title="收藏该文章"></a>
				</div>
				<div class="duanwen">
					<p>对于一个在北平住惯的人，像我，冬天要是不刮风，便觉得是奇迹；济南的冬天是没有风声的。对于一个刚由伦敦回来的人......</p>
				</div>
				<div class="downright">
					<ul>
						<li>老舍</li>
						<li class="iconfont icon-view">&nbsp;&nbsp;20</li>
						<li class="iconfont icon-good">&nbsp;&nbsp;20</li>
					</ul>
				</div>
			</div>
			<div class="middle"></div>
			<div class="partone">
				<div class="title">三国演义</div>
				<div style="margin-left: 10px;margin-top: 5px;font-size: 13px;float: left;border: 1px solid #4bb8ed;color: #4bb8ed;">连载</div>
				<div class="duanwen">
					<p>第一章：桃园三结义&nbsp;话说天下大势，分久必合，合久必分。周末七国纷争，并入于秦。及秦灭之后，楚、汉......</p>
				</div>
				<div class="downright">
					<ul>
						<li>罗贯中</li>
						<li class="iconfont icon-view">&nbsp;&nbsp;20</li>
						<li class="iconfont icon-good">&nbsp;&nbsp;20</li>
					</ul>
				</div>
			</div>
			<div class="partone">
				<div class="title">
					<p>济南的冬天</p>
				</div>
				<div class="duanwen">
					<p>对于一个在北平住惯的人，像我，冬天要是不刮风，便觉得是奇迹；济南的冬天是没有风声的。对于一个刚由伦敦回来的人......</p>
				</div>
				<div class="downright">
					<ul>
						<li>老舍</li>
						<li class="iconfont icon-view">&nbsp;&nbsp;20</li>
						<li class="iconfont icon-good">&nbsp;&nbsp;20</li>
					</ul>
				</div>
			</div>
			<div class="middle"></div>
   		</div>
   		<div class="tab-item trans3">
   			<div class="partone">
   				<div class="attentionpeop">
   					<img src="img/laoshe.jpg">
   				</div>
   				<div class="ap_content">
   					<div class="ap_name"><p style="margin-top: 20px">老舍</p></div>
   					<div class="ap_button">
   						<button class="ap_but1">取消关注</button>
   						<button class="ap_but2">已关注</button>
   					</div>
   					<div class="ap_intro">
   						<p style="margin-top: 8px">共发表了3篇文章，代表作《骆驼祥子》</p>
   					</div>
   				</div>
   			</div>
   			<div class="middle"></div>
   			<div class="partone">
   				<div class="attentionpeop">
   					<img src="img/laoshe.jpg">
   				</div>
   				<div class="ap_content">
   					<div class="ap_name"><p style="margin-top: 20px">老舍</p></div>
   					<!-- <div class="ap_button">
   						<button class="ap_but1">取消关注</button>
   						<button class="ap_but2">已关注</button>
   					</div> -->
   					<div class="ap_intro">
   						<p style="margin-top: 8px">共发表了3篇文章，代表作《骆驼祥子》</p>
   					</div>
   				</div>
   			</div>
   			<div class="partone">
   				<div class="attentionpeop">
   					<img src="img/laoshe.jpg">
   				</div>
   				<div class="ap_content">
   					<div class="ap_name"><p style="margin-top: 20px">老舍</p></div>
   					<!-- <div class="ap_button">
   						<button class="ap_but1">取消关注</button>
   						<button class="ap_but2">已关注</button>
   					</div> -->
   					<div class="ap_intro">
   						<p style="margin-top: 8px">共发表了3篇文章，代表作《骆驼祥子》</p>
   					</div>
   				</div>
   			</div>
   		</div>
   		<div class="tab-item trans4">
   			<div class="partone" id="hover_caog">
				<div class="title">
					<p>第一章：桃园三结义</p>
				</div>
				<div class="tipdel">
					<button class="but">删除</button>
					<button class="butother">取消</button>
				</div>
				<div id="icon_sc" style="top: 35px">
					<a class="glyphicon glyphicon-trash" style="font-size: 20px;color: black;text-decoration: none;" id="de_caog"></a>
				</div>
				<div class="duanwen">
					<p>对于一个在北平住惯的人，像我，冬天要是不刮风，便觉得是奇迹；济南的冬天是没有风声的。对于一个刚由伦敦回来的人......</p>
				</div>
				<div class="downright">
					<p style="float: right;">《三国演义》</p>
				</div>
			</div>
			<div class="middle"></div>
			<div class="partone">
				<div class="title">三国演义</div>
				<div style="margin-left: 10px;margin-top: 5px;font-size: 13px;float: left;border: 1px solid #4bb8ed;color: #4bb8ed;">连载</div>
				<div class="duanwen">
					<p>第一章：桃园三结义&nbsp;话说天下大势，分久必合，合久必分。周末七国纷争，并入于秦。及秦灭之后，楚、汉......</p>
				</div>
				<div class="downright">
					<p style="float: right;">《三国演义》</p>
				</div>
			</div>
			<div class="partone">
				<div class="title">
					<p>济南的冬天</p>
				</div>
				<div class="duanwen">
					<p>对于一个在北平住惯的人，像我，冬天要是不刮风，便觉得是奇迹；济南的冬天是没有风声的。对于一个刚由伦敦回来的人......</p>
				</div>
				<div class="downright">
					<p style="float: right;">《三国演义》</p>
				</div>
			</div>
			<div class="middle"></div>
   		</div>
   		<div class="qiehuan">
			<div class="turnleft"><p class="glyphicon glyphicon-menu-left"></p></div>
			<div><p class="glyphicon glyphicon-menu-right"></p></div>
		</div>
	</div>
	<script src="../js/deleteCookieOtherPage.js"></script>
	<script src="../js/myIndexOtherPage.js"></script>
</body>
</html>