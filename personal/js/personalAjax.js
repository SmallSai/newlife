// 加载用户信息脚本，检查打开个人页面与自己userId是否匹配
function addUserInfo(){
	var xhrLoadUser=new XMLHttpRequest();
	xhrLoadUser.open('GET','../php/loadUserInfo.php',true);
	xhrLoadUser.send();
	
	xhrLoadUser.onreadystatechange=function(){
		if(xhrLoadUser.readyState==4&&xhrLoadUser.status==200){
			if(xhrLoadUser.responseText=='0'||xhrLoadUser.responseText=='1'){
				
			}
			else{
				//获取用户ID
				var userId=JSON.parse(xhrLoadUser.responseText)['userId'];
				
				//设置头像
				var userHeadCont=document.getElementById("user_head_cont");
				var userHeadIma=document.getElementById("user_head");
				userHeadIma.setAttribute("src","../userFile/"+userId+"/headPortrait.jpg");
				
				var loginCont=document.getElementById("login_on_cont");
				loginCont.style.display="none";
				userHeadCont.style.display="block";
				
				var pid=document.getElementById("hidden_inp_pid").value;//页面主人userId
				if(pid==userId){
					// 打开的是自己页面，可以进入修改信息窗口
					var changInfoObj=document.getElementById("change_info");//修改信息入口
					var personalHead=document.getElementById("change_info_cont");//页面主人头像对象
					personalHead.onmouseover=function(){
						changInfoObj.style.display="block";			
					}
					
					personalHead.onmouseout=function(){
						changInfoObj.style.display="none";
					}
				}
			}
			
			// 关注操作
			var followBut=document.getElementById("follow_cont");//关注按钮
			//console.log(followBut);
			var beFollowUid=document.getElementById("hidden_inp_pid").value;//被关注者uid
			var xhrFollowCheck=new XMLHttpRequest();
			xhrFollowCheck.open('GET','../search/php/follow.php?userId='+userId+'&beFollowUid='+beFollowUid+'&flag=1');
			xhrFollowCheck.send();
			xhrFollowCheck.onreadystatechange=function(){
				if(xhrFollowCheck.readyState==4&&xhrFollowCheck.status==200){
					if(xhrFollowCheck.responseText=='0'){
						// 还未关注
						followBut.innerHTML="关注作者";
						
						followBut.onclick=function(obj){
							followUser(this);
						}
					}
					else{
						// 已经关注
						followBut.innerHTML="√已关注";
						
						followBut.onclick=function(obj){
							followClose(this);
						}
					}
				}
			}//检查是否关注结束
			
			// 关注作者函数
			function followUser(ths){
				var xhrFollowUser=new XMLHttpRequest();
				
				xhrFollowUser.open('GET','../search/php/follow.php?flag=2&userId=' + userId + '&beFollowUid=' + beFollowUid);
				xhrFollowUser.send();
				
				xhrFollowUser.onreadystatechange=function(){
					if(xhrFollowUser.readyState==4&&xhrFollowUser.status==200){
						if(xhrFollowUser.responseText=='1'){
							//console.log(xhrFollowUser.responseText);
							ths.innerHTML="√已关注";
							
							// 点击取关
							ths.onclick=function(obj){
								followClose(this);
							}
						}
					}
				}
			}
			
			// 取关作者函数
			function followClose(ths){
				var xhrFollowClose=new XMLHttpRequest();
				
				xhrFollowClose.open('GET','../search/php/follow.php?flag=3&userId=' + userId + '&beFollowUid=' + beFollowUid);
				xhrFollowClose.send();
				
				xhrFollowClose.onreadystatechange=function(){
					if(xhrFollowClose.readyState==4&&xhrFollowClose.status==200){
						if(xhrFollowClose.responseText=='1'){
							//console.log(xhrFollowClose.responseText);
							ths.innerHTML="关注";
							
							// 点击关注
							ths.onclick=function(obj){
								followUser(this);
							}
						}
					}
				}
			}
			
			// 各标题对象
			var titleArticle=document.getElementById("title_article");
			var titleFavorite=document.getElementById("title_favorite");
			var titleFollow=document.getElementById("title_follow");
			var titleDraft=document.getElementById("title_draft");
			
			// 放置容器
			var articleCont=document.getElementsByClassName("trans1")[0];
			var favoriteCont=document.getElementsByClassName("trans2")[0];
			var followCont=document.getElementsByClassName("trans3")[0];
			var draftCont=document.getElementsByClassName("trans4")[0];
			
			// 正在显示的版块,当前版块的最大页数以及正在显示的页数
			var nowShow=1;//1-文章，2-收藏，3-关注，4-草稿
			var nowPage=1;
			var nowMaxPage='';
			loadArticle(1);//初始加载我的文章
			
			function addInfo(flag){
				// 加载页面主人各信息
				var xhrAddArticle=new XMLHttpRequest();
				xhrAddArticle.open('GET','php/getPersonalArticle.php?pid='+pid+'&flag='+flag);
				xhrAddArticle.send();
				xhrAddArticle.onreadystatechange=function(){	
					if(xhrAddArticle.readyState==4&&xhrAddArticle.status==200){
						//console.log(xhrAddArticle.responseText);
						var jsonStr='{"info":['+xhrAddArticle.responseText+']}';
						var infoObj=JSON.parse(jsonStr)['info'];
						//console.log("返回对象长度:"+infoObj.length);
						return infoObj;
					}
				}
			}
			
			// 查看连载文章章节
			function viewChapter(){
				// 加载完成后可执行查看章节目录操作
				var showChapterObj=document.getElementsByClassName("view_chapter");
				var showChapterObjNum=showChapterObj.length;
				//console.log(showChapterObjNum);
				var hiddenAid='';
				var outStrChapter='';
				
				// 各装载容器
				var showChapterCont=document.getElementById("show_chapter_cont");//全屏大容器
				var chapterCont=document.getElementById("chapter_cont");//装载栏
				var catalogTitle=document.getElementById("title");//标题
				
				var xhrAddChapter=new XMLHttpRequest();
				
				for(var j=0;j<showChapterObjNum;j++){
					
					showChapterObj[j].onclick=function(){
								
						// 隐藏框中的aid值
						hiddenAid=this.getElementsByClassName("show_chapter_hidden_inp")[0].value;
						// AJAX加载章节标题
						xhrAddChapter.open('GET','../library/php/addChapter.php?aid='+hiddenAid,true);
						xhrAddChapter.send();
						
						// 写入文章标题
						catalogTitle.innerHTML=this.getElementsByClassName("show_title_hidden_inp")[0].value;
						
						xhrAddChapter.onreadystatechange=function(){
							if(xhrAddChapter.readyState==4&&xhrAddChapter.status==200){
								//console.log(xhrAddChapter.responseText);
								if(xhrAddChapter.responseText!='0'){
									var chapterObj=JSON.parse('{"chapter":['+xhrAddChapter.responseText+']}')['chapter'];
									var chapterObjNum=chapterObj.length;
									
									chapterCont.innerHTML='';
									for(var k=0;k<chapterObjNum;k++){
										outStrChapter='';
										outStrChapter+='<a href="../read/index.php?aid='+hiddenAid+'&cid='+chapterObj[k]['chapterId']+'" target="_blank" class="chapter_href"><h2 class="specifc_chapter">'+
										chapterObj[k]['chapterTitle']+'</h2></a>';
										chapterCont.innerHTML+=outStrChapter;
									}
									
									showChapterCont.style.display="block";
								}
								
							}
						}
					}
				}//加载目录窗口结束
				
				// 点击叉号关闭目录窗口
				var closeLogo=document.getElementById("close_window");
				closeLogo.onclick=function(){
					showChapterCont.style.display="none";
				}
			}
			
			// 加载文章封装函数
			function loadArticle(nowPageFun){
				
				var xhrAddArticle=new XMLHttpRequest();
				xhrAddArticle.open('GET','php/getPersonalArticle.php?pid='+pid+'&flag=1');
				xhrAddArticle.send();
				xhrAddArticle.onreadystatechange=function(){	
					if(xhrAddArticle.readyState==4&&xhrAddArticle.status==200){
						//console.log(xhrAddArticle.responseText);
						var jsonStr='{"info":['+xhrAddArticle.responseText+']}';
						var infoObj=JSON.parse(jsonStr)['info'];
						//console.log("返回对象长度:"+infoObj.length);
						
						var articleObj=infoObj;
						
						var articleObjNum=articleObj.length;
						articleCont.innerHTML='';
						
						// 计算页数
						nowPage=nowPageFun;
						nowShow=1;//现在展示的版面
						
						if(articleObjNum%6==0){
							nowMaxPage=articleObjNum/6;
						}
						else{
							nowMaxPage=parseInt(articleObjNum/6)+1;
						}
						var startNum=(nowPage-1)*6;
						
						var endNum=startNum+6;
						var outStr='';
						for(;startNum<endNum;startNum++){
							outStr='';
							if(articleObj[startNum]['unSerial']=='0'){
								// 单篇文章
								var articlePreview=articleObj[startNum]['articleText'].substr(0,90);
								outStr='<!-- 第N篇 --><div class="partone" id="hoverdel"><div class="title"><p>'+articleObj[startNum]['title']+'</p></div>'+
							'<div class="tipdel"><button class="but">删除</button><button class="butother">取消</button></div><div id="icon_sc" style="top: 35px">'+
							'<a class="glyphicon glyphicon-trash" style="font-size: 20px;color: black;text-decoration: none;" id="delete"></a></div>'+
							'<div class="duanwen" id="del"><p><a href="../read/index.php?aid='+articleObj[startNum]['articleId']+'" target="_blank">'+articlePreview+'</a>......</p></div><div class="downright"><ul><li></li>'+
							'<li class="iconfont icon-view">&nbsp;&nbsp;'+articleObj[startNum]['readNum']+'</li><li class="iconfont icon-good">&nbsp;&nbsp;'+articleObj[startNum]['upNum']+'</li></ul></div></div>';	
							}
							else{
								// 连载文章
								outStr='<!-- 第N篇 --><div class="partone"><div class="title">'+articleObj[startNum]['title']+'</div>'+
								'<div style="margin-left: 10px;margin-top: 5px;font-size: 13px;float: left;border: 1px solid #4bb8ed;color: #4bb8ed;">连载</div>'+
								'<div class="duanwen"><p class="view_chapter">查看章节<input class="show_chapter_hidden_inp" type="hidden" value="'+articleObj[startNum]['articleId']+'">'+
									'<input class="show_title_hidden_inp" type="hidden" value="'+articleObj[startNum]['title']+'"></p></div><div class="downright"><ul><li></li><li class="iconfont icon-view">&nbsp;&nbsp;'+articleObj[startNum]['readNum']+'</li>'+
								'<li class="iconfont icon-good">&nbsp;&nbsp;'+articleObj[startNum]['upNum']+'</li></ul></div></div>';
							}
							articleCont.innerHTML+=outStr;
						}
					}
					viewChapter();
				}
				
			} //加载文章封装函数
			
			// 加载收藏封装函数
			function loadFavorite(nowPageFun){
				var xhrAddArticle=new XMLHttpRequest();
				xhrAddArticle.open('GET','php/getPersonalArticle.php?pid='+pid+'&flag=2');
				xhrAddArticle.send();
				xhrAddArticle.onreadystatechange=function(){	
					if(xhrAddArticle.readyState==4&&xhrAddArticle.status==200){
						//console.log(xhrAddArticle.responseText);
						var jsonStr='{"info":['+xhrAddArticle.responseText+']}';
						var infoObj=JSON.parse(jsonStr)['info'];
						
						var favoriteObj=infoObj;
						// console.log(xhrAddArticle.responseText);
						var favoriteObjNum=favoriteObj.length;
						favoriteCont.innerHTML='';
						
						// 计算页数
						nowPage=nowPageFun;
						nowShow=2;//现在展示的版面
						
						if(favoriteObjNum%6==0){
							nowMaxPage=favoriteObjNum/6;
						}
						else{
							nowMaxPage=parseInt(favoriteObjNum/6)+1;
						}
						var startNum=(nowPage-1)*6;
						var endNum=startNum+6;
						if(endNum>favoriteObjNum){
							endNum=favoriteObjNum;
						}
						
						var outStr='';
						for(;startNum<endNum;startNum++){
							console.log("s:"+startNum);
							console.log("e:"+endNum);
							outStr='';
							if(favoriteObj[startNum]['unSerial']=='0'){
								// 单篇文章
								outStr='<!-- 第N篇收藏 --><div class="partone"><div class="title"><p>'+favoriteObj[startNum]['title']+'</p></div><div id="icon_sc">'+
								'<a class="iconfont icon-mark open" style="font-size: 30px;color: #f6c160;text-decoration: none;" title="取消收藏"></a>'+
								'<a class="iconfont icon-mark-o close" style="font-size: 30px;color: #f6c160;text-decoration: none;opacity: 1" title="收藏该文章">'+
								'</a></div><div class="duanwen"><p>'+favoriteObj[startNum]['articleText'].substr(0,90)+'......</p></div><div class="downright"><ul><li class="userName" style="width:180px;text-align:right">'+
								favoriteObj[startNum]['userName']+'</li><li class="iconfont icon-view">&nbsp;&nbsp;'+favoriteObj[startNum]['readNum']+'</li><li class="iconfont icon-good">&nbsp;&nbsp;20</li>'+
								'</ul></div></div>';	
							}
							else{
								// 连载文章
								outStr='<!-- 第N篇 --><div class="partone"><div class="title">'+favoriteObj[startNum]['title']+'</div>'+
								'<div style="margin-left: 10px;margin-top: 5px;font-size: 13px;float: left;border: 1px solid #4bb8ed;color: #4bb8ed;">连载</div>'+
								'<div class="duanwen"><p class="view_chapter">查看章节<input class="show_chapter_hidden_inp" type="hidden" value="'+favoriteObj[startNum]['articleId']+'">'+
									'<input class="show_title_hidden_inp" type="hidden" value="'+favoriteObj[startNum]['title']+'"></p></div><div class="downright"><ul><li class="userName" style="width:180px;text-align:right">'+favoriteObj[startNum]['userName']+'</li><li class="iconfont icon-view">&nbsp;&nbsp;'+favoriteObj[startNum]['readNum']+
									'</li><li class="iconfont icon-good">&nbsp;&nbsp;'+favoriteObj[startNum]['upNum']+'</li></ul></div></div>';
							}
							
							favoriteCont.innerHTML+=outStr;
						}
					}
				}	
			}// 加载收藏封装函数
			
			
			// 加载关注封装函数
			function loadFollow(nowPageFun){
				var xhrAddArticle=new XMLHttpRequest();
				xhrAddArticle.open('GET','php/getPersonalArticle.php?pid='+pid+'&flag=3');
				xhrAddArticle.send();
				xhrAddArticle.onreadystatechange=function(){	
					if(xhrAddArticle.readyState==4&&xhrAddArticle.status==200){
						//console.log(xhrAddArticle.responseText);
						var jsonStr='{"info":['+xhrAddArticle.responseText+']}';
						var infoObj=JSON.parse(jsonStr)['info'];
						
						var followObj=infoObj;
						var followObjNum=followObj.length;
						followCont.innerHTML='';
						
						// 计算页数
						nowPage=nowPageFun;//现在展示的页
						nowShow=3;//现在展示的版面
						
						if(followObjNum%6==0){
							nowMaxPage=followObjNum/6;
						}
						else{
							nowMaxPage=parseInt(followObjNum/6)+1;
						}
						var startNum=(nowPage-1)*6;
						var endNum=startNum+6;
						if(endNum>followObjNum){
							endNum=followObjNum;
						}
						
						var outStr='';
						for(;startNum<endNum;startNum++){
							outStr='';
							outStr='<div class="partone"><div class="attentionpeop"><img src="../userFile/'+followObj[startNum]['userId']+'/headPortrait.jpg"></div>'+
							'<div class="ap_content"><div class="ap_name"><p style="margin-top: 20px">'+followObj[startNum]['userName']+'</p></div><div class="ap_button">'+
							'<button class="ap_but1">取消关注</button><button class="ap_but2">已关注</button></div><div class="ap_intro"><p style="margin-top: 8px">'+
							'共发表了'+followObj[startNum]['articleNum']+'篇文章</p></div></div></div>';
							
							followCont.innerHTML+=outStr;
						}
					}
				}
			}// 加载收藏封装函数
			
			// 加载草稿封装函数
			function loadDraft(nowPageFun){
				var xhrAddArticle=new XMLHttpRequest();
				xhrAddArticle.open('GET','php/getPersonalArticle.php?pid='+pid+'&flag=4');
				xhrAddArticle.send();
				xhrAddArticle.onreadystatechange=function(){	
					if(xhrAddArticle.readyState==4&&xhrAddArticle.status==200){
						//console.log(xhrAddArticle.responseText);
						var jsonStr='{"info":['+xhrAddArticle.responseText+']}';
						var infoObj=JSON.parse(jsonStr)['info'];

						var draftObj=infoObj;
						var draftObjNum=draftObj.length;
						draftCont.innerHTML='';
						
						// 计算页数
						nowPage=nowPageFun;//现在展示的页
						nowShow=4;//现在展示的版面
						
						if(draftObjNum%6==0){
							nowMaxPage=draftObjNum/6;
						}
						else{
							nowMaxPage=parseInt(draftObjNum/6)+1;
						}
						var startNum=(nowPage-1)*6;
						var endNum=startNum+6;
						if(endNum>draftObjNum){
							endNum=draftObjNum;
						}
						var outStr='';
						for(;startNum<endNum;startNum++){
							console.log(startNum);
							outStr='';
							if(draftObj[startNum]['unSerial']=='0'){
								// 单篇
								outStr='<div class="partone" id="hover_caog"><div class="title"><p>'+draftObj[startNum]['title']+'</p></div><div class="tipdel">'+
								'<button class="but">删除</button><button class="butother">取消</button></div><div id="icon_sc" style="top: 35px">'+
								'<a class="glyphicon glyphicon-trash" style="font-size: 20px;color: black;text-decoration: none;" id="de_caog"></a>'+
								'</div><div class="duanwen"><p>'+draftObj[startNum]['articleText'].substr(0,60)+'......</p></div><div class="downright"></div></div>';
							}
							else{
								// 连载
								outStr='<div class="partone"><div class="title">'+row['chapterTitle']+'</div><div style="margin-left: 10px;margin-top: 5px;font-size: 13px;float: '+
								'left;border: 1px solid #4bb8ed;color: #4bb8ed;">连载</div><div class="view_chapter"><p>查看目录<input class="show_chapter_hidden_inp" type="hidden" value="'+draftObj[startNum]['articleId']+'">'+
									'<input class="show_title_hidden_inp" type="hidden" value="'+draftObj[startNum]['title']+'"></p></div><div class="downright"><p style="float: right;">'+
								draftObj[startNum]['title']+'</p></div></div>';
							}
							draftCont.innerHTML+=outStr;
						}
					}
				}		
			}// 加载草稿封装函数
			
			// 加载文章
			titleArticle.onclick=function(){
				loadArticle(1);
			}
			
			titleFavorite.onclick=function(){
				loadFavorite(1);
			}
			
			titleFollow.onclick=function(){
				loadFollow(1);
			}
			
			titleDraft.onclick=function(){
				loadDraft(1);
			}
			
			// 翻页按钮
			var previousPage=document.getElementsByClassName("previous_page")[0];
			var nextPage=document.getElementsByClassName("next_page")[0];
			
			previousPage.onclick=function(){
				// 上一页
				if(nowPage>1){
					nowPage--;
					if(nowShow==1){
						loadArticle(nowPage);
					}
					
					if(nowShow==2){
						loadFavorite(nowPage);
					}
					
					if(nowShow==3){
						loadFollow(nowPage);
					}
					
					if(nowShow==4){
						loadDraft(nowPage);
					}
				}
			}
			
			nextPage.onclick=function(){
				
				// 下一页
				if(nowPage<nowMaxPage){
					nowPage++;
					if(nowShow==1){
						console.log(nowPage);
						console.log(nowMaxPage);
						console.log(nowShow);
						loadArticle(nowPage);
					}
					
					if(nowShow==2){
						loadFavorite(nowPage);
					}
					
					if(nowShow==3){
						loadFollow(nowPage);
					}
					
					if(nowShow==4){
						loadDraft(nowPage);
					}
				}
			}
		}//加载cookie信息
	}
}

window.onload=addUserInfo();