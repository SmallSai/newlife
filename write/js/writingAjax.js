// 写作页面用于与后台数据交互的JS脚本
function funcAjax(){
	var userId,userName;
	
	//检查是否非法访问，如未登录访问写作页面
	var xhrCookie=new XMLHttpRequest();
	xhrCookie.open('GET','../php/loadUserInfo.php',true);
	xhrCookie.send();
	
	xhrCookie.onreadystatechange=function(){
		if(xhrCookie.readyState==4&&xhrCookie.status==200){
			if(xhrCookie.responseText=='0'||xhrCookie.responseText=='1'){
				window.location.assign("../login/index.html");
			}
			else{
				var userObj=JSON.parse(xhrCookie.responseText);
				userId=userObj['userId'];//获得用户ID
				userName=userObj['userName'];//获得用户名字
				
				//加载用户草稿应放在获取了用户信息后再执行
				var xhrAddDraft=new XMLHttpRequest();
				xhrAddDraft.open('GET','php/addDraft.php?userId='+userId,true);
				xhrAddDraft.send()
				
				xhrAddDraft.onreadystatechange=function(){
					if(xhrAddDraft.readyState==4&&xhrAddDraft.status==200){
						var draftJsonStr='{"article":['+xhrAddDraft.responseText+']}';
						var draftObj=JSON.parse(draftJsonStr)['article'];
						
						//获得的文章信息
						var getTitle,getArticleId,getArticleId;
						
						//要输出的位置
						var singleDraft=document.getElementById("single_draft_frame");
						var serialDraft=document.getElementById("serial_draft_frame");
						
						for(var i=0;i<draftObj.length;i++){
							//重置
							getTitle='';
							getArticleId='';
							getArticleId='';
							for(var key in draftObj[i]){
								if(key=="title"){
									getTitle=draftObj[i][key];
								}
								if(key=="articleId"){
									getArticleId=draftObj[i][key];
								}
								if(key=="unSerial"){
									getUnSerial=draftObj[i][key];
								}
							}
							
							//将信息输出到页面
							if(getUnSerial=='0'){ //单篇是'0'
								singleDraft.innerHTML+="<div class='specific_draft'><h1 class='single_draft_title'>"+getTitle+"</h1><input type='hidden' value='"+getArticleId+"'></div>";
							}
							if(getUnSerial=='1'){
								serialDraft.innerHTML+='<div class="specific_draft"><h1 class="draft_title"><img src="image/triangle.svg" class="list_triangle">'+getTitle+'</h1><input type="hidden" value="'+getArticleId+'"></div>';
							}
						}
						
						
						//我的连载三角形展开
						var draftTitleObj=document.getElementsByClassName('draft_title');
						for(var i=0;i<draftTitleObj.length;i++){
							
							draftTitleObj[i].onclick=function(){
								var triangleIma=this.getElementsByClassName('list_triangle')[0];
								
								
								if(triangleIma.style.transform=="rotate(0deg)"){
									triangleIma.style.transform="rotate(-90deg)";
									$(this).nextAll(".serial_chapter_title_cont").slideUp();
								}
								else{
									triangleIma.style.transform="rotate(0deg)";
									$(this).nextAll(".serial_chapter_title_cont").slideDown();
								}
							}
						}
					}
				}//xhrAddDraft.onreadystatechange
				
			}
		}
	}//身份验证结束

	
	//错误提示框
	var errorText=document.getElementsByClassName("error_info")[4];
	
	//获取文章信息对象
	var title,articleText,nature,oriAuthor,unSerial,chapterTitle,serialText,chapterClass,chapterNum,articleType;
	title=document.getElementById("title");
	articleText=document.getElementById("textarea");
	nature=document.getElementsByName("isOriginal");
	oriAuthor=document.getElementById("org_author_input");
	unSerial=document.getElementsByName("isSerial");
	chapterTitle=document.getElementById("chapterTitle");
	serialText=document.getElementById("textarea");
	chapterClass=document.getElementsByName("chapterClass");
	chapterNum=document.getElementById("chapterNum");
	articleType=document.getElementById("article_class_select");
	
	//用于插入数据库的变量
	var dbTitle,dbArticleText,dbNature,dbOriAuthor,dbUnSerial,dbChapterTitle,dbSerialText,dbchapterClass,dbChapterNum,dbArticleType,dbWordNum;
	
	//保存操作
	var saveObj=document.getElementById("save");//保存按钮对象
	var saveFlag=true;
	saveObj.onclick=function(){
		 
		if(articleText.value.length){ //写有内容，可以保存
			dbArticleText=articleText.value;
			dbWordNum=dbArticleText.length;
			var dateObj=new Date();
			
			//文章标题
			if(title.value.length>0){
				dbTitle=title.value;
			}
			else{
				dbTitle=dateObj.getFullYear()+"-"+(dateObj.getMonth()+1)+"-"+dateObj.getDate();
			}
			
			//文章性质，0-原创，1-转载
			if(nature[1].checked){
				dbNature=nature[1].value;
				
				//原作者
				if(oriAuthor){
					dbOriAuthor=oriAuthor.value;
				}
				else{
					dbOriAuthor='';
				}
			}
			else{
				dbNature=nature[0].value;
			}
			
			//文章分类
			if(articleType.value){
				dbArticleType=articleType.value;
			}
			else{
				dbArticleType=0;
			}
			
			//是否连载，0-非连载，1-连载
			if(unSerial[1].checked){ //连载
				dbUnSerial=unSerial[1].value;
				dbSerialText=serialText.value;
				
				//连载弹出章节标题
				if(chapterTitle.value.length){
					dbChapterTitle=chapterTitle.value;
				}
				else{
					dbChapterTitle="chapter"+dateObj.getFullYear()+"-"+(dateObj.getMonth()+1)+"-"+dateObj.getDate();
				}
				
				//章节类型,前言或是正文
				if(chapterClass[0].checked){
					dbChapterClass=chapterClass[0].value;
				}
				else{
					dbChapterClass=chapterClass[1].value;
					
					//正文弹出章节号
					if(chapterNum.value){
						dbChapterNum=chapterNum.value;
					}
					else{
						dbChapterNum=0;
					}
				}
				
			}
			else{ //非连载
				dbUnSerial=unSerial[0].value;
			}
			
			//保存草稿操作
			var xhrSave=new XMLHttpRequest();
			xhrSave.open('POST','php/save.php',true);
			xhrSave.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			
			//非连载文章发送数据
			if(dbUnSerial==0){
				xhrSave.send("title="+dbTitle+"&userId="+userId+"&userName="+userName+"&type="+dbArticleType+"&nature="+dbNature+
				"&oriAuthor="+dbOriAuthor+"&unSerial="+dbUnSerial+"&articleText="+dbArticleText+"&wordNum="+dbWordNum);
			}
			
			//连载文章发送数据
			if(dbUnSerial==1){
				xhrSave.send("title="+dbTitle+"&userId="+userId+"&userName="+userName+"&type="+dbArticleType+"&nature="+dbNature+
				"&oriAuthor="+dbOriAuthor+"&unSerial="+dbUnSerial+"&serialText="+dbSerialText+"&chapterTitle="+dbChapterTitle+"&chapterNum="+
				dbChapterNum+"&chapterClass="+dbChapterClass+"&wordNum="+dbWordNum);
			}
			
			xhrSave.onreadystatechange=function(){
			
				if(xhrSave.readyState==4&&xhrSave.status==200){
					if(xhrSave.responseText==1){
						errorText.innerHTML="<span class='success'>保存成功！</span>";
						saveObj.setAttribute("disabled","disabled");
						saveObj.style.cursor="not-allowed";
						setTimeout(function(){
							location.reload();//刷新当前页面
						},1500);
					}
					else{
						errorText.innerHTML="保存失败！";
						// alert(xhrSave.responseText);
					}
				}
			}
		} //有内容结束
		else{ 
			//无内容，提示不能保存
			errorText.innerHTML="未保存，文章没有内容哦";
		}
	}//onclick事件结束
}

window.onload=funcAjax();