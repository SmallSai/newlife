// 搜索页面一些脚本
function searchPage(){
	// 搜索框保存上次搜索记录
	var searchInput=document.getElementById("search_input");//搜索输入框对象
	var wd=document.getElementById("hidden_wd_html").value;//页面隐藏input存储的关键字值
	
	searchInput.value=wd;
	
}

window.onload=searchPage();