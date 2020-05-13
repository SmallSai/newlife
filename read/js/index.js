// 阅读页面加载顶部栏用户信息以及浮动栏用户信息，以及评论的加载
function addUserInfo() {
	// 获取隐藏表单的值,写评论，加载评论都会用到
	// hiddenVal值：articleId=n 或者 chapterId=n
	var hiddenVal = document.getElementById("articleId_hidden").value;

	// 发表评论等组件对象
	var commentUserHead = document.getElementById("comment_user_head");
	var sendCommentBut = document.getElementById("send_comment_but");
	var commentTextarea = document.getElementById("comment_textarea");

	// 加载用户信息，包括顶部栏，浮动操作栏，评论栏
	var xhrLoadUser = new XMLHttpRequest();
	xhrLoadUser.open('GET', '../php/loadUserInfo.php', true)
	xhrLoadUser.send();

	xhrLoadUser.onreadystatechange = function() {
		if (xhrLoadUser.readyState == 4 && xhrLoadUser.status == 200) {
			if (xhrLoadUser.responseText == '0' || xhrLoadUser.responseText == '1') {
				//未登录或者身份匹配不正确
				commentTextarea.value = "登录后就能评论啦";
				commentTextarea.setAttribute("readonly", "readonly");
			} else {
				//获取用户ID
				var userId = JSON.parse(xhrLoadUser.responseText)['userId'];
				var userName = JSON.parse(xhrLoadUser.responseText)['userName'];

				//顶部栏的设置
				var userHeadCont = document.getElementById("user_head_cont");
				var userHeadIma = document.getElementById("user_head");
				userHeadIma.setAttribute("src", "../userFile/" + userId + "/headPortrait.jpg");

				var loginCont = document.getElementById("login_on_cont");
				loginCont.style.display = "none";
				userHeadCont.style.display = "block";

				//浮动操作栏的设置
				var floatUserHead = document.getElementById("float_user_operation_head");
				floatUserHead.setAttribute("src", "../userFile/" + userId + "/headPortrait.jpg");

				// 检查该文章是否已点赞，收藏，1-已点赞/收藏，0反之
				$upFlag = '';
				$favoriteFlag = '';

				// 点赞对象
				var upObj = document.getElementById("up_logo");

				// 点赞函数
				function upFunc() {
					
					// 点赞AJAX对象
					var xhrUpArticle = new XMLHttpRequest();
					xhrUpArticle.open('GET', 'php/upQuery.php?operaFlag=2&userId=' + userId + '&' + hiddenVal, true);
					xhrUpArticle.send();
					xhrUpArticle.onreadystatechange = function() {
						if (xhrUpArticle.readyState == 4 && xhrUpArticle.status == 200) {

							if (xhrUpArticle.responseText == '1') {
								// 点赞成功
								upObj.setAttribute("src", "../file/icon/up_fill.svg");
								upObj.setAttribute("title", "已点赞");

								// 取消点赞
								upObj.onclick = upCloseFunc;
							} else {
								console.log(xhrUpArticle.responseText);
								confirm("点赞失败！");

							}
						}
					}
				}

				// 取消点赞函数
				function upCloseFunc() {
					// 取消点赞AJAX对象
					var xhrUpClose = new XMLHttpRequest();
					xhrUpClose.open('GET', 'php/upQuery.php?operaFlag=3&userId=' + userId + '&' + hiddenVal, true);
					xhrUpClose.send();
					xhrUpClose.onreadystatechange = function() {
						if (xhrUpClose.readyState == 4 && xhrUpClose.status == 200) {
							if (xhrUpClose.responseText == '1') {
								// 取消点赞成功
								upObj.setAttribute("src", "../file/icon/up.svg");
								upObj.setAttribute("title", "点赞该文章");

								// 点击点赞
								upObj.onclick = upFunc;
							} else {
								console.log(xhrUpClose.responseText);
								confirm("取消点赞失败！");
							}
						}
					}
				}

				// 检查点赞状态
				var xhrUpFlag = new XMLHttpRequest();
				xhrUpFlag.open('GET', 'php/upQuery.php?operaFlag=1&userId=' + userId + '&' + hiddenVal, true);
				// console.log("js中hiddenVal:"+hiddenVal+"----");
				xhrUpFlag.send();

				xhrUpFlag.onreadystatechange = function() {
					if (xhrUpFlag.readyState == 4 && xhrUpFlag.status == 200) {
						console.log(xhrUpFlag.responseText);
						if (xhrUpFlag.responseText == '0') {
							// 还未点赞
							upObj.setAttribute("src", "../file/icon/up.svg");
							upObj.setAttribute("title", "点赞该文章");

							// 点击点赞
							upObj.onclick = upFunc;

						} else {
							if (xhrUpFlag.responseText == '1') {
								// 已点赞
								upObj.setAttribute("src", "../file/icon/up_fill.svg");
								upObj.setAttribute("title", "已点赞");

								upObj.onclick = upCloseFunc;
							}

						}
					}
				}


				// 收藏对象
				var favoriteObj = document.getElementById("favorite_logo");

				// 收藏函数
				function favoriteFunc() {
					// 收藏AJAX对象
					var xhrFavoriteArticle = new XMLHttpRequest();
					xhrFavoriteArticle.open('GET', 'php/favoriteQuery.php?operaFlag=2&userId=' + userId + '&' + hiddenVal, true);
					xhrFavoriteArticle.send();
					xhrFavoriteArticle.onreadystatechange = function() {
						if (xhrFavoriteArticle.readyState == 4 && xhrFavoriteArticle.status == 200) {

							if (xhrFavoriteArticle.responseText == '1') {
								// 收藏成功
								favoriteObj.setAttribute("src", "../file/icon/collection_fill.svg");
								favoriteObj.setAttribute("title", "已收藏");

								// 取消收藏
								favoriteObj.onclick = favoriteCloseFunc;
							} else {
								console.log(xhrFavoriteArticle.responseText);
								confirm("收藏失败！");

							}
						}
					}
				}

				// 取消收藏函数
				function favoriteCloseFunc() {
					
					// 取消收藏AJAX对象
					var xhrFavoriteClose = new XMLHttpRequest();
					xhrFavoriteClose.open('GET', 'php/favoriteQuery.php?operaFlag=3&userId=' + userId + '&' + hiddenVal, true);
					xhrFavoriteClose.send();
					xhrFavoriteClose.onreadystatechange = function() {
						if (xhrFavoriteClose.readyState == 4 && xhrFavoriteClose.status == 200) {
							if (xhrFavoriteClose.responseText == '1') {
								// 取消收藏成功
								favoriteObj.setAttribute("src", "../file/icon/collection.svg");
								favoriteObj.setAttribute("title", "收藏该文章");

								// 点击收藏
								favoriteObj.onclick = favoriteFunc;
							} else {
								console.log(xhrFavoriteClose.responseText);
								confirm("取消收藏失败！");
							}
						}
					}
				}

				// 检查收藏状态
				var xhrfavoriteFlag = new XMLHttpRequest();
				xhrfavoriteFlag.open('GET', 'php/favoriteQuery.php?operaFlag=1&userId=' + userId + '&' + hiddenVal, true);
				xhrfavoriteFlag.send();

				xhrfavoriteFlag.onreadystatechange = function() {
					if (xhrfavoriteFlag.readyState == 4 && xhrfavoriteFlag.status == 200) {
						// console.log(xhrfavoriteFlag.responseText);
						if (xhrfavoriteFlag.responseText == '0') {
							// 还未收藏
							favoriteObj.setAttribute("src", "../file/icon/collection.svg");
							favoriteObj.setAttribute("title", "收藏该文章");

							// 点击收藏
							favoriteObj.onclick = favoriteFunc;

						} else {
							if (xhrfavoriteFlag.responseText == '1') {
								// 已收藏
								favoriteObj.setAttribute("src", "../file/icon/collection_fill.svg");
								favoriteObj.setAttribute("title", "已收藏");

								favoriteObj.onclick = favoriteCloseFunc;
							}

						}
					}
				}


				// 写评论，头像，按钮等
				commentUserHead.setAttribute("src", "../userFile/" + userId + "/headPortrait.jpg");

				commentTextarea.onkeyup = function() {
					if (commentTextarea.value.length >= 1) {
						sendCommentBut.style.cursor = "pointer";
						sendCommentBut.style.backgroundColor = "#ff656d";

						// 发送按钮事件
						sendCommentBut.onclick = function() {
							// 写入评论的AJAX对象
							var xhrWriteComment = new XMLHttpRequest();
							xhrWriteComment.open('GET', 'php/writeComment.php?' + hiddenVal + '&uid=' + userId + '&userName=' + userName +
								'&content=' + commentTextarea.value, true);
							xhrWriteComment.send();

							xhrWriteComment.onreadystatechange = function() {
								if (xhrWriteComment.readyState == 4 && xhrWriteComment.status == 200) {
									if (xhrWriteComment.responseText == '1') {
										// 评论发表成功
										commentTextarea.value = '';
										location.reload();
									} else {
										confirm("评论发表失败！");
									}
								}
							}
						}
					} else {
						sendCommentBut.style.cursor = "not-allowed";
						sendCommentBut.style.backgroundColor = "#cfcfcf";

						// onclick事件无操作
						sendCommentBut.onclick = function() {

						}
					}
				}

			}
		}
	}

	// 加载评论的AJAX对象
	var xhrLoadComment = new XMLHttpRequest();
	xhrLoadComment.open('GET', 'php/addComment.php?' + hiddenVal, true);
	xhrLoadComment.send();

	// 评论区容器
	var commentCont = document.getElementById("show_comment");
	// 精彩评论数量
	var titleCommentNum = document.getElementById("title_comment_num"); //显示精彩评论数量的对象

	xhrLoadComment.onreadystatechange = function() {
		if (xhrLoadComment.readyState == 4 && xhrLoadComment.status == 200) {

			if (xhrLoadComment.responseText == '0') {
				commentCont.innerHTML += "<p id='no_comment'>无人评论</p>";
				titleCommentNum.innerHTML = '';

			} else {
				// 将评论内容JSON数据转化为JS对象
				var commentObj = JSON.parse('{"comment":[' + xhrLoadComment.responseText + ']}')['comment'];
				commentObjNum = commentObj.length;
				titleCommentNum.innerHTML = commentObj.length;

				// 评论对象信息
				var comUserId = '';
				var comUserName = '';
				var comContent = '';
				var comUpNum = '';

				for (var i = 0; i < commentObjNum; i++) {
					comUserId = commentObj[i]['userId'];
					comUserName = commentObj[i]['userName'];
					comContent = commentObj[i]['content'];
					comUpNum = commentObj[i]['upNum'];

					var outCommentStr = '<!-- 具体展示评论 --><div class="specifi_comment"><!-- 评论人信息容器 --><div class="commentator_info">' +
						'<img src="../userFile/' + comUserId + '/headPortrait.jpg" class="commentator_head"><!-- 评论者名字以及点赞数量 -->' +
						'<p class="commentator_name">' + comUserName +
						'</p><!-- 点赞数量 --><img src="../file/icon/up.svg" class="comment_up_logo">' +
						'<div class="comment_up_num">' + comUpNum + '</div></div><!-- 评论展示容器 --><p class="show_comment_word">' +
						comContent + '</p></div>';

					commentCont.innerHTML += outCommentStr;
				}
			}
		}
	}

}

window.onload = addUserInfo();
