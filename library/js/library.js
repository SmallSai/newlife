// 控制分类框的样式
function classFilt(){
	//移除搜索的placeholder
	var search_input=document.getElementById("search_input");
	search_input.removeAttribute("placeholder");
	
	//radio对象
	var labs=document.getElementsByClassName("inp_lab");
	var time_lab=labs[0];
	var up_lab=labs[1];
	var single_lab=labs[2];
	var serial_lab=labs[3];
	
	//div对象
	var divs=document.getElementsByClassName("screen_sp");
	var time_di=divs[0];
	var up_di=divs[1];
	var single_di=divs[2];
	var serial_di=divs[3];
	
	// 时间顺序的三角形对象
	var up_tri=document.getElementById("up");
	var down_tri=document.getElementById("down");	
	
	// 筛选器3分类选择对象
	var selectClass=document.getElementById("type_select");
	
	// 各筛选器当前选择状态
	var afiltState=1; //1-当前选中时间顺序，2-当前选中点赞最多
	var bfiltState=0; //0-什么都没选中，1-选中只看单篇，2-选中只看连载
	
	// 筛选发送AJAX对象
	var xhrFilt=new XMLHttpRequest();
	
	// 存储发送类别的代号
	var aFiltSend=0;//0-由新到旧，1-由旧到新，2-按点赞量多到少
	var bFiltSend=0;//0-全部，1-单篇，2-连载
	var cFiltSend=0;//按分类值，0-全部，1-青春等
	xhrFiltOpen(aFiltSend,bFiltSend,cFiltSend);//加载页面时默认调用
	
	// 查找结果放置容器
	var resultArticleCont=document.getElementById("result_article_cont");

	function xhrFiltOpen(aFilt,bFilt,cFilt){
		xhrFilt.open('GET','php/getArticle.php?aFilt='+aFilt+'&bFilt='+bFilt+'&cFilt='+cFilt);
		xhrFilt.send();
		
		var articleId,userName,userId,title,text,unSerial,date,textPreview;
		
		xhrFilt.onreadystatechange=function(){
			if(xhrFilt.readyState==4&&xhrFilt.status==200){
				 //console.log(xhrFilt.responseText);
				if(xhrFilt.responseText=='0'){
					// 没有结果
					resultArticleCont.innerHTML="<p id='not_article'>未检索到相关文章←_←</p>";
				}
				else{
					// console.log(xhrFilt.responseText);
					// 有结果
					articleObj=JSON.parse('{"article":['+xhrFilt.responseText+']}')['article'];
					articleObjNum=articleObj.length;
					resultArticleCont.innerHTML='';
					console.log("文章数："+articleObjNum);
					
					for(var i=0;i<articleObjNum;i++){
						articleId=articleObj[i]['articleId'];
						userName=articleObj[i]['userName'];
						userId=articleObj[i]['userId'];
						title=articleObj[i]['title'];
						nature=articleObj[i]['nature'];
						unSerial=articleObj[i]['unSerial'];
						text=articleObj[i]['articleText'];
						readNum=articleObj[i]['readNum'];
						upNum=articleObj[i]['upNum'];
						
						
						//时间处理
						
						date=Number(articleObj[i]['date'])*1000;//时间戳
						var dateObj=new Date(date);//日期对象
						var dateStr=dateObj.getFullYear()+"-"+dateObj.getMonth()+"-"+dateObj.getDate();
						
						var outStr='';
						outStr='<!--第n篇--><div class="real_time_article" ><!--标题处的一行--><div class="title_row_cont" id="first_article">'+
							'<div class="title_word">'+title+'</div><div class="serial_mark_author_cont">';
						
						if(unSerial=='1'){
							outStr+='<div class="serial_mark">连载</div>';
							textPreview='<p class="show_chapter">查看章节目录<input class="show_chapter_hidden_inp" type="hidden" value="'+articleId+'">'+
							'<input class="show_title_hidden_inp" type="hidden" value="'+title+'"></p>';
						}
						else{
							textPreview='<a href="../read/index.php?aid='+articleId+'" target="_blank" class="single_preview">'+text.substr(0,50)+'</a>......';
						}
						
						if(nature=='1'){
							oriAuthor=articleObj[i]['oriAuthor'];
							outStr+='<div class="original_author">原作者：'+oriAuthor+'</div>';
						}
						
						outStr+='</div></div><!--预览文字--><p class="article_preview">'+textPreview+'</p><!--文章底部阅读量等信息-->'+
							'<div id="article_bottom_info_cont"><!--左侧阅读，点赞等logo--><div class="info_logo_cont"><img src="../file/icon/browse.svg" class="info_logo read_logo">'+
							'<span class="detailed_data read_num_data">'+readNum+'</span><img src="../file/icon/up.svg" class="info_logo up_logo">'+
							'<span class="detailed_data up_num_data">'+upNum+'</span><p class="release_time">'+dateStr+'</p></div><!--右侧投稿者-->'+
							'<div class="head_name_cont"><img src="../userFile/'+userId+'/headPortrait.jpg" alt="head_portrait" class="head_portrait">'+
							'<div class="user_name">'+userName+'</div></div></div></div><!-- 第N篇结束 -->';
						
						resultArticleCont.innerHTML+=outStr;
					}//加载筛选结果结束
					
					// 加载完成后可执行查看章节目录操作
					var showChapterObj=document.getElementsByClassName("show_chapter");
					var showChapterObjNum=showChapterObj.length;
					
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
							xhrAddChapter.open('GET','php/addChapter.php?aid='+hiddenAid,true);
							xhrAddChapter.send();
							
							// 写入文章标题
							catalogTitle.innerHTML=this.getElementsByClassName("show_title_hidden_inp")[0].value;
							
							xhrAddChapter.onreadystatechange=function(){
								if(xhrAddChapter.readyState==4&&xhrAddChapter.status==200){
									//console.log(xhrAddChapter.responseText);
									if(xhrAddChapter.responseText!='0'){
										var chapterObj=JSON.parse('{"chapter":['+xhrAddChapter.responseText+']}')['chapter'];
										var chapterObjNum=chapterObj.length;
										
										for(var k=0;k<chapterObjNum;k++){
											outStrChapter='';
											outStrChapter+='<a href="../read/index.php?aid='+hiddenAid+'&cid='+chapterObj[k]['chapterId']+'" target="_blank"><h2 class="specifc_chapter">'+
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
			}
		}
	}
	
	var flag=true; //时间顺序标记，true表示三角向下，由新到旧
	
	// 时间顺序点击
	time_lab.onclick=function(){
	
		if(afiltState==1){
			// 本身选中自己
			if(flag){
				down.style.display="none";
				up.style.display="inline-block";//从旧到新
				aFiltSend=1;
			}
			else{
				down.style.display="inline-block";//从新到旧
				up.style.display="none";
				aFiltSend=0;
			}
			flag=!flag;
			afiltState=1;
		}
		else{
			time_di.style.color="#22C4F2";
			up_di.style.color="#000000";
			
			// flag判断三角状态
			if(flag){
				//由新到旧
				aFiltSend=0;
			}
			else{
				//由旧到新
				aFiltSend=1;
			}
			
			afiltState=1;
		}
		
		xhrFiltOpen(aFiltSend,bFiltSend,cFiltSend);
	}
	
	// 点赞点击
	up_lab.onclick=function(){
		//console.log("up:"+afiltState);
		if(afiltState==2){
			// 本身选中自己
			up_di.style.color="#000000";
			afiltState=0;
			
			// flag判断三角状态
			if(flag){
				//由新到旧
				aFiltSend=0;
			}
			else{
				//由旧到新
				aFiltSend=1;
			}
		}
		else{
			up_di.style.color="#22C4F2";
			time_di.style.color="#000000";
			afiltState=2;
			aFiltSend=2;
		}
		
		xhrFiltOpen(aFiltSend,bFiltSend,cFiltSend);
	}
	
	// 只看单篇点击
	single_lab.onclick=function(){
		if(bfiltState==1){
			// 本身选中自己
			single_di.style.color="#000000";
			bfiltState=0;
			
			// 取消选择，查看全部
			bFiltSend=0;
		}
		else{
			single_di.style.color="#22C4F2";
		    serial_di.style.color="#000000";
			bfiltState=1;
			bFiltSend=1;
		}
		
		xhrFiltOpen(aFiltSend,bFiltSend,cFiltSend);
	}
	
	// 只看连载点击
	serial_lab.onclick=function(){
		if(bfiltState==2){
			// 本身选中自己
			serial_di.style.color="#000000";
			bfiltState=0;
			
			// 取消选择，查看全部
			bFiltSend=0;
		}
		else{
			single_di.style.color="#000000";
			serial_di.style.color="#22C4F2";
			bfiltState=2;
			bFiltSend=2;
		}
		
		xhrFiltOpen(aFiltSend,bFiltSend,cFiltSend);
	}
	
	// 分类选择值改变事件
	selectClass.onchange=function(){
		cFiltSend=this.value;
		
		xhrFiltOpen(aFiltSend,bFiltSend,cFiltSend);
	}
	
}

window.onload=classFilt();
