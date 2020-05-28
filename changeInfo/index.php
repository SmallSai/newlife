<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>修改信息</title>
		<link rel="stylesheet" type="text/css" href="../css/header.css"/>
		<script src="../include/header.js"></script>
		<script src="../js/myIndexOtherPage.js"></script>
		
		<link rel="stylesheet" type="text/css" href="css/message.css" />
	</head>
	
	<body>
		<?php
			include("../php/dbConnect.php");
			$queryUser="SELECT * FROM user WHERE userAccount='".$_COOKIE['comic']."';";
			$result=mysqli_query($dbc,$queryUser);
			$row=mysqli_fetch_assoc($result);
			$userId=$row['userId'];
			$userName=$row['userName'];
			$old=$row['old'];
			$sign=$row['sign'];
			$sex=$row['sex'];
			$place=$row['place'];
			
			
			include("../php/dbClose.php");
		?>
		<div class="message_div">
		<form action="#" method="post" enctype="multipart/form-data" class="message_from">
			<fieldset>
				
			<dl style=" height: 64px;">
				<dt>
					<?php
					if($_SERVER['REQUEST_METHOD']=='POST'){
						if(move_uploaded_file($_FILES['img']['tmp_name'],"../userFile/".$userId."/headPortrait.jpg")){
							print "上传成功!";
							print '<div class="head_cont_div"><img src="../userFile/'.$userId.'/headPortrait.jpg" class="head_cont"/></div>';
						}
						else{
							// 移动出错
							print "<p>上传出错，因为:";
							switch($_FILES['img']['error']){
								case 1:
									print '图片太大，请保持在2M内哦。';
									break;
								
								case 2:
									print '图片太大，请保持在2M内哦。';
									break;
									
								case 3:
									print '您操作太快。';
									break;
									
								case 4:
									print '未选择图片文件。';
									break;
								
								default:
									print "未预料的错误";
									break;
							}
							
							print '</p>';
						}
						
					}
					else{
						print '<div class="head_cont_div"><img src="../userFile/'.$userId.'/headPortrait.jpg" class="head_cont"/></div>';
					}
					?>
					
				</dt>
				<dd >
					<br/>
					
					<form action="index.php" method="post" enctype="multipart/form-data">
						<input type="hidden" name="MAX_SIZE_SIZE" id="" value="2048" />
						<input type="file" name="img" id="" value="" />
						<input type="submit" value="确认更改" class="message_a"/>
					</form>
					
				</dd>
			</dl>
			
			<dl>
				<dt class="message_title"> 
				<span >昵称</span>
				</dt>
				<dd>
				<?php
				print '<input type="text" placeholder="请输入你的新昵称" class="message_input" id="user_name" value="'.$userName.'"/>';
				?>		
				</dd>
			</dl>
			<dl>
			  <dt>性别</dt>   
				<dd>
					<?php
					if($sex=='1'){
						print '&nbsp;<input type="radio" name="sex"  value="1" checked="checked"/>男';
					}
					else{
						print '&nbsp;<input type="radio" name="sex"  value="1"/>男';
					}
					
					if($sex=='2'){
						print '&nbsp;<input type="radio" name="sex"  value="2" checked="checked"/>女';
					}
					else{
						print '&nbsp;<input type="radio" name="sex"  value="2"/>女';
					}
					
					if($sex=='0'){
						print '&nbsp;<input type="radio" name="sex"  value="0" checked="checked"/>保密';
					}
					else{
						print '&nbsp;<input type="radio" name="sex"  value="0"/>保密';
					}
					?>

				</dd>
			</dl>
			<dl>
				<dt>年龄</dt>
				<dd><input type="number" placeholder="更改年龄" class="message_input" min="0" max="200" id="user_old"/ value="<?php if($old){ print $old;} ?>"></dd>
			</dl>
			<dl>
				<dt>地址</dt>
				<dd ><input type="text" placeholder="请输入你的新地址"  class="message_input" id="user_place" value="<?php print $place; ?>"/></dd>
			</dl>
			<dl>
				<dt>个性签名</dt>
				<dd><textarea  placeholder="输入你的个性签名..." class="message_input2" maxlength="100" id="user_gx"><?php print $sign; ?></textarea></dd>
			</dl>
			
			<div class="m_buttton">保存</div>
			</fieldset>
		</form>
		</div>
		<script src="../js/deleteCookieOtherPage.js"></script>
		<script src="js/changeInfo.js"></script>
	</body>
</html>
