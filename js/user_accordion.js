// JavaScript Document
/*var title1=document.getElementById("article_title");
var title2=document.getElementById("favorite_title");
var title3=document.getElementById("follow_title");
var title4=document.getElementById("draft_title");*/

$(function(){
	var title1=$("#article_title");
	var title2=$("#favorite_title");
	var title3=$("#follow_title");
	var title4=$("#draft_title");
	
	var frame1=$("#article_frame");
	var frame2=$("#favorite_frame");
	var frame3=$("#follow_frame");
	var frame4=$("#draft_frame");
	
	op=frame1;
	title1.click(function(){
		if(op==frame1){
			frame1.slideToggle();
		}
		else{
			op.slideUp(function(){frame1.slideToggle();});
		}
		op=frame1;
		});
		
	title2.click(function(){
		if(op==frame2){
			frame2.slideToggle();
		}
		else{
			op.slideUp(function(){frame2.slideToggle();});
		}
		op=frame2;
		});
			
	title3.click(function(){
		if(op==frame3){
			frame3.slideToggle();
		}
		else{
			op.slideUp(function(){frame3.slideToggle();});
		}
		op=frame3;
		});
	
	title4.click(function(){
		if(op==frame4){
			frame4.slideToggle();
		}
		else{
			op.slideUp(function(){frame4.slideToggle();});
		}
		op=frame4;
		});
});