// 加载用户信息脚本
function addUserInfo(){
	var xhrLoadUser=new XMLHttpRequest();
		
	xhrLoadUser.open('GET','php/loadUserInfo.php',true);
	xhrLoadUser.send();
	
	xhrLoadUser.onreadystatechange=function(){
		if(xhrLoadUser.readyState==4&&xhrLoadUser.status==200){
			// console.log(xhrLoadUser.responseText);
			if(xhrLoadUser.responseText=='0'||xhrLoadUser.responseText=='1'){
				
			}
			else{
				//获取用户ID
				var userId=JSON.parse(xhrLoadUser.responseText)['userId'];
				
				//设置头像
				var userHeadCont=document.getElementById("user_head_cont");
				var userHeadIma=document.getElementById("user_head");
				userHeadIma.setAttribute("src","userFile/"+userId+"/headPortrait.jpg");
				
				// 设置头部我的空间链接
				var userPageHref=document.getElementById("user_page_href");
				userPageHref.setAttribute("href","personal/personal.php?pid="+userId);
				
				// 设置容器可以显示
				var loginCont=document.getElementById("login_on_cont");
				loginCont.style.display="none";
				userHeadCont.style.display="block";
				
			}
		}
	}
}

window.onload=addUserInfo();