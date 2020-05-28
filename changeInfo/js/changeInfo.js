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
				
				// 各输入框对象
				var username=document.getElementById("user_name");				
				var userold=document.getElementById("user_old");	
				var userplace=document.getElementById("user_place");		
				var usergx=document.getElementById("user_gx");	
				var usex=document.getElementsByName("sex");
				
				// 保存按钮
				var saveBut=document.getElementsByClassName("m_buttton")[0];
				saveBut.onclick=function(){
					var getName=username.value;
					if(getName){
						var getOld=userold.value;
						var getPlace='';
						if(!userplace.value){
							getPlace='保密'
						}
						else{
							getPlace=userplace.value;
						}
						
						var getSign='';
						if(!usergx.value){
							getSign='该用户没有个性签名'
						}
						else{
							getSign=usergx.value;
						}
						
						var getSex='';
						for(var i=0;i<3;i++){
							if(usex[i].checked){
								getSex=usex[i].value;
							}
						}
						
						var xhrSaveInfo=new XMLHttpRequest();
						xhrSaveInfo.open('GET','php/saveChange.php?userId='+userId+'&userName='+getName+'&sex='+getSex+'&place='+getPlace+'&sign='+getSign+'&old='+getOld,true);
						
						
						xhrSaveInfo.send();
						xhrSaveInfo.onreadystatechange=function(){
							
							if(xhrSaveInfo.readyState==4&&xhrSaveInfo.status==200){
								console.log('php/saveChange.php?userId='+userId+'&userName='+getName+'&sex='+getSex+'&place='+getPlace+'&sign='+getSign+'&old='+getOld);
								console.log(xhrSaveInfo.responseText);
								if(xhrSaveInfo.responseText=='1'||xhrSaveInfo.responseText=='0'){
									// 成功修改
									
									alert("修改信息成功！");
									//location.reload();
								}
								else{
									if(xhrSaveInfo.responseText=='2'){
										// 昵称重复
										alert("昵称与他人重复了。")
									}
								}
							}
						}
					}
					else{
						// 空名
						alert("昵称不能为空哦");
					}
					
				}
			}
		}
	}
}
window.onload=changeInfo();