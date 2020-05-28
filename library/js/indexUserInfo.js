// 检查用户是否登录,以及改变登录与用户名字显示
function userInfo(){
	var xhrLoadUser=new XMLHttpRequest();
	xhrLoadUser.open('GET','../php/loadUserInfo.php',true);
	xhrLoadUser.send();
	
	xhrLoadUser.onreadystatechange=function(){
		if(xhrLoadUser.readyState==4&&xhrLoadUser.status==200){
			if(xhrLoadUser.responseText=='0'||xhrLoadUser.responseText=='1'){
				
			}
			else{
				//获取用户ID
				var userObj=JSON.parse(xhrLoadUser.responseText);
				var userName=userObj['userName'];
				var userId=userObj['userId'];
				
				//设置名字
				var userHeadCont=document.getElementById("user_href");
				userHeadCont.innerHTML="你好，"+userName;
				userHeadCont.setAttribute("href","../personal/personal.php?pid="+userId);
				
				var loginCont=document.getElementById("login_on_cont");
				loginCont.style.display="none";
				userHeadCont.style.display="block";
			}
		}
	}
}

window.onload=userInfo();