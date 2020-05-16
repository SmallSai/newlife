// 加载个人信息脚本
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
				
				//xheusername.open('GET','php/userNameExistCheck.php?uid='+userId+'&userName='+userName,true);
				
				// 检查查询出来的每个作者是否有关注，以及关注该作者的操作
				var followObj=document.getElementsByClassName("search_follow_mark");
				followObjNum=follow.length;
				var followUid='';//被关注作者的uid
				
				// 查询是否关注的AJAX对象
				var xhrFollowCheck=new XMLHttpRequest();
				
				for(var i=0;i<followObjNum;i++){
					followUid=this.getElementsByClassName("follow_hidden_inp")[0].value;
					
					
				}
			}
		}
	}
}

window.onload=addUserInfo();