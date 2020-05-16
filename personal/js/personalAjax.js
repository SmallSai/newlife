// 加载用户信息脚本，检查打开个人页面与自己userId是否匹配
function addUserInfo(){
	var xhrLoadUser=new XMLHttpRequest();
	xhrLoadUser.open('GET','../php/loadUserInfo.php',true);
	xhrLoadUser.send();
	
	xhrLoadUser.onreadystatechange=function(){
		if(xhrLoadUser.readyState==4&&xhrLoadUser.status==200){
			if(xhrLoadUser.responseText=='0'||xhrLoadUser.responseText=='1'){
				
			}
			else{
				//获取用户ID
				var userId=JSON.parse(xhrLoadUser.responseText)['userId'];
				
				//设置头像
				var userHeadCont=document.getElementById("user_head_cont");
				var userHeadIma=document.getElementById("user_head");
				userHeadIma.setAttribute("src","../userFile/"+userId+"/headPortrait.jpg");
				
				var loginCont=document.getElementById("login_on_cont");
				loginCont.style.display="none";
				userHeadCont.style.display="block";
				
				var pid=document.getElementById("hidden_inp_pid").value;//页面主人userId
				if(pid==userId){
					// 打开的是自己页面，可以进入修改信息窗口
					console.log("pid:"+pid);
					document.getElementById("change_info_cont").onmouseover=function(){
						var changInfoObj=document.getElementById("change_info");
						changInfoObj.style.display="block";			
					}
				}
			}
		}
	}
}

window.onload=addUserInfo();