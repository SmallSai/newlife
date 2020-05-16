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
				var userName=userObj['userName'];
				var sex=userObj['sex'];
				var old=userObj['old'];
				var place=userObj['place'];
				var sign=userObj['sign'];
				
				var username=document.getElementById("user_name");
				username.value=userName;
				
				var userold=document.getElementById("user_old");
				userold.value=old;
				
				var userplace=document.getElementById("user_place");
				userplace.value=place;
				
				var usergx=document.getElementById("user_gx");
				usergx.value=sign;
				
				var usex=document.getElementsByName("sex");
				for(var i=0;i<3;i++){
					if(name[i].value==sex)
					name[i].checked=true;
				}
				
								
				//设置头像
				var userHeadCont=document.getElementById("user_head_cont");
				var userHeadIma=document.getElementById("user_head");
				userHeadIma.setAttribute("src","../userFile/"+userId+"/headPortrait.jpg");
				
				var loginCont=document.getElementById("login_on_cont");
				loginCont.style.display="none";
				userHeadCont.style.display="block";
				
				
				//保存检测
				var user_sub=document.getElementById("sub");
				user_sub.onclick=function(){
					
					if (username.value.indexOf(" ") == -1||username.value.length==0) {
					    alert("昵称为空或者存在空格,请重新输入");
						} 
						else{
					var xhrusername=new XMLHttpRequest();
					xhrusername.open('get','php/userNameExistCheck.php?uid'+userId+'&userName='+username.value,true);
					xhrusername.send();
					xhrusername.onreadystatechange=function(){
						if(xhrusername.readyState==4&&xhrusername.status==200){
							if(xhrusername.responseText=="1"){
								alert("该昵称已存在,请重新输入");}
												
							else  {
									var sexaa;
										for(var i=0;i<3;i++){
											if(name[i].checked==true)
												{
													if(i==0) sexaa="0";
													else if(i==1) sexaa="1";
													else sexaa="2";
												}
															}
							
						xhrusername.open('get','php/saveChange.php?userName='+username.value+'&old='+userold.value+'&place='+userplace.value+'&sign='+usergx.value+'&sex='+sexaa+'&uid='+userId,true);
						xhrusername.send();
					    xhrusername.onreadystatechange=function(){
					    	if(xhrusername.readyState==4&&xhrusername.status==200){
					    		if(xhrusername.responseText=="0")
					    		{alert("保存失败");}
								if(xhrusername.responseText=="1")
								{alert("保存成功");}
								if(xhrusername.responseText=="2")
								{alert("存在昵称,保存失败");}
								
																				}
																}
								}
					
					}
				}
				
			}
			
		}
	}
}
}
}

window.onload=changeInfo();