// 写作页面用于与后台数据交互的JS脚本
function funcAjax() {
	var userId, userName;
	var inputFlag = 0; //0-正常插入更新操作，1-增加新章节这个特殊操作,2-点击已有章节

	//错误提示框
	var errorTitle = document.getElementsByClassName("error_info")[0]; //标题处的提示
	var errorOri = document.getElementsByClassName("error_info")[1]; //是否原创处的提示
	var errorSerial = document.getElementsByClassName("error_info")[2]; //是否连载处提示
	var errorText = document.getElementsByClassName("error_info")[4]; //文章保存处的提示

	//文章ID隐藏框对象
	var writingIdObj = document.getElementById("writing_article"); //正在编辑的文章的ID，-1为新的文章

	//获取文章信息对象
	var title, articleText, nature, oriAuthor, unSerial, chapterTitle, serialText, chapterClass, chapterNum, articleType;
	title = document.getElementById("title");
	articleText = document.getElementById("textarea");
	nature = document.getElementsByName("isOriginal");
	oriAuthor = document.getElementById("org_author_input");
	unSerial = document.getElementsByName("isSerial");
	chapterTitle = document.getElementById("chapterTitle");
	serialText = document.getElementById("textarea");
	chapterClass = document.getElementsByName("chapterClass");
	chapterNum = document.getElementById("chapterNum");
	articleType = document.getElementById("article_class_select");
	articleClass = document.getElementsByClassName("article_class"); //文章分类的option
	//检查是否非法访问，如未登录访问写作页面
	var xhrCookie = new XMLHttpRequest();
	xhrCookie.open('GET', '../php/loadUserInfo.php', true);
	xhrCookie.send();


	xhrCookie.onreadystatechange = function() {
		if (xhrCookie.readyState == 4 && xhrCookie.status == 200) {
			// alert(xhrCookie.responseText);
			if (xhrCookie.responseText == '0' || xhrCookie.responseText == '1') {
				window.location.assign("../login/index.html");
			} else {
				var userObj = JSON.parse(xhrCookie.responseText);
				userId = userObj['userId']; //获得用户ID
				userName = userObj['userName']; //获得用户名字

				//加载用户草稿应放在获取了用户信息后再执行
				var xhrAddDraft = new XMLHttpRequest();
				xhrAddDraft.open('GET', 'php/addDraft.php?userId=' + userId, true);
				xhrAddDraft.send()

				xhrAddDraft.onreadystatechange = function() {
					if (xhrAddDraft.readyState == 4 && xhrAddDraft.status == 200) {
						var draftJsonStr = '{"article":[' + xhrAddDraft.responseText + ']}';
						var draftObj = JSON.parse(draftJsonStr)['article'];

						//获得的文章信息
						var getTitle, getArticleId, getArticleId;

						//要输出的位置
						var singleDraft = document.getElementById("single_draft_frame");
						var serialDraft = document.getElementById("serial_draft_frame");

						for (var i = 0; i < draftObj.length; i++) {

							//将仅仅标题信息输出到页面
							if (draftObj[i]['unSerial'] == '0') { //单篇是'0'
								singleDraft.innerHTML += "<div class='single_draft'><h1 class='single_draft_title'>" + draftObj[i]['title'] +
									"</h1><input type='hidden' value='" + draftObj[i]['articleId'] + "'></div>";
							}
							if (draftObj[i]['unSerial'] == '1') {
								serialDraft.innerHTML +=
									'<span class="addChapter_logo" title="增加新章节">+</span><div class="specific_draft serial_draft"><h1 class="draft_title"><img src="image/triangle.svg" class="list_triangle">' +
									draftObj[i]['title'] +
									'</h1><div class="serial_chapter_title_cont"></div><input type="hidden" class="hidden_art_id" value="' +
									draftObj[i]['articleId'] + '"></div>';
							}
						}

						//我的连载三角形展开
						var draftTitleObj = document.getElementsByClassName('draft_title');
						var addChapterLogoObj = document.getElementsByClassName("addChapter_logo");

						for (var i = 0; i < draftTitleObj.length; i++) {
							//单击小三角切换
							draftTitleObj[i].onclick = function() {
								var triangleIma = this.getElementsByClassName('list_triangle')[0];

								if (triangleIma.style.transform == "rotate(0deg)") {
									triangleIma.style.transform = "rotate(-90deg)";
									$(this).nextAll(".serial_chapter_title_cont").slideUp();
								} else {
									triangleIma.style.transform = "rotate(0deg)";
									$(this).nextAll(".serial_chapter_title_cont").slideDown();
								}
							}

							/*-----浮动连载标题显示+号新增连载章节-----*/
							var visibObj;
							draftTitleObj[i].onmouseover = function() {
								if (visibObj) {
									visibObj.style.visibility = "hidden";
								}
								this.parentNode.previousSibling.style.visibility = "visible";
								visibObj = this.parentNode.previousSibling;
							}
						}

						//单击草稿标题将信息加入在文章信息处
						var singleTitleObj = document.getElementsByClassName("single_draft");
						var xhrAddDraftInfo = new XMLHttpRequest();

						//单篇草稿文章的加载
						var orgSpan = document.getElementById('org_span'); //原创span对象
						var orgRadio = document.getElementById('org_radio_inp'); //原创radio表单
						var copySpan = document.getElementById('copy_span');
						var copyRadio = document.getElementById('copy_radio_inp');
						var singleSpan = document.getElementById("single_span"); //单篇span对象
						var singleRadio = document.getElementById("single_radio_inp"); //单篇radio表单
						var serialSpan = document.getElementById("serial_span");
						var serialRadio = document.getElementById("serial_radio_inp");
						var prefaceSpan = document.getElementById("preface_span"); //前言span对象
						var prefaceRadio = document.getElementById("preface_radio_inp"); //前言radio表单
						var textSpan = document.getElementById("text_span");
						var textRadio = document.getElementById("text_radio_inp");

						var singleLab = document.getElementById("single_radio");
						var serialLab = document.getElementById("serial_radio");
						/*-------触发弹出的信息框-------*/
						var org_author = $("#original_author_cont");
						var serial_info = $("#serial_info_cont");
						var chapter_num = $("#chapter_num_cont");

						function addArticleInfo(singleObj) {
							title.value = singleObj["title"];
							//加载后不允许改变单篇连载属性
							singleLab.style.display = "none";
							singleRadio.style.display = "none";
							serialLab.style.display = "none";
							serialRadio.style.display = "none";

							if (singleObj['nature'] == '0') {
								//原创
								org_author.slideUp();
								oriAuthor.value = '';

								orgSpan.style.backgroundColor = "#ff557f";
								orgSpan.style.color = "#FFFFFF";
								orgSpan.style.border = "solid 1px #ff557f";
								orgRadio.setAttribute("checked", true);

								copySpan.style.background = "none";
								copySpan.style.color = "#ff557f";
								copySpan.style.border = "solid 1px";
							}
							if (singleObj['nature'] == '1') {
								//转载
								org_author.slideDown();
								org_author.css({
									"display": "flex"
								});
								oriAuthor.value = singleObj['oriAuthor'];

								copySpan.style.backgroundColor = "#ff557f";
								copySpan.style.color = "#FFFFFF";
								copySpan.style.border = "solid 1px #ff557f";
								copyRadio.setAttribute("checked", true);

								orgSpan.style.background = "none";
								orgSpan.style.color = "#ff557f";
								orgSpan.style.border = "solid 1px";
							}

							if (singleObj['unSerial'] == '0') {
								//单篇
								serial_info.slideUp();
								chapterTitle.value = '';
								articleText.value = singleObj['articleText'];

								//前言，正文span样式取消,章节号归零
								prefaceSpan.style.background = "none";
								prefaceSpan.style.color = "#ff557f";
								prefaceSpan.style.border = "solid 1px";
								textSpan.style.background = "none";
								textSpan.style.color = "#ff557f";
								textSpan.style.border = "solid 1px";
								chapterNum.value = 0;
								chapterTitle.value = '';

								singleSpan.style.backgroundColor = "#ff557f";
								singleSpan.style.color = "#FFFFFF";
								singleSpan.style.border = "solid 1px #ff557f";
								singleRadio.setAttribute("checked", true);

								serialSpan.style.background = "none";
								serialSpan.style.color = "#ff557f";
								serialSpan.style.border = "solid 1px";
							}
							if (singleObj['unSerial'] == '1') {
								//连载
								serial_info.slideDown();

								if (singleObj['chapterTitle']) {
									chapterTitle.value = singleObj['chapterTitle'];
								} else {
									chapterTitle.value = '';
								}

								if (singleObj['serialText']) {
									articleText.value = singleObj['serialText'];
								} else {
									articleText.value = '';
								}

								serialSpan.style.backgroundColor = "#ff557f";
								serialSpan.style.color = "#FFFFFF";
								serialSpan.style.border = "solid 1px #ff557f";
								serialRadio.setAttribute("checked", true);

								singleSpan.style.background = "none";
								singleSpan.style.color = "#ff557f";
								singleSpan.style.border = "solid 1px";

								if (singleObj['chapterClass'] == '0') {
									//前言
									chapterNum.value = 0;
									chapter_num.slideUp();

									prefaceSpan.style.backgroundColor = "#ff557f";
									prefaceSpan.style.color = "#FFFFFF";
									prefaceSpan.style.border = "solid 1px #ff557f";
									prefaceRadio.setAttribute("checked", true);

									textSpan.style.background = "none";
									textSpan.style.color = "#ff557f";
									textSpan.style.border = "solid 1px";
								}
								if (singleObj['chapterClass'] == '1') {
									//正文
									textSpan.style.backgroundColor = "#ff557f";
									textSpan.style.color = "#FFFFFF";
									textSpan.style.border = "solid 1px #ff557f";
									textRadio.setAttribute("checked", true);

									prefaceSpan.style.background = "none";
									prefaceSpan.style.color = "#ff557f";
									prefaceSpan.style.border = "solid 1px";

									//章节序号
									chapter_num.slideDown();
									chapter_num.css({
										"display": "flex"
									});
									chapterNum.value = singleObj['chapterNum'];
								}
							}

							//加载文章分类
							switch (singleObj['type']) {
								case '1':
									articleClass[0].selected = true;
									break;
								case '2':
									articleClass[1].selected = true;
									break;
								case '3':
									articleClass[2].selected = true;
									break;
								case '4':
									articleClass[3].selected = true;
									break;
								case '5':
									articleClass[4].selected = true;
									break;
							}
						}

						//增加新章节的+号按钮操作
						var addNewChapterBut = document.getElementsByClassName("addChapter_logo");
						//alert(addNewChapterBut.length);
						for (var r = 0; r < addNewChapterBut.length; r++) {
							addNewChapterBut[r].onclick = function() {
								if (articleText.value.length > 0) {
									if (confirm("确保您正在编辑的文章有保存过哦")) {
										var thisGetArticleId = this.nextSibling.getElementsByClassName("hidden_art_id")[0].value;
										writingIdObj.value = thisGetArticleId; //将正在编辑的ID设为此ID

										var xhrAddNewChapter = new XMLHttpRequest(); //增加新章节的xhr对象
										xhrAddNewChapter.open('GET', 'php/addDraftInfo.php?articleId=' + thisGetArticleId + "&userId=" + userId,
											true);
										xhrAddNewChapter.send();

										xhrAddNewChapter.onreadystatechange = function() {
											// alert(xhrAddNewChapter.responseText);
											// alert("-----thisGetArticleId:"+thisGetArticleId);
											if (xhrAddNewChapter.readyState == 4 && xhrAddNewChapter.status == 200) {
												//转换为JS对象
												addArticleInfo(JSON.parse(xhrAddNewChapter.responseText)); //调用，加载预存值
												inputFlag = 1; //增加新章节操作
											}
										}
									} //if confirm
								} 
								else {
									var thisGetArticleId = this.nextSibling.getElementsByClassName("hidden_art_id")[0].value;
									writingIdObj.value = thisGetArticleId; //将正在编辑的ID设为此ID

									var xhrAddNewChapter = new XMLHttpRequest(); //增加新章节的xhr对象
									xhrAddNewChapter.open('GET', 'php/addDraftInfo.php?articleId=' + thisGetArticleId + "&userId=" + userId,
										true);
									xhrAddNewChapter.send();

									xhrAddNewChapter.onreadystatechange = function() {
										// alert(xhrAddNewChapter.responseText);
										// alert("-----thisGetArticleId:"+thisGetArticleId);
										if (xhrAddNewChapter.readyState == 4 && xhrAddNewChapter.status == 200) {
											//转换为JS对象
											addArticleInfo(JSON.parse(xhrAddNewChapter.responseText)); //调用，加载预存值
											inputFlag = 1; //增加新章节操作
										}
									}
								} //else
							}
						}

						//单篇文章信息加载到信息栏
						for (var j = 0; j < singleTitleObj.length; j++) {
							singleTitleObj[j].onclick = function() {
								if (articleText.value.length > 0) {
									if (confirm("确保您正在编辑的文章有保存过哦")) {
										var thisId = this.getElementsByTagName("input")[0].value; //获取隐藏input中value存储的id
										writingIdObj.value = thisId; //将判断正在编辑的文章ID的隐藏input的值改为该文章ID
										xhrAddDraftInfo.open("GET", "php/addDraftInfo.php?articleId=" + thisId + "&userId=" + userId, true);
										xhrAddDraftInfo.send();

										xhrAddDraftInfo.onreadystatechange = function() {

											if (xhrAddDraftInfo.readyState == 4 && xhrAddDraftInfo.status == 200) {
												//转换为JS对象
												var articleObj = JSON.parse(xhrAddDraftInfo.responseText);
												addArticleInfo(articleObj); //调用
												inputFlag = 0;
											}
										}
									} //if confirm
								} else {
									var thisId = this.getElementsByTagName("input")[0].value; //获取隐藏input中value存储的id
									writingIdObj.value = thisId; //将判断正在编辑的文章ID的隐藏input的值改为该文章ID
									xhrAddDraftInfo.open("GET", "php/addDraftInfo.php?articleId=" + thisId + "&userId=" + userId, true);
									xhrAddDraftInfo.send();

									xhrAddDraftInfo.onreadystatechange = function() {

										if (xhrAddDraftInfo.readyState == 4 && xhrAddDraftInfo.status == 200) {
											//转换为JS对象
											var articleObj = JSON.parse(xhrAddDraftInfo.responseText);
											addArticleInfo(articleObj); //调用
											inputFlag = 0;
										}
									}
								} //else

							} //单击标题onclick事件结束
						} //单篇草稿文章的加载

						//连载草稿文章标题的加载
						var serialArticleTitle = document.getElementsByClassName("serial_draft");
						for (var k = 0; k < serialArticleTitle.length; k++) {
							serialArticleTitle[k].onclick = function() {
								//获取该连载文章的articleId
								var serialArticleId = this.getElementsByTagName("input")[0].value;
								//获取连载标题写入容器
								var serialTitleCont = this.getElementsByClassName("serial_chapter_title_cont")[0];

								//AJAX对象进行数据传输
								var addSerialTitle = new XMLHttpRequest();
								addSerialTitle.open('GET', 'php/addChapterTitle.php?articleId=' + serialArticleId, true);
								addSerialTitle.send();

								addSerialTitle.onreadystatechange = function() {
									// alert(addSerialTitle.responseText);
									if (addSerialTitle.readyState == 4 && addSerialTitle.status == 200) {
										if (addSerialTitle.responseText != '0') { //查询到有数据
											var serialTitleJsonStr = '{"serialTitle":[' + addSerialTitle.responseText + ']}';
											var serialTitleObj = JSON.parse(serialTitleJsonStr)['serialTitle'];
											for (var k = 0; k < serialTitleObj.length; k++) {
												serialTitleCont.innerHTML += '<h1 class="serial_chapter_title">' + serialTitleObj[k]['chapterTitle'] +
													'<input type="hidden" value="' + serialTitleObj[k]['chapterId'] +
													'"><input type="hidden" value="' + serialArticleId + '"></h1>';
											}
										}

										//连载章节单击加载信息到文章信息栏
										var theSerialTitle = document.getElementsByClassName("serial_chapter_title"); //具体连载标题对象

										for (var t = 0; t < theSerialTitle.length; t++) {
											theSerialTitle[t].onclick = function() {
												if (articleText.value.length > 0) {
													if (confirm("确保您正在编辑的文章有保存过哦")) {
														var thisSerialArticleId = this.getElementsByTagName("input")[1].value; //连载文章文章的ID
														var thisSerialChapterId = this.getElementsByTagName("input")[0].value; //连载文章章节的ID
														writingIdObj.value = thisSerialChapterId; //存储章节的ID

														var xhrAddSerialArtInfo = new XMLHttpRequest();
														xhrAddSerialArtInfo.open("GET", "php/addDraftInfo.php?articleId=" + thisSerialArticleId +
															"&chapterId=" + thisSerialChapterId + "&userId=" + userId, true);
														xhrAddSerialArtInfo.send();

														xhrAddSerialArtInfo.onreadystatechange = function() {
															if (xhrAddSerialArtInfo.readyState == 4 && xhrAddSerialArtInfo.status == 200) {
																// alert(xhrAddSerialArtInfo.responseText);
																// articleText.value=xhrAddSerialArtInfo.responseText;
																var serialArticleObj = JSON.parse(xhrAddSerialArtInfo.responseText);
																addArticleInfo(serialArticleObj);
																inputFlag = 2;
															}
														}
													} //if confirm
												} else {
													var thisSerialArticleId = this.getElementsByTagName("input")[1].value; //连载文章文章的ID
													var thisSerialChapterId = this.getElementsByTagName("input")[0].value; //连载文章章节的ID
													writingIdObj.value = thisSerialChapterId; //存储章节的ID

													var xhrAddSerialArtInfo = new XMLHttpRequest();
													xhrAddSerialArtInfo.open("GET", "php/addDraftInfo.php?articleId=" + thisSerialArticleId +
														"&chapterId=" + thisSerialChapterId + "&userId=" + userId, true);
													xhrAddSerialArtInfo.send();

													xhrAddSerialArtInfo.onreadystatechange = function() {
														if (xhrAddSerialArtInfo.readyState == 4 && xhrAddSerialArtInfo.status == 200) {
															// alert(xhrAddSerialArtInfo.responseText);
															// articleText.value=xhrAddSerialArtInfo.responseText;
															var serialArticleObj = JSON.parse(xhrAddSerialArtInfo.responseText);
															addArticleInfo(serialArticleObj);
															inputFlag = 2;
														}
													}
												} //else
											}
										}
									}
								}
							}
						} //单击连载加载连载标题结束

					} //用户草稿加载完毕
				} //xhrAddDraft.onreadystatechange

			}
		}
	}

	//用于插入数据库的变量
	var dbTitle, dbArticleText, dbNature, dbOriAuthor, dbUnSerial, dbChapterTitle, dbSerialText, dbchapterClass,
		dbChapterNum, dbArticleType, dbWordNum;

	//保存操作
	var saveObj = document.getElementById("save"); //保存按钮对象
	var saveFlag = true;
	saveObj.onclick = function() {

		if (articleText.value.length) { //写有内容，可以保存
			dbArticleText = articleText.value;
			dbWordNum = dbArticleText.length;
			var dateObj = new Date();

			//文章标题
			if (title.value.length > 0) {
				dbTitle = title.value;
			} else {
				dbTitle = dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate();
			}

			//文章性质，0-原创，1-转载
			if (nature[1].checked) {
				dbNature = nature[1].value;

				//原作者
				if (oriAuthor) {
					dbOriAuthor = oriAuthor.value;
				} else {
					dbOriAuthor = '';
				}
			} else {
				dbNature = nature[0].value;
			}

			//文章分类
			if (articleType.value) {
				dbArticleType = articleType.value;
			} else {
				dbArticleType = 0;
			}

			//是否连载，0-非连载，1-连载
			if (unSerial[1].checked) { //连载
				dbUnSerial = unSerial[1].value;
				dbSerialText = serialText.value;

				//连载弹出章节标题
				if (chapterTitle.value.length) {
					dbChapterTitle = chapterTitle.value;
				} else {
					dbChapterTitle = "chapter" + dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate();
				}

				//章节类型,前言或是正文
				if (chapterClass[0].checked) {
					dbChapterClass = chapterClass[0].value;
				} else {
					dbChapterClass = chapterClass[1].value;

					//正文弹出章节号
					if (chapterNum.value) {
						dbChapterNum = chapterNum.value;
					} else {
						dbChapterNum = 0;
					}
				}

			} else { //非连载
				dbUnSerial = unSerial[0].value;
			}

			//保存或者更新草稿操作
			var xhrSave = new XMLHttpRequest();

			xhrSave.open('POST', 'php/save.php', true);
			xhrSave.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			// alert("articleId:"+writingArticleId+"-----");
			//单篇文章发送数据
			if (dbUnSerial == 0) {
				xhrSave.send("articleId=" + writingIdObj.value + "&title=" + dbTitle + "&userId=" + userId + "&userName=" +
					userName + "&type=" + dbArticleType + "&nature=" + dbNature +
					"&oriAuthor=" + dbOriAuthor + "&unSerial=" + dbUnSerial + "&articleText=" + dbArticleText + "&wordNum=" +
					dbWordNum);
			}

			//连载文章发送数据
			if (dbUnSerial == 1) {
				//alert("writingIdObj.value:"+writingIdObj.value+"-------");
				console.log(writingIdObj.value);
				xhrSave.send("articleId=" + writingIdObj.value + "&title=" + dbTitle + "&userId=" + userId + "&userName=" +
					userName + "&type=" + dbArticleType + "&nature=" + dbNature +
					"&oriAuthor=" + dbOriAuthor + "&unSerial=" + dbUnSerial + "&serialText=" + dbSerialText + "&chapterTitle=" +
					dbChapterTitle + "&chapterNum=" +
					dbChapterNum + "&chapterClass=" + dbChapterClass + "&wordNum=" + dbWordNum + "&inputFlag=" + inputFlag);
			}

			xhrSave.onreadystatechange = function() {

				if (xhrSave.readyState == 4 && xhrSave.status == 200) {
					// alert(xhrSave.responseText);
					//保存成功
					if (xhrSave.responseText >= 1) {
						writingIdObj.value = xhrSave.responseText;
						errorText.style.visibility = "visible";
						errorText.innerHTML = "<span class='success'>保存成功！</span>";
						setTimeout(function() {
							errorText.style.visibility = "hidden";
						}, 2000); //延迟2s后提示消失
					} else {
						errorText.style.visibility = "visible";
						errorText.innerHTML = "保存失败！";
						alert(xhrSave.responseText);
						// console.log(xhrSave.responseText);
						setTimeout(function() {
							errorText.style.visibility = "hidden";
						}, 2000); //延迟2s后提示消失
					}
				}
			}
		} //有内容结束
		else {
			//无内容，提示不能保存
			errorText.style.visibility = "visible";
			errorText.innerHTML = "未保存，文章没有内容哦";
			setTimeout(function() {
				errorText.style.visibility = "hidden";
			}, 2000); //延迟2s后提示消失
		}
	} //保存onclick事件结束

	//发表操作
	var releasObj = document.getElementById("release"); //发表按钮
	//用于存储发表文章信息的变量
	var releasTitle, releasArticleText, releasNature, releasOriAuthor, releasUnSerial, releasChapterTitle,
		releasSerialText, releaschapterClass, releasChapterNum, releasArticleType, releasWordNum;
	// alert(releasObj.innerHTML);
	releasObj.onclick = function() {
		errorText.style.visibility = "visible";
		var releasFlag = true; //能否发表该文章标志位
		if (articleText.value.length < 5) {
			releasFlag = false;
			errorText.innerHTML = "文章字数要>=800哦"
			setTimeout(function() {
				errorText.style.visibility = "hidden";
			}, 2000);
		} else {
			releasArticleText = articleText.value;
			releasWordNum = releasArticleText.length;
		}

		if (title.value.length <= 0) {
			releasFlag = false;
			errorTitle.innerHTML = "未输入标题呀";
			setTimeout(function() {
				errorText.style.visibility = "hidden";
			}, 2000);
		}

		//文章性质，0-原创，1-转载
		if (nature[1].checked) {
			releasNature = nature[1].value;
			if (!(oriAuthor.value)) {
				releasFlag = false;
				errorOri.innerHTML = "请注明原作者";
				setTimeout(function() {
					errorText.style.visibility = "hidden";
				}, 2000);
			}
		} else {
			if (nature[0].checked) {
				releasNature = nature[0].value;
			} else { //未做是否原创的选择
				releasFlag = false;
				errorOri.innerHTML = "请选择作品性质"
				setTimeout(function() {
					errorText.style.visibility = "hidden";
				}, 2000);
			}
		}

		//是否连载，0-非连载，1-连载
		if (unSerial[1].checked) {
			releasUnSerial = unSerial[1].value;

			if (chapterTitle.value) {
				if (chapterClass[0].checked) {
					releaschapterClass = chapterClass[0].value;
				} else {
					if (chapterClass[1].checked) {
						releaschapterClass = chapterClass[1].value;
					} else {
						releasFlag = false;
						errorSerial.innerHTML = "章节类型还没选呢";
					}
				}
			} else {
				releasFlag = false;
				errorSerial.innerHTML = "这是篇连载文章吗？";
			}
		} else {
			if (unSerial[0].checked) {
				releasUnSerial = unSerial[0].value;
			} else {
				releasFlag = false;
				errorSerial.innerHTML = "这是篇连载文章吗？";
			}
		}


		if (releasFlag) {
			var xhrReleas = new XMLHttpRequest();
			xhrReleas.open('POST', 'php/releaseArticle.php', true);
			xhrReleas.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			//单篇文章发送数据
			if (unSerial[0].checked) {
				xhrReleas.send("articleId=" + writingIdObj.value + "&title=" + title.value + "&userId=" + userId + "&userName=" +
					userName + "&type=" + articleType.value + "&nature=" + releasNature +
					"&oriAuthor=" + oriAuthor.value + "&unSerial=" + releasUnSerial + "&articleText=" + releasArticleText +
					"&wordNum=" + releasWordNum);
			}

			//连载文章发送数据
			if (unSerial[1].checked) {
				xhrReleas.send("articleId=" + writingIdObj.value + "&title=" + title.value + "&userId=" + userId + "&userName=" +
					userName + "&type=" + articleType.value + "&nature=" + releasNature +
					"&oriAuthor=" + oriAuthor.value + "&unSerial=" + releasUnSerial + "&serialText=" + releasArticleText +
					"&chapterTitle=" + chapterTitle.value + "&chapterNum=" +
					chapterNum.value + "&chapterClass=" + releaschapterClass + "&wordNum=" + releasWordNum + "&inputFlag=" +
					inputFlag);
			}

			xhrReleas.onreadystatechange = function() {
				if (xhrReleas.readyState == 4 && xhrReleas.status == 200) {
					if (xhrReleas.responseText == '1') {
						window.location.assign("../tempPages/finishReleas.html");
					} else {
						errorText.innerHTML = "未知错误，投稿失败!";
					}
				}
			}
		}
	} //release的onclick事件结束
	
	//删除文章操作
	var xhrDelete=new XMLHttpRequest();
	var deleteObj=document.getElementById("delete");//删除按钮
	deleteObj.onclick=function(){
		if(writingIdObj.value>=1){
			if(confirm("删除后无法找回，请三思呀！")){
				xhrDelete.open('GET','php/deleteArticle.php?userId='+userId+'&articleId='+writingIdObj.value+'&inputFlag='+inputFlag,true);
				xhrDelete.send();
				
				xhrDelete.onreadystatechange=function(){
					if(xhrDelete.readyState==4&&xhrDelete.status==200){
						articleText.value=xhrDelete.responseText;
						if(xhrDelete.responseText=='1'){
							location.reload();//删除成功刷新页面
						}
					}
				}
			}
		}
	}
}

window.onload = funcAjax();
