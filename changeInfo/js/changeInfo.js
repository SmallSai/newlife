function changeInfo(){
	//修改个人信息脚本

	var xhrLoadUser=new XMLHttpRequest();
	xhrLoadUser.open('GET','../php/loadUserInfo.php',true);
	xhrLoadUser.send();
	
	xhrLoadUser.onreadystatechange=function(){
		if(xhrLoadUser.readyState==4&&xhrLoadUser.status==200){
			if(xhrLoadUser.responseText=='0'||xhrLoadUser.responseText=='1'){
				// cookie信息不对，页面转到首页
				
			}
			else{
				//获取用户对象
				var userObj=JSON.parse(xhrLoadUser.responseText);
				
				// 获取用户信息
				var userId=userObj['userId'];
				
				//设置头像
				var userHeadCont=document.getElementById("user_head_cont");
				var userHeadIma=document.getElementById("user_head");
				userHeadIma.setAttribute("src","../userFile/"+userId+"/headPortrait.jpg");
				
				var loginCont=document.getElementById("login_on_cont");
				loginCont.style.display="none";
				userHeadCont.style.display="block";
				
				
			}
		}
	}
}

window.onload=changeInfo();