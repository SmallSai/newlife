function loadExcellentArticle(){
	// 加载优秀文章
	var loadCont=document.getElementById("load_excellent_article");
	
	var xhrLoad=new XMLHttpRequest();
	xhrLoad.open('GET','php/loadExcellentArticle.php');
	xhrLoad.send();
	
	xhrLoad.onreadystatechange=function(){
		if(xhrLoad.readyState==4&&xhrLoad.status==200){
			var articleJsonStr='{"article":['+xhrLoad.responseText+']}';
			var articleObj=JSON.parse(articleJsonStr)['article'];
			var objNum=articleObj.length;
			var outStr;

			for(var i=0;i<objNum;i++){
				outStr='';
				
				if(articleObj[i]['nature']=='0'){
					// 原创
					outStr='<!--第n篇--><div class="re_real_time_article" ><!--标题处的一行--><div class="re_title_row_cont"><!--左侧阅读，点赞等logo--><div class="re_info_logo_cont">'+
					'<img src="file/icon/up.svg" class="re_info_logo"><span class="re_detailed_data">'+articleObj[i]['upNum']+'</span></div><div class="re_title_word">'+articleObj[i]['title']+
					'</div><div class="re_serial_mark_author_cont"><div class="re_original_author">原作者：冰心</div></div></div><!--预览文字--><a href="read/index.php?aid='+articleObj[i]['articleId']+'" target="_blank"><p class="re_article_preview">'+articleObj[i]['articleText'].substr(0,54)+'......</p></a></div>';
					
				}
				else{
					// 转载
					outStr='<!--第n篇--><div class="re_real_time_article" ><!--标题处的一行--><div class="re_title_row_cont"><!--左侧阅读，点赞等logo--><div class="re_info_logo_cont">'+
					'<img src="file/icon/up.svg" class="re_info_logo"><span class="re_detailed_data">'+articleObj[i]['upNum']+'</span></div><div class="re_title_word">'+articleObj[i]['title']+
					'</div><div class="re_serial_mark_author_cont"><div class="re_original_author">原作者：'+articleObj[i]['oriAuthor']+'</div></div></div><!--预览文字--><a href="read/index.php?aid='+articleObj[i]['articleId']+'" target="_blank"><p class="re_article_preview">'+
					articleObj[i]['articleText'].substr(0,54)+'......</p></a></div>';
				}
				
				loadCont.innerHTML+=outStr;
			}
		}
	}
}

window.onload=loadExcellentArticle();