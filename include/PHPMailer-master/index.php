
<?php
 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';
class Email{
 
    public static function sendEmail($email,$code){
        $mail = new PHPMailer(true);
        try {
 
            //使用STMP服务
            $mail->isSMTP();
 
            //这里使用我们第二步设置的stmp服务地址
            $mail->Host = "smtp.163.com";
 
            //设置是否进行权限校验
            $mail->SMTPAuth = true;
 
            //第二步中登录网易邮箱的账号
            $mail->Username = "18023672372@163.com";
 
            //客户端授权密码，注意不是登录密码
            $mail->Password = "asd123";
 
            //使用ssl协议
            $mail->SMTPSecure = 'ssl';
 
            //端口设置
            $mail->Port = 465;
 
            //字符集设置，防止中文乱码
            $mail->CharSet= "utf-8";
 
            //设置邮箱的来源，邮箱与$mail->Username一致，名称随意
            $mail->setFrom("18023672372@163.com", "陈独秀");
 
            //设置收件的邮箱地址
            $mail->addAddress($email);
 
            //设置回复地址，一般与来源保持一直
            $mail->addReplyTo("18023672372@163.com", "陈独秀");
 
            $mail->isHTML(true);
            //标题
            $mail->Subject = '欢迎注册新生文学';
            //正文
            $mail->Body    = '大人，您的验证码为：'.$code.'，输入它,您即可成为新生代文人的一员。（若非本人操作，请无视此邮件）';
            $mail->send();
            
            //return array('errCode'=>0,'msg'=>'ok');
        } catch (Exception $e) { //邮件未发送成功
            echo "error";
            //return array('errCode'=>-1,'msg'=>$mail->ErrorInfo);
        }
    }
}

?>
