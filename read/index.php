<?php
include("../php/dbConnect.php");
$articleId=mysqli_real_escape_string($dbc,$_GET['aid']);
$chapterId=-1;

// 获取用户uid
$userAccount=-1;
if(isset($_COOKIE['comic'])){
	$userAccount=mysqli_real_escape_string($dbc,$_COOKIE['comic']);
}

$quertUid="SELECT userId FROM user WHERE userAccount='".$userAccount."';";
$resuluUserId=mysqli_query($dbc,$quertUid);
$userId=mysqli_fetch_assoc($resuluUserId)['userId'];

// 发布人信息
$releasUserId='';
$releasUserName='';

// 文章各信息
$unSerial='';
$title='';
$chapterTitle='';
$oriAuthor='';
$text='';
$date='';

// 文章处隐藏表单值
$hiddenVal='';

// 查询发布人信息
$queryRelesUser="SELECT * FROM article WHERE articleId=".$articleId.";";
$resultRelesUser=mysqli_query($dbc,$queryRelesUser);
if(mysqli_num_rows($resultRelesUser)){
	$row=mysqli_fetch_assoc($resultRelesUser);
	$releasUserId=$row['userId'];
	$releasUserName=$row['userName'];
}
else{
	//未查询到有结果，跳转首页，终止脚本
	header("Location:../");
	die();

}

if(key_exists("cid",$_GET)&&$_GET['cid']!=null){
	//连载文章
	$chapterId=mysqli_real_escape_string($dbc,$_GET['cid']);
	$title='';
	
	$query="SELECT * FROM article,serial WHERE article.articleId=serial.articleId AND article.articleId=".$articleId." AND chapterId=".$chapterId.";";
	$result=mysqli_query($dbc,$query);
	if(mysqli_num_rows($result)){
		$row=mysqli_fetch_assoc($result);
		$unSerial=$row['unSerial'];
		$title=$row['title'];
		if($row['nature']=='1'){
			// 转载
			$oriAuthor=$row['oriAuthor'];
		}
		$chapterTitle=$row['chapterTitle'];
		
		// 对换行转义
		$pattern = array(
		
		    '/ /',//半角下空格
		
		    '/　/',//全角下空格
		
		    '/\r\n/',//window 下换行符
		
		    '/\n/',//Linux && Unix 下换行符
		
		    );
		
		    $replace = array('&nbsp;','&nbsp;','<br />','<br />');
		
		    $text=preg_replace($pattern, $replace, $row['serialText']);
		
		$date=$row['date'];
		$hiddenVal="chapterId=".$chapterId;
		
		// 增加本文阅读量
		$insertRead="INSERT INTO `read` VALUES(".$userId.",".$chapterId.");";
		$insertResult=mysqli_query($dbc,$insertRead);
		
		if(mysqli_affected_rows($dbc)==1){
			$updateReadNum="UPDATE serial SET readNum=readNum+1 WHERE chapterId=".$chapterId.";";
			mysqli_query($dbc,$updateReadNum);
			
			// 增加用户总阅读
			$updateUserReadNum="UPDATE user SET allReadNum=allReadNum+1 WHERE userId=".$releasUserId;
			$resultReadNum=mysqli_query($dbc,$updateUserReadNum);
			print "语句：".$updateUserReadNum."----";
			print mysqli_error($dbc);
		}
	}
	else{
		//未查询到有结果，跳转首页，终止脚本
		header("Location:../");
		die();
	}
}
else{
	
	if(key_exists("aid",$_GET)&&$_GET['aid']!=null){
		$articleId=mysqli_real_escape_string($dbc,$_GET['aid']);
		
		// 单篇只查询article表即可
		$query="SELECT * FROM article WHERE articleId=".$articleId;
		$result=mysqli_query($dbc,$query);
		if(mysqli_num_rows($result)){
			$row=mysqli_fetch_assoc($result);
			$unSerial=$row['unSerial'];
			$title=$row['title'];
			if($row['nature']=='1'){
				// 转载
				$oriAuthor=$row['oriAuthor'];
			}
			
			// 对换行转义
			$pattern = array(
			
			    '/ /',//半角下空格
			
			    '/　/',//全角下空格
			
			    '/\r\n/',//window 下换行符
			
			    '/\n/',//Linux && Unix 下换行符
			
			    );
			
			    $replace = array('&nbsp;','&nbsp;','<br />','<br />');
			
			    $text=preg_replace($pattern, $replace, $row['articleText']);

			
			$date=$row['date'];
			$hiddenVal="articleId=".$articleId;
			// print "php中hiddenVal:".$hiddenVal."-----";
			
			// 增加本文阅读量
			$insertRead="INSERT INTO `read` VALUES(".$userId.",".$articleId.");";
			
			$insertResult=mysqli_query($dbc,$insertRead);
			if(mysqli_affected_rows($dbc)==1){
				$updateReadNum="UPDATE serial SET readNum=readNum+1 WHERE chapterId=".$chapterId.";";
				mysqli_query($dbc,$updateReadNum);
				
				// 增加用户总阅读
				$updateUserReadNum="UPDATE user SET allReadNum=allReadNum+1 WHERE userId=".$releasUserId;
				$resultReadNum=mysqli_query($dbc,$updateUserReadNum);
				print "语句：".$updateUserReadNum."----";
				print mysqli_error($dbc);
			}
		}
		else{
			//未查询到有结果，跳转首页，终止脚本
			header("Location:../");
			die();
		}
	}
}


include("../php/dbClose.php");
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>阅读 -
		<?php
			if($unSerial=='1'){
				print $chapterTitle;
			}
			else{
				print $title;
			}
		?>
		</title>
		<link rel="stylesheet" type="text/css" href="../css/header.css" />
		<link rel="stylesheet" type="text/css" href="../css/general_purpose.css" />
		<link rel="stylesheet" type="text/css" href="css/userOperationCont.css" />
		<link rel="stylesheet" type="text/css" href="css/index.css" />
		<script src="../include/jquery-3.4.1.min.js"></script>
		<script src="../include/jquery-ui.min.js"></script>
	</head>
	<body>
		<script src="../include/header.js"></script>

		<!-- 主视图 -->
		<div id="main_cont">
			<!-- 上方标题作者信息 -->
			<div id="title_info_cont">
				<!-- 文章标题 -->
				<p id="article_title">
					<?php
						if($unSerial=='1'){
							print $title;
						}
					?>
				</p>

				<!-- 章节标题 -->
				<p id="serial_title">
					<?php
						if($unSerial=='1'){
							print $chapterTitle;
						}
						else{
							print $title;
						}
					?>
				<span id="ori_author">
					<?php
						if($oriAuthor){
							print "(原作者:".$oriAuthor.")";
						}
					?>
				</span></p>

				<!-- 发布人容器 -->
				<div id="releas_user_cont">
					<?php
						print "<img src='../userFile/".$releasUserId."/headPortrait.jpg' id='releas_user_head'>";
					?>

					<!-- 右侧发布人信息 -->
					<div id="releas_user_info">
						<!-- 上部分 -->
						<div id="user_info_top">
							<p id="releas_user_name">
								<?php
									print $releasUserName;
								?>
							</p>
							<div id="follow_cont">关注</div>
						</div>

						<!-- 下部分发布时间 -->
						<div id="user_info_bottom">
							发表于
							<?php
								print date('Y m d',$date);
							?>
						</div>
					</div>
				</div>
			</div>

			<!-- 文章展示容器 -->
			<p id="article_cont">
				
				<?php
				print $text;
				print "<input type='hidden' value='".$hiddenVal."' id='articleId_hidden'/>";
				?>
			</p>

			<!-- 翻页栏 -->
			<div id="page_turning_cont">
				<p class="page_select" id="catalog">目录</p>
				<p class="page_select" id="next_chapter">下一章</p>
			</div>

			<!-- 评论容器 -->
			<div id="comment_cont">

				<!-- 写评论容器 -->
				<div id="write_comment">
					<img src="../file/icon/mine_fill.svg" id="comment_user_head">
					<textarea id="comment_textarea" placeholder="写下你的评论..."></textarea>

					<div id="send_comment_cont">
						<p id="send_comment_but">发表</p>
					</div>

				</div>

				<!-- 评论展示容器 -->
				<div id="show_comment">
					<!-- “精彩评论” -->
					<h1 id="show_comment_title">精彩评论<span id="title_comment_num">0</span></h1>
	
				</div>

			</div><!-- 评论放置容器结束 -->

		</div>

	<!-- 用户浮动操作框大框 -->
	<div id="float_cont">
		<!--用户头像以及操作框-->
		<div id="float_user_head_operation_cont">
			<!--头像-->
			<div id="float_user_head_cont">
				<img alt="user_head" src="../file/icon/mine_fill.svg" id="float_user_operation_head">
			</div>
		
			<!--操作logo-->
			<div id="float_user_operation_cont">
				<img src="../file/icon/up.svg" class="float_operation_logo" id="up_logo">
				<img src="../file/icon/collection.svg" class="float_operation_logo" id="favorite_logo">
				<img src="../file/icon/share.svg" class="float_operation_logo" id="share_logo">
				<img src="../file/icon/switch.svg" class="float_operation_logo" id="more_logo">
			</div>
		</div>
		
		<!-- 弹出的更多操作 -->
		<div id="more_cont">
			<!-- 切换模式 -->
			<div id="reading_mode" class="more_logo_cont">
				<img src="../file/icon/night.svg" class="more_operation_logo" id="reading_mode_logo" title="开启夜间模式">
			</div>
			
			<!-- 分享 -->
			<div id="share" class="more_logo_cont">
				<img src="../file/icon/share.svg" class="more_operation_logo" id="share_logo" title="分享">
			</div>
			
			<!-- 举报 -->
			<div id="report" class="more_logo_cont">
				<img src="../file/icon/report.svg" class="more_operation_logo" id="report_logo" title="举报">
			</div>
		</div>
	</div>
		


		<script src="js/index.js"></script>
		<script src="../js/deleteCookieOtherPage.js"></script>
		<script src="js/userOperationDrag.js"></script>
	</body>
</html>
