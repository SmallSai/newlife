// 用户退出登录时删除登录信息cookie
function deleteCookie(){
	var signOutObj=document.getElementById("sign_out_operation");
	
	signOutObj.onclick=function(){
		var xhrDeleteCookie=new XMLHttpRequest();
		xhrDeleteCookie.open('GET','php/deleteCookie.php',true);
		xhrDeleteCookie.send();
		
		xhrDeleteCookie.onreadystatechange=function(){
			if(xhrDeleteCookie.readyState==4&&xhrDeleteCookie.status==200){
				window.location.reload();
			}
		}
	}
}

window.onload=deleteCookie();