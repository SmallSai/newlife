// 阅读页面加载顶部栏用户信息以及浮动栏用户信息，以及评论的加载
function addUserInfo(){
	// 获取隐藏表单的值,写评论，加载评论都会用到
	var hiddenVal=document.getElementById("articleId_hidden").value;
	
	// 发表评论等组件对象
	var commentUserHead=document.getElementById("comment_user_head");
	var sendCommentBut=document.getElementById("send_comment_but");
	var commentTextarea=document.getElementById("comment_textarea");
	
	// 加载用户信息，包括顶部栏，浮动操作栏，评论栏
	var xhrLoadUser=new XMLHttpRequest();
    xhrLoadUser.open('GET','../php/loadUserInfo.php',true)
	xhrLoadUser.send();
	
	xhrLoadUser.onreadystatechange=function(){
		if(xhrLoadUser.readyState==4&&xhrLoadUser.status==200){
			if(xhrLoadUser.responseText=='0'||xhrLoadUser.responseText=='1'){
				//未登录或者身份匹配不正确
				location.reload();
			}
			else{
				//获取用户ID
				var userId=JSON.parse(xhrLoadUser.responseText)['userId'];
				var userName=JSON.parse(xhrLoadUser.responseText)['userName'];
				
				//顶部栏的设置
				var userHeadCont=document.getElementById("user_head_cont");
				var userHeadIma=document.getElementById("user_head");
				userHeadIma.setAttribute("src","../userFile/"+userId+"/headPortrait.jpg");
				
				var loginCont=document.getElementById("login_on_cont");
				loginCont.style.display="none";
				userHeadCont.style.display="block";
				
				//浮动操作栏的设置
				
				
				// 写评论，头像，按钮等
				commentUserHead.setAttribute("src","../userFile/"+userId+"/headPortrait.jpg");
				
				commentTextarea.onkeyup=function(){
					if(commentTextarea.value.length>=1){
						sendCommentBut.style.cursor="pointer";
						sendCommentBut.style.backgroundColor="#ff656d";
						
						// 发送按钮事件
						sendCommentBut.onclick=function(){
							// 写入评论的AJAX对象
							var xhrWriteComment=new XMLHttpRequest();
							xhrWriteComment.open('GET','php/writeComment.php?'+hiddenVal+'&uid='+userId+'&userName='+userName+'&content='+commentTextarea.value,true);
							xhrWriteComment.send();
							
							xhrWriteComment.onreadystatechange=function(){
								if(xhrWriteComment.readyState==4&&xhrWriteComment.status==200){
									if(xhrWriteComment.responseText=='1'){
										// 评论发表成功
										commentTextarea.value='';
										location.reload();
									}
									else{
										confirm("评论发表失败！");
									}
								}
							}
						}
					}
					else{
						sendCommentBut.style.cursor="not-allowed";
						sendCommentBut.style.backgroundColor="#cfcfcf";
						
						// onclick事件无操作
						sendCommentBut.onclick=function(){
							
						}
					}
				}
				
			}
		}
	}
	
	// 加载评论的AJAX对象
	var xhrLoadComment=new XMLHttpRequest();
	xhrLoadComment.open('GET','php/addComment.php?'+hiddenVal,true);
	xhrLoadComment.send();
	
	// 评论区容器
	var commentCont=document.getElementById("show_comment");
	
	xhrLoadComment.onreadystatechange=function(){
		if(xhrLoadComment.readyState==4&&xhrLoadComment.status==200){

			
			
			
			if(xhrLoadComment.responseText=='0'){
				commentCont.innerHTML+="<p id='no_comment'>无人评论</p>";
			}
			else{
				// 将评论内容JSON数据转化为JS对象
				var commentObj=JSON.parse('{"comment":['+xhrLoadComment.responseText+']}')['comment'];
				
				// 精彩评论数量
				var commentObjNum=commentObj.length;
				var titleCommentNum=document.getElementById("title_comment_num");//显示精彩评论数量的对象
				titleCommentNum.innerHTML=commentObjNum;
				
				// 评论对象信息
				var comUserId='';
				var comUserName='';
				var comContent='';
				var comUpNum='';
				
				for(var i=0;i<commentObjNum;i++){
					comUserId=commentObj[i]['userId'];
					comUserName=commentObj[i]['userName'];
					comContent=commentObj[i]['content'];
					comUpNum=commentObj[i]['upNum'];
					
					var outCommentStr='<!-- 具体展示评论 --><div class="specifi_comment"><!-- 评论人信息容器 --><div class="commentator_info">'+
							'<img src="../userFile/'+comUserId+'/headPortrait.jpg" class="commentator_head"><!-- 评论者名字以及点赞数量 -->'+
							'<p class="commentator_name">'+comUserName+'</p><!-- 点赞数量 --><img src="../file/icon/up.svg" class="comment_up_logo">'+
							'<div class="comment_up_num">'+comUpNum+'</div></div><!-- 评论展示容器 --><p class="show_comment_word">'+comContent+'</p></div>';
					
					commentCont.innerHTML+=outCommentStr;
				}
			}
			
			
			

		}
	}
}

window.onload=addUserInfo();