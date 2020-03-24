$(function(){
	
	/*-------草稿处展开---------*/
	var serial_title=$("#serial");
	var single_title=$("#single");
	
	var serial_frame=$("#serial_draft_frame");
	var single_frame=$("#single_draft_frame");
	
	var open="start";
	serial_title.click(function(){
		
		/*---背景样式---*/
		// single_title.css({"background":"none","border-left":"none"});
		// serial_title.css({"background-color":"#126a58","border-left":"solid 5px"});
		if(open=="start"||open==serial_frame){
			serial_frame.slideToggle();
			open=serial_frame;
		}
		else{
			open.slideUp("fast",function(){
				serial_frame.slideToggle();
				open=serial_frame;
			});	
		}
	});
	
	single_title.click(function(){
		
		/*---背景样式---*/
		// serial_title.css({"background":"none","border-left":"none"});
		// single_title.css({"background-color":"#126a58","border-left":"solid 5px"});
		
		if(open=="start"||open==single_frame){
			single_frame.slideToggle();
			open=single_frame;
		}
		else{
			open.slideUp("fast",function(){
				single_frame.slideToggle();
				open=single_frame;
			});
		}
	});
	
	
	/*-------文章选择按钮样式-------*/
	
	/*---------单选按钮---------*/
	var org_rad=$("#org_radio");
	var copy_rad=$("#copy_radio");
	var single_rad=$("#single_radio");
	var serial_rad=$("#serial_radio");
	var preface_rad=$("#preface_radio");
	var text_rad=$("#text_radio");
	var end_rad=$("#end_radio");
	
	/*--------span按钮---------*/
	var org_sp=$("#org_span");
	var copy_sp=$("#copy_span");
	var single_sp=$("#single_span");
	var serial_sp=$("#serial_span");
	var preface_sp=$("#preface_span");
	var text_sp=$("#text_span");
	var end_sp=$("#end_span");
	
	/*-------触发弹出的信息框-------*/
	var org_author=$("#original_author_cont");
	var serial_info=$("#serial_info_cont");
	/*--------指针点击选择事件----------*/
	org_rad.click(function(){
		org_author.slideUp();
		org_sp.css({"background-color":"#ff557f","color": "#FFFFFF","border": "solid 1px #ff557f"});
		copy_sp.css({"background":"none","color": "#ff557f","border": "solid 1px"});
	});
	
	copy_rad.click(function(){
		org_author.slideDown();
		org_author.css({"display":"flex"});
		org_sp.css({"background":"none","color": "#ff557f","border": "solid 1px"});
		copy_sp.css({"background-color":"#ff557f","color": "#FFFFFF","border": "solid 1px #ff557f"});
	});
	
	single_rad.click(function(){
		serial_info.slideUp();
		single_sp.css({"background-color":"#ff557f","color": "#FFFFFF","border": "solid 1px #ff557f"});
		serial_sp.css({"background":"none","color": "#ff557f","border": "solid 1px"});
	});
	
	serial_rad.click(function(){
		serial_info.slideDown();
		single_sp.css({"background":"none","color": "#ff557f","border": "solid 1px"});
		serial_sp.css({"background-color":"#ff557f","color": "#FFFFFF","border": "solid 1px #ff557f"});
	});
	
	preface_rad.click(function(){
		preface_sp.css({"background-color":"#ff557f","color": "#FFFFFF","border": "solid 1px #ff557f"});
		text_sp.css({"background":"none","color": "#ff557f","border": "solid 1px"});
		end_sp.css({"background":"none","color": "#ff557f","border": "solid 1px"});
	});
	
	text_rad.click(function(){
		
		text_sp.css({"background-color":"#ff557f","color": "#FFFFFF","border": "solid 1px #ff557f"});
		preface_sp.css({"background":"none","color": "#ff557f","border": "solid 1px"});
		end_sp.css({"background":"none","color": "#ff557f","border": "solid 1px"});
	});
	
	end_rad.click(function(){
		end_sp.css({"background-color":"#ff557f","color": "#FFFFFF","border": "solid 1px #ff557f"});
		text_sp.css({"background":"none","color": "#ff557f","border": "solid 1px"});
		preface_sp.css({"background":"none","color": "#ff557f","border": "solid 1px"});
	});
});