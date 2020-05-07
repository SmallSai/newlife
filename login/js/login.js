// 登录表单信息约束
function funcLogin(){
	
	var loginAccountObj=document.getElementById("login_account");//登录账号对象
	var loginPassObj=document.getElementById("login_password");//登录密码对象
	var loginButObj=document.getElementById("login_button");//登录按钮对象
	var passBox=document.getElementsByClassName("form2")[0];//密码输入整体框
	
	var inpAccount,inpPass;
	var errorPass=document.getElementById("error_password_login");//密码错误提示框
	
	//账号输入
	loginAccountObj.onblur=function(){
		var loginAccountLength=loginAccountObj.value.length;//账号输入长度
		if(loginAccountLength>0){
			inpAccount=loginAccountObj.value;
			loginButObj.setAttribute("disabled","disabled");
			if(inpPass){
				loginButObj.removeAttribute("disabled");
			}
		}
	}
	
	//密码输入
	loginPassObj.onkeyup=function(){
		
		var passLength=loginPassObj.value.length;
		
		if(passLength<6&&passLength>0){
			loginButObj.setAttribute("disabled","disabled");
			passBox.style.boxShadow="0 0 5px #ff0000";
			
		}
		if(passLength==0){
			loginButObj.setAttribute("disabled","disabled");
			passBox.style.boxShadow="none";
			
		}
		if(passLength>=6){ //输入了正确长度的密码
			inpPass=loginPassObj.value;
			passBox.style.boxShadow="none";
			loginButObj.setAttribute("disabled","disabled");
			if(inpAccount){
				loginButObj.removeAttribute("disabled");
			}
		}
		
	}
	
	loginButObj.setAttribute("disabled","disabled");
	//登录单击事件
	loginButObj.onclick=function(){
		var xhrLogin=new XMLHttpRequest();
		xhrLogin.open("POST","php/login.php",true);
		xhrLogin.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhrLogin.send("account="+inpAccount+"&password="+inpPass);
		
		xhrLogin.onreadystatechange=function(){
			if(xhrLogin.readyState==4&&xhrLogin.status==200){
				if(xhrLogin.responseText=='0'||xhrLogin.responseText=='1'){
					errorPass.innerHTML="密码错误";
				}
				if(xhrLogin.responseText=='2'){
					window.location.assign("../index.html");
				}
			}
		}
	}
}

window.onload=funcLogin();