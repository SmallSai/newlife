//注册页面
function funcRegister(){
	//标记各信息输入合法性
	var emailOK=false;
	var passOk=false;
	//发送验证码按钮样式
	var verifyBut = document.getElementById("verify_but");
	verifyBut.style.cursor = "not-allowed";
	verifyBut.style.background = "#aaaaaa";
	
	//验证码输入框对象
	var verifyObj=document.getElementById("inp_verify_code");
	var errorVerifyCode = document.getElementById("error_verify_code");

	//邮箱输入验证
	var inpEmail = document.getElementById("inp_email"); //邮箱input对象
	var mailBox = document.getElementsByClassName("mailbox")[0];
	var errorEmail = document.getElementById("error_email");

	//请求发送验证码脚本的AJAX对象
	var xhrSendVerifyCode = new XMLHttpRequest();
	
	//邮箱输入失去焦点
	inpEmail.onblur = function() {
		var inpEmailText = inpEmail.value; //输入的邮箱文本值
		var inpEmailLength = inpEmailText.length; //邮箱文本长度

		//输入的邮箱小于12个字符，且邮箱没有@或者@在第一个或者在最后都是错误的邮箱
		if ((inpEmailLength < 12 || inpEmailText.indexOf("@") <= 0 || inpEmailText.indexOf("@") == (inpEmailText.length - 1)) &&
			inpEmailLength > 0) {
			// alert(inpEmailLength);
			emailOK=false;
			registerBut.setAttribute("disabled","disabled");
			registerBut.style.cursor="not-allowed";
			mailBox.style.boxShadow = "0 0 5px #ff0000";
			errorEmail.innerHTML = "错误的邮箱";

			//验证码按钮不可按
			verifyBut.style.cursor = "not-allowed";
			verifyBut.style.background = "#aaaaaa";
		} else {
			//清除了输入的邮箱则无红色警报
			if (inpEmailLength == 0) {
				emailOK=false;
				registerBut.setAttribute("disabled","disabled");
				registerBut.style.cursor="not-allowed";
				mailBox.style.boxShadow = "none";
				errorEmail.innerHTML = "";

				//验证码按钮不可按
				verifyBut.style.cursor = "not-allowed";
				verifyBut.style.background = "#aaaaaa";
			} else { //正确的邮箱
				//创建AJAX对象，查找数据库邮箱是重复
				var xhrEmailExist = new XMLHttpRequest();
				//php文件以html文档为起点做相对路径
				xhrEmailExist.open('GET', 'php/emailExistCheck.php?email=' + inpEmailText, true);
				xhrEmailExist.send();

				xhrEmailExist.onreadystatechange = function() {
					if (xhrEmailExist.readyState == 4 && xhrEmailExist.status == 200) {
						
						//数据库存在该邮箱记录
						if (xhrEmailExist.responseText == 1) {
							emailOK=false;
							registerBut.setAttribute("disabled","disabled");
							registerBut.style.cursor="not-allowed";
							mailBox.style.boxShadow = "0 0 5px #ff0000";
							errorEmail.innerHTML = "邮箱已注册";

							//验证码按钮不可按
							verifyBut.style.cursor = "not-allowed";
							verifyBut.style.background = "#aaaaaa";
						} else { //不存在该邮箱，可以注册
							emailOK=true;
							mailBox.style.boxShadow = "none";
							errorEmail.innerHTML = "";
							email = inpEmailText; //将收到验证码的邮箱存储起来

							//发送验证码样式恢复
							verifyBut.style.cursor = "pointer";
							verifyBut.style.background = "#43ba25"
							
							//此时发送验证码按钮点击事件可以触发
							verifyBut.onclick = function() {
								//点击后禁止触发onclick事件
								verifyBut.setAttribute("disabled","disabled");
								verifyBut.style.cursor = "not-allowed";
								verifyBut.style.background="#AAAAAA";
								verifyBut.innerHTML="sending";
								xhrSendVerifyCode.open('GET', 'php/sendVerificationCode.php?email=' + email, true);
								xhrSendVerifyCode.send();		
							}
							
							//验证输入的密码是否合法
							var verifyText=verifyObj.value;
							if(passOk&&verifyText){
								registerBut.removeAttribute("disabled");
								registerBut.style.cursor="pointer";
							}
						}
					}
				}
			}
		}
	} //邮箱输入失去焦点事件结束


	xhrSendVerifyCode.onreadystatechange = function() {
		if (xhrSendVerifyCode.readyState == 4 && xhrSendVerifyCode.status == 200) {
			//获取错误提示框对象
			var sendTime = new Date().getTime(); //返回从 1970 年 1 月 1 日至今的毫秒数，单击发送的时间
			
			//按钮倒计时显示函数
			function countDown(end) {
				verifyBut.innerHTML = Math.ceil((end - new Date().getTime())/1000);
				// alert("endT:"+end+"      nowT:"+new Date().getTime()+"   显示："+Math.ceil((end - new Date().getTime())/1000));
			}

			if (xhrSendVerifyCode.responseText == "error") { //邮件未发送成功
				errorVerifyCode.innerHTML = "邮箱错误！"
				verifyBut.style.cursor = "not-allowed";
				//计时器，未成功计时10s
				var endTime = sendTime + 10000;
				var myTimer = setInterval(countDown, 1000, endTime);//函数不要带括号，否则是直接执行！，参数写在后面即可

				setTimeout(function() { //倒计时结束，恢复样式
					clearInterval(myTimer);
					verifyBut.innerHTML = "发送验证码";
					verifyBut.style.background = "#43ba25";
					verifyBut.style.cursor = "pointer";
					verifyBut.removeAttribute("disabled");
					errorVerifyCode.innerHTML = "";
				}, 10000);
			} else {
				errorVerifyCode.innerHTML = "成功发送";
				verifyBut.style.cursor = "not-allowed";
				//计时器，发送成功计时60s
				var endTime = sendTime + 60000;
				
				var myTimer = setInterval(countDown, 1000, endTime);//函数不要带括号，否则是直接执行！，参数写在后面即可
				setTimeout(function() { //倒计时结束，恢复样式
					clearInterval(myTimer);
					verifyBut.innerHTML = "发送验证码";
					verifyBut.style.background = "#43ba25";
					verifyBut.style.cursor = "pointer";
					verifyBut.removeAttribute("disabled");
				}, 60000);
			}
		}
	} //xhrSendVerifyCode.onreadystatechange事件
	
	
	//单击注册后的处理
	var registerBut=document.getElementById("register_but");
	registerBut.setAttribute("disabled","disabled");
	registerBut.style.cursor="not-allowed";
	
	registerBut.onclick=function(){
		
		//最后获取，防止用户输入后发送验证码又改变邮箱
		var emailRegister=inpEmail.value;
		var verifyRegister=verifyObj.value;
		var passRegister=document.getElementById("inp_password").value;
		
		var xhrRegister=new XMLHttpRequest();
		xhrRegister.open("POST","php/submitRegister.php",true);
		xhrRegister.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhrRegister.send("randCode="+verifyRegister+"&email="+emailRegister+"&password="+passRegister);
		
		xhrRegister.onreadystatechange=function(){
			if(xhrRegister.readyState==4&&xhrRegister.status==200){
				if(xhrRegister.responseText!=1){ //验证码不正确
					errorVerifyCode.innerHTML="验证码错误";
					alert(xhrRegister.responseText+"不正确结果");
				}
				else{ //一切正确，可以登录
					errorVerifyCode.innerHTML="";
					window.location.assign("../index.html");//以html为根路径
				}
			}
		}
	}
	
	//密码输入框处理
	var passBox=document.getElementsByClassName("form2")[0];//密码整体盒子
	var inpPassObj=document.getElementById("inp_password");//密码输入框对象
	var errorPassword=document.getElementById("error_password");
	inpPassObj.onkeyup=function(){
		var passLength=this.value.length;//密码长度
		var passText=this.value;
		if(passText.indexOf(" ")!=-1){ //不能有空格
			passOk=false;
			registerBut.setAttribute("disabled","disabled");
			registerBut.style.cursor="not-allowed";
			passBox.style.boxShadow = "0 0 5px #ff0000";
			errorPassword.innerHTML="不能有空格"
		}
		else{
			if(passLength>0&&passLength<6){ //长度少于6个字符
				passOk=false;
				registerBut.setAttribute("disabled","disabled");
				registerBut.style.cursor="not-allowed";
				passBox.style.boxShadow = "0 0 5px #ff0000";
				errorPassword.innerHTML="长度要>=6"
			}
			else{
				if(passLength==0){
					passOk=false;
					registerBut.setAttribute("disabled","disabled");
					registerBut.style.cursor="not-allowed";
					passBox.style.boxShadow ="none";
					errorPassword.innerHTML="";
				}
				else{ //密码输入合法
					errorPassword.innerHTML="";
					passOk=true;
					var verifyText=verifyObj.value;
					if(emailOK&&verifyText){
						registerBut.removeAttribute("disabled");
						registerBut.style.cursor="pointer";
					}
				}
			}
		}
	}
}//window.onload事件

window.onload=funcRegister();
