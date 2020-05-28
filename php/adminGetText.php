<?php
include("dbConnect.php");

if(isset($_GET['aid'])){
	$query="SELECT articleText FROM article WHERE articleId=".$_GET['aid'];
	$result=mysqli_query($dbc,$query);
	print mysqli_error($dbc);
	print mysqli_fetch_assoc($result)['articleText'];
}

if(isset($_GET['cid'])){
	$query="SELECT serialText FROM serial WHERE chapterId=".$_GET['cid'];
	//print $query;
	$result=mysqli_query($dbc,$query);
	print mysqli_fetch_assoc($result)['serialText'];
}

include("dbClose.php");
?>