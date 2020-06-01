function admin(){
	// 管理员js脚本
	// 查看文章
	var viewArticleObj=document.getElementsByClassName("text");
	var viewArticleNum=viewArticleObj.length;
	
	var viewChapterObj=document.getElementsByClassName("chapterText");
	//console.log(viewChapterObj.length);
	var viewChapterNum=viewChapterObj.length;
	
	// 文章文字预览容器
	var viewWordCont=document.getElementById("view_word_cont");
	
	// 查看单篇
	for(var i=0;i<viewArticleNum;i++){
		viewArticleObj[i].onmouseover=function(){
			var getAid=this.parentNode.getElementsByClassName("hidden_aid")[0].value;
			var getText=new XMLHttpRequest();
			getText.open('GET','newlife/php/adminGetText.php?aid='+getAid);
			getText.send();
			getText.onreadystatechange=function(){
				if(getText.readyState==4&&getText.status==200){
					viewWordCont.innerHTML=getText.responseText;
					viewWordCont.style.display="block";
				}
			}
		}
		
		viewArticleObj[i].onmouseout=function(){
			viewWordCont.style.display="none";
		}
	}
	
	// 查看连载
	for(var i=0;i<viewChapterNum;i++){
		viewChapterObj[i].onmouseover=function(){
			//console.log(this.parentNode);
			var getCid=this.parentNode.getElementsByClassName("hidden_cid")[0].value;
			var getText=new XMLHttpRequest();
			getText.open('GET','newlife/php/adminGetText.php?cid='+getCid);
			getText.send();
			getText.onreadystatechange=function(){
				if(getText.readyState==4&&getText.status==200){
					viewWordCont.innerHTML=getText.responseText;
					viewWordCont.style.display="block";
				}
			}
		}
		
		viewChapterObj[i].onmouseout=function(){
			viewWordCont.style.display="none";
		}
	}
	
	// 通过单篇审核
	var passSingleButObj=document.getElementsByClassName("pass_single");
	var passSingleButNum=passSingleButObj.length;
	for(var j=0;j<passSingleButNum;j++){
		passSingleButObj[j].onclick=function(){
			var getAid=this.parentNode.parentNode.getElementsByClassName("hidden_aid")[0].value;
			var getUid=this.parentNode.parentNode.getElementsByClassName("hidden_uid")[0].value;
			
			var passArticle=new XMLHttpRequest();
			passArticle.open('GET','newlife/php/passArticle.php?flag=1&aid='+getAid+'&uid='+getUid);
			passArticle.send();
			passArticle.onreadystatechange=function(){
				if(passArticle.readyState==4&&passArticle.status==200){
					console.log(passArticle.responseText);
					if(passArticle.responseText=='1'){
						// 成功通过
						location.reload();
					}
				}
			}
		}
	}
	
	// 通过连载章节审核
	var passSerialButObj=document.getElementsByClassName("pass_serial");
	var passSerialButNum=passSerialButObj.length;
	for(var j=0;j<passSerialButNum;j++){
		passSerialButObj[j].onclick=function(){
			//console.log(this.parentNode.parentNode);
			var getCid=this.parentNode.parentNode.getElementsByClassName("hidden_cid")[0].value;
			var getUid=this.parentNode.parentNode.getElementsByClassName("hidden_uid")[0].value;
			
			var passArticle=new XMLHttpRequest();
			passArticle.open('GET','newlife/php/passArticle.php?flag=1&cid='+getCid+'&uid='+getUid);
			passArticle.send();
			passArticle.onreadystatechange=function(){
				if(passArticle.readyState==4&&passArticle.status==200){
					console.log(passArticle.responseText);
					if(passArticle.responseText=='1'){
						// 成功通过
						location.reload();
					}
				}
			}
		}
	}
	
	
	// 拒绝单篇审核
	var refuseSingleButObj=document.getElementsByClassName("refuse_single");
	var refuseSingleButNum=refuseSingleButObj.length;
	for(var j=0;j<refuseSingleButNum;j++){
		refuseSingleButObj[j].onclick=function(){
			//alert("asdasd");
			var getAid=this.parentNode.parentNode.getElementsByClassName("hidden_aid")[0].value;
			var getUid=this.parentNode.parentNode.getElementsByClassName("hidden_uid")[0].value;
			var refuseReason=this.parentNode.parentNode.getElementsByClassName("user_ban_inp")[0].value;
			console.log("拒绝理由"+refuseReason);
			
			var refuseArticle=new XMLHttpRequest();
			refuseArticle.open('GET','newlife/php/passArticle.php?flag=2&aid='+getAid+'&uid='+getUid+'&reason='+refuseReason);
			refuseArticle.send();
			refuseArticle.onreadystatechange=function(){
				if(refuseArticle.readyState==4&&refuseArticle.status==200){
					console.log(refuseArticle.responseText);
					if(refuseArticle.responseText=='1'){
						// 成功通过
						//location.reload();
					}
				}
			}
		}
	}
	
	// 拒绝连载章节审核
	var refuseSerialButObj=document.getElementsByClassName("refuse_serial");
	var refuseSerialButNum=refuseSerialButObj.length;
	console.log(refuseSerialButNum);
	for(var j=0;j<refuseSerialButNum;j++){
		refuseSerialButObj[j].onclick=function(){
			
			var getCid=this.parentNode.parentNode.getElementsByClassName("hidden_cid")[0].value;
			var getUid=this.parentNode.parentNode.getElementsByClassName("hidden_uid")[0].value;
			var refuseReason=this.parentNode.parentNode.getElementsByClassName("user_ban_inp")[0].value;
			
			var refuseArticle=new XMLHttpRequest();
			refuseArticle.open('GET','newlife/php/passArticle.php?flag=2&cid='+getCid+'&uid='+getUid+'&reason='+refuseReason);
			refuseArticle.send();
			refuseArticle.onreadystatechange=function(){
				if(refuseArticle.readyState==4&&refuseArticle.status==200){
					console.log(refuseArticle.responseText);
					if(refuseArticle.responseText=='1'){
						// 成功拒绝
						location.reload();
					}
				}
			}
		}
	}
	
	
	//用户封禁
	 var banUserBut=document.getElementsByClassName("ban_user");
	 var banUserButNum=banUserBut.length;
	 
	 for(var k=0;k<banUserButNum;k++){
		 banUserBut[k].onclick=function(){
			 //console.log(this.nextElementSibling);
			 var getBanUid=this.nextElementSibling.getElementsByClassName("hidden_uid")[0].value;
			 var banReason=this.nextElementSibling.getElementsByClassName(" user_ban_inp")[0].value;
			 var xhrBanUser=new XMLHttpRequest();
			 xhrBanUser.open('GET','newlife/php/banUser.php?userId='+getBanUid+'&reason='+banReason);
			 xhrBanUser.send();
			 xhrBanUser.onreadystatechange=function(){
				 if(xhrBanUser.readyState==4&&xhrBanUser.status==200){
					 console.log(xhrBanUser.responseText);
					 if(xhrBanUser.responseText=='1'){
						 // 成功封禁
						 location.reload();
					 }
				 }
			 }
		 }
	 }
}

window.onload=admin();