<?php
// 获取筛选器筛选出的文章
include("../../php/dbConnect.php");

// 获取相应筛选代码
$aFilt=$_GET['aFilt'];//0-由新到旧，1-由旧到新，2-按点赞量多到少
$bFilt=$_GET['bFilt'];//0-全部，1-单篇，2-连载
$cFilt=mysqli_real_escape_string($dbc,$_GET['cFilt']);//按分类值，0-全部，1-青春等

// 查询语句
$query="";

if($aFilt==0){
	// a0
	if($bFilt==0){
		// a0 b0
		if($cFilt==0){
			// a0 b0 c0
			$query="SELECT * FROM article ORDER BY date DESC";
		}
		else{
			// a0 b0 cn
			$query="SELECT * FROM article WHERE type='".$cFilt."' ORDER BY date DESC";
		}
	}
	else{
		if($bFilt==1){
			// a0 b1
			if($cFilt==0){
				// a0 b1 c0
				$query="SELECT * FROM article WHERE unSerial='0' ORDER BY date DESC";
			}
			else{
				// a0 b1 cn
				$query="SELECT * FROM article WHERE type='".$cFilt."' AND unSerial='0' ORDER BY date DESC";
			}
		}
		else{
			if($bFilt==2){
				// a0 b2
				if($cFilt==0){
					// a0 b2 c0
					$query="SELECT * FROM article WHERE unSerial='1' ORDER BY date DESC";
				}
				else{
					// a0 b2 cn
					$query="SELECT * FROM article WHERE type='".$cFilt."' AND unSerial='1' ORDER BY date DESC";
				}
			}
		}
	}
}
else{
	if($aFilt==1){
		// a1
		if($bFilt==0){
			// a1 b0
			if($cFilt==0){
				// a1 b0 c0
				$query="SELECT * FROM article ORDER BY date";
			}
			else{
				// a1 b0 cn
				$query="SELECT * FROM article WHERE type='".$cFilt."' ORDER BY date";
			}
		}
		else{
			if($bFilt==1){
				// a1 b1
				if($cFilt==0){
					// a1 b1 c0
					$query="SELECT * FROM article WHERE unSerial='0' ORDER BY date";
				}
				else{
					// a1 b1 cn
					$query="SELECT * FROM article WHERE type='".$cFilt."' AND unSerial='0' ORDER BY date";
				}
			}
			else{
				if($bFilt==2){
					// a1 b2
					if($cFilt==0){
						// a1 b2 c0
						$query="SELECT * FROM article WHERE unSerial='1' ORDER BY date";
					}
					else{
						// a1 b2 cn
						$query="SELECT * FROM article WHERE type='".$cFilt."' AND unSerial='1' ORDER BY date";
					}
				}
			}
		}
	}
	else{
		if($aFilt==2){
			// a2
			if($bFilt==0){
				// a2 b0
				if($cFilt==0){
					// a2 b0 c0
					$query="SELECT * FROM article ORDER BY upNum DESC";
				}
				else{
					// a2 b0 cn
					$query="SELECT * FROM article WHERE type='".$cFilt."' ORDER BY upNum DESC";
				}
			}
			else{
				if($bFilt==1){
					// a2 b1
					if($cFilt==0){
						// a2 b1 c0
						$query="SELECT * FROM article WHERE unSerial='0' ORDER BY upNum DESC";
					}
					else{
						// a2 b1 cn
						$query="SELECT * FROM article WHERE type='".$cFilt."' AND unSerial='0' ORDER BY upNum DESC";
					}
				}
				else{
					if($bFilt==2){
						// a2 b2
						if($cFilt==0){
							// a2 b2 c0
							$query="SELECT * FROM article WHERE unSerial='1' ORDER BY upNum DESC";
						}
						else{
							// a2 b2 cn
							$query="SELECT * FROM article WHERE type='".$cFilt."' AND unSerial='1' ORDER BY upNum DESC";
						}
					}
				}
			}
		}
	}
}

// print "A:".$aFilt."--B:".$bFilt."--C:".$cFilt."--";
// print "语句:".$query."---";
$result=mysqli_query($dbc,$query);
$resutNum=mysqli_num_rows($result);

if($resutNum>0){
	// 有查询结果
	for($i=0;$i<$resutNum;$i++){
		$row=mysqli_fetch_assoc($result);
		print_r(json_encode($row));
		
		if($i<$resutNum-1){
			print ',';
		}
	}
}
else{
	// 无查询结果
	print 0;
}


include("../../php/dbClose.php");
?>