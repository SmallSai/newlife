//脚本作用：更改分类文章颜色，获取相应分类的文章
window.onload = articleClassFun();


//将分类作为参数，获取文章函数
function getArticle(articleClass) {
	//文章放置容器
	var searchArticleContObj = document.getElementById("every_article_cont");
	var outStr = '';

	searchArticleContObj.innerHTML = '';
	outStr = '';

	var xhrGetArticle = new XMLHttpRequest();
	xhrGetArticle.open('GET', 'php/getArticle.php?articleClass=' + articleClass, true);
	xhrGetArticle.send();

	xhrGetArticle.onreadystatechange = function() {
		//alert(xhrGetArticle.responseText);
		if (xhrGetArticle.readyState == 4 && xhrGetArticle.status == 200) {

			//将返回字符串转换为JS对象
			console.log(xhrGetArticle.responseText);
			var articleJsonStr = '{"article":[' + xhrGetArticle.responseText + ']}';
			var articleObj = JSON.parse(articleJsonStr)['article'];
			//将文章插入
			articleObjLength = articleObj.length;
			for (var i = 0; i < articleObjLength; i++) {
				//单篇情况
				var articleId=articleObj[i]['A.articleId'];;
				var authorId = articleObj[i]['userId'];
				var authorName = articleObj[i]['userName'];
				var articleTitle = articleObj[i]['title'];
				var articleText = articleObj[i]['articleText'];
				var articleTextPreview = articleText.substr(0, 88);
				var articleNature = articleObj[i]['nature'];
				var articleOriAuthor = articleObj[i]['oriAuthor'];
				var articleSerial = articleObj[i]['unSerial'];
				var readNum = articleObj[i]['A.readNum'];
				var upNum = articleObj[i]['A.upNum'];
				var favoriteNum = articleObj[i]['favoriteNum'];

				//连载情况
				var chapterId='';
				var chapterTitle='';
				var serialText = '';
				var chapterTextPreview='';
				var serialTextPreview='';			

				outStr +='<div class="real_time_article" ><div class="title_row_cont" id="first_article">';


				//是否连载判断
				if (articleSerial == '1') {
					//连载
					readNum=articleObj[i]['B.readNum'];
					upNum=articleObj[i]['B.upNum'];
					// for(var key in articleObj[i]){
					// 	console.log(key);
					// 	console.log(articleObj[i][key]);
					// }
					
					chapterId=articleObj[i]['chapterId'];
					chapterTitle=articleObj[i]['chapterTitle'];
					serialText =articleObj[i]['serialText'];
					serialTextPreview=serialText.substr(0,88);
					
					outStr +='<div class="title_word">' +chapterTitle + '</div><div class="serial_mark_author_cont"><div class="serial_mark">连载</div>';
					
					//是否原创
					if(articleNature=='1'){
						outStr+='<div class="original_author">原作者：' +articleOriAuthor +'</div>';
					}
					
					outStr+='</div></div><!--预览文字--><a href="read/index.php?aid='+articleId+'&cid='+chapterId+'" target="_blank"><p class="article_preview">' + serialTextPreview + '......</p></a>';
					
				} else {
					articleId=articleObj[i]['A.articleId'];
					
					for(var key in articleObj[i]){
						console.log("key:"+key+"---value:"+articleObj[i][key]);
					}
					
					//单篇
					outStr += '<div class="title_word">' +articleTitle + '</div><div class="serial_mark_author_cont">';
					
					//是否原创
					if(articleNature=='1'){
						outStr+='<div class="original_author">原作者：' +articleOriAuthor +'</div>';
					}
					
					outStr+='</div></div><!--预览文字--><a href="read/index.php?aid='+articleId+'" target="_blank"><p class="article_preview">' + articleTextPreview + '......</p></a>';
				}


				//其他必有信息
				outStr += '<!--文章底部阅读量等信息--><div id="article_bottom_info_cont"><!--左侧阅读，点赞等logo--><div class="info_logo_cont">' +
					'<img src="file/icon/browse.svg" class="info_logo"><span class="detailed_data">' + readNum +
					'</span><img src="file/icon/up.svg" class="info_logo"><span class="detailed_data">' + upNum + '</span>' +
					'<img src="file/icon/collection.svg" class="info_logo"><span class="detailed_data">' + favoriteNum +
					'</span></div><!--右侧投稿者--><div class="head_name_cont"><img src="userFile/' + authorId +
					'/headPortrait.jpg" alt="head_portrait" class="head_portrait">' +
					'<div class="user_name">' + authorName + '</div></div></div></div>';

				searchArticleContObj.innerHTML = outStr;

			}
			searchArticleContObj.innerHTML +=
				'<!-- 无更多结果文字 --><div class="real_time_article"><p id="no_result">没有更多结果了~</p></div>';
		}
	}
}

function articleClassFun() {
	//文章分类加载文章事件以及样式变化
	var youth = document.getElementById("classYouth");
	var reality = document.getElementById("classReality");
	var fantasy = document.getElementById("classFantasy");
	var novel = document.getElementById("classNovel");
	var prose = document.getElementById("classProse");
	var serial = document.getElementById("classSerial");

	getArticle('1');
	youth.style.color = "#4584d5";
	var showingObj = youth;

	youth.onclick = function() {
		getArticle('1');
		youth.style.color = "#4584d5";
		showingObj.style.color = "#e6757d";
		showingObj = this;
	}

	reality.onclick = function() {
		getArticle('2');
		this.style.color = "#4584d5";
		showingObj.style.color = "#e6757d";
		showingObj = this;
	}

	fantasy.onclick = function() {
		getArticle('3');
		this.style.color = "#4584d5";
		showingObj.style.color = "#e6757d";
		showingObj = this;
	}

	novel.onclick = function() {
		getArticle('4');
		this.style.color = "#4584d5";
		showingObj.style.color = "#e6757d";
		showingObj = this;
	}

	prose.onclick = function() {
		getArticle('5');
		this.style.color = "#4584d5";
		showingObj.style.color = "#e6757d";
		showingObj = this;
	}

	serial.onclick = function() {
		getArticle('6');
		this.style.color = "#4584d5";
		showingObj.style.color = "#e6757d";
		showingObj = this;
	}
}
