<?php

$name="泰勒斯威夫特";
$str="我喜欢泰勒斯威夫特的歌";

print "name长度:".mb_strlen($name);
print "<br>后面:".strstr($str,$name);
print "<br>最终:".mb_substr(strstr($str,$name),mb_strlen($name));//会包括索引为5的字符
?>