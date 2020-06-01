// 加载用户信息脚本
function addUserInfo() {
	var xhrLoadUser = new XMLHttpRequest();

	xhrLoadUser.open('GET', 'php/loadUserInfo.php', true);
	xhrLoadUser.send();

	xhrLoadUser.onreadystatechange = function() {
		if (xhrLoadUser.readyState == 4 && xhrLoadUser.status == 200) {
			// console.log(xhrLoadUser.responseText);
			if (xhrLoadUser.responseText == '0' || xhrLoadUser.responseText == '1') {

			} else {
				//获取用户ID
				var userId = JSON.parse(xhrLoadUser.responseText)['userId'];

				//设置头像
				var userHeadCont = document.getElementById("user_head_cont");
				var userHeadIma = document.getElementById("user_head");
				userHeadIma.setAttribute("src", "userFile/" + userId + "/headPortrait.jpg");

				// 设置头部我的空间链接
				var userPageHref = document.getElementById("user_page_href");
				userPageHref.setAttribute("href", "personal/personal.php?pid=" + userId);

				// 设置容器可以显示
				var loginCont = document.getElementById("login_on_cont");
				loginCont.style.display = "none";
				userHeadCont.style.display = "block";

				//来信框的操作
				var myMailBut = document.getElementById("user_mail"); //我的来信按钮
				var showMail = document.getElementById("my_mail_cont"); //显示来信的容器
				var loadMailCont = document.getElementById("specific_mail_cont"); //装载来信的容器
				var closeMail = document.getElementById("close_mail"); //关闭显示来信的叉号
				var readDotHead = document.getElementById("read_dot"); //头像红点
				var readDotMail = document.getElementById("read_dot_mail"); //我的来信红点




				//加载来信
				var xhrAddMail = new XMLHttpRequest();
				xhrAddMail.open('GET', 'php/addMail.php?uid=' + userId, true);
				xhrAddMail.send();
				xhrAddMail.onreadystatechange = function() {
					if (xhrAddMail.readyState == 4 && xhrAddMail.status == 200) {
						var mailJsonStr = '{"mail":[' + xhrAddMail.responseText + ']}';
						console.log(xhrAddMail.responseText);
						var mailObj = JSON.parse(mailJsonStr)['mail'];
						var mailLen = mailObj.length;

						if (mailLen >= 1) {
							// 增加红点
							readDotHead.style.display = "inline-block";
							readDotMail.style.display = "inline-block";
						}
						
							myMailBut.onclick = function() {
								loadMailCont.innerHTML='';
								// 消除红点
								readDotHead.style.display = "none";
								readDotMail.style.display = "none";
								for (var i = 0; i < mailLen; i++) {
									var outStr = '';
									//时间处理
									var date = Number(mailObj[i]['date']) * 1000; //时间戳
									var dateObj = new Date(date); //日期对象
									var dateStr = dateObj.getFullYear() + "-" + dateObj.getMonth() + "-" + dateObj.getDate();

									if (mailObj[i]['chapterId'] != null) {
										// 是对章节文章的操作
										if (mailObj[i]['state'] == '0') {
											outStr = '<li class="specifc_mail">您的文章《' + mailObj[i]['chapterTitle'] + '》已通过审核！<p class="mail_date">' +
												dateStr + '</p></li>';
										}

										if (mailObj[i]['state'] == '1') {
											outStr = '<li class="specifc_mail">您的文章《' + mailObj[i]['chapterTitle'] +
												'》未通过审核，原因是：<span class="refuse_reason">' + mailObj[i]['banReason'] + '</span><p class="mail_date">' +
												dateStr + '</p></li>';
										}

										if (mailObj[i]['state'] == '2') {
											outStr = '<li class="specifc_mail"><span id="actUserName">' + mailObj[i]['userName'] + '</span> 在我的文章《' +
												mailObj[i]['chapterTitle'] + '》中评论：' + mailObj[i]['content'] + '。<p class="mail_date">' + dateStr +
												'</p></li>';
										}

										if (mailObj[i]['state'] == '3') {
											// 点赞
											outStr = '<li class="specifc_mail"><span id="actUserName">' + mailObj[i]['userName'] + '</span> 赞了我的文章《' +
												mailObj[i]['chapterId'] + '》<p class="mail_date">' + dateStr + '</p></li>';
										}

										if (mailObj[i]['state'] == '4') {
											// 收藏
											outStr = '<li class="specifc_mail"><span id="actUserName">' + mailObj[i]['userName'] + '</span> 收藏了我的文章《' +
												mailObj[i]['chapterId'] + '》<p class="mail_date">' + dateStr + '</p></li>';
										}

										if (mailObj[i]['state'] == '6') {
											outStr = '<li class="specifc_mail">你因为：<span class="refuse_reason">' + mailObj[i]['banReason'] +
												'</span>。账号已被封禁<p class="mail_date">' + dateStr + '</p></li>';
										}
									} else {
										if (mailObj[i]['chapterId'] == null) {
											// console.log(mailObj[i]['chapterId']);
											// console.log(mailObj[i]['state']);
											if (mailObj[i]['state'] == '0') {
												outStr = '<li class="specifc_mail">您的文章《' + mailObj[i]['title'] + '》已通过审核！<p class="mail_date">' +
													dateStr + '</p></li>';
											}

											if (mailObj[i]['state'] == '1') {
												outStr = '<li class="specifc_mail">您的文章《' + mailObj[i]['title'] +
													'》未通过审核，原因是：<span class="refuse_reason">' + mailObj[i]['banReason'] + '</span><p class="mail_date">' +
													dateStr + '</p></li>';
											}

											if (mailObj[i]['state'] == '2') {
												outStr = '<li class="specifc_mail"><span id="actUserName">' + mailObj[i]['userName'] + '</span> 在我的文章《' +
													mailObj[i]['title'] + '》中评论：' + mailObj[i]['content'] + '。<p class="mail_date">' + dateStr +
													'</p></li>';
											}

											if (mailObj[i]['state'] == '3') {
												// 点赞
												outStr = '<li class="specifc_mail"><span id="actUserName">' + mailObj[i]['userName'] + '</span> 赞了我的文章《' +
													mailObj[i]['title'] + '》<p class="mail_date">' + dateStr + '</p></li>';
											}

											if (mailObj[i]['state'] == '4') {
												// 收藏
												outStr = '<li class="specifc_mail"><span id="actUserName">' + mailObj[i]['userName'] +
													'</span> 收藏了我的文章《' +
													mailObj[i]['title'] + '》<p class="mail_date">' + dateStr + '</p></li>';
											}

											if (mailObj[i]['state'] == '6') {
												outStr = '<li class="specifc_mail">你因为：<span class="refuse_reason">' + mailObj[i]['banReason'] +
													'</span>。账号已被封禁<p class="mail_date">' + dateStr + '</p></li>';
											}
										}
									}
									//console.log(outStr);
									loadMailCont.innerHTML += outStr;
									
								}//for结束
								showMail.style.display = "block";
							}
								
					} //我的来信单击事件
				}

				closeMail.onclick = function() {
					showMail.style.display = "none";
				}
			}
		}
	}
}

window.onload = addUserInfo();
