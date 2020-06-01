// 查看连载文章章节
function viewChapter(){
	// 加载完成后可执行查看章节目录操作
	var showChapterObj=document.getElementsByClassName("view_chapter");
	var showChapterObjNum=showChapterObj.length;
	console.log(showChapterObjNum);
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

window.onload=viewChapter();