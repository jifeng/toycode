## 如何将页脚固定在页面底部

正常情况下如图：

![固定页脚在页面底部](http://ww3.sinaimg.cn/large/7013266egw1e3cfhjmj3oj.jpg)

第一种方法：

----------

HTML CODE:

    <div id="container">
        <div id="header">Header Section</div>
      <div id="body" class="clearfix">
        页面容容部分
      </div>
      <div id="footer">Footer Section</div>
  </div>
CSS CODE:

    html,body {
    margin: 0;
    padding:0;
    height: 100%;
  }
  #container {
    min-height:100%;
    height: auto !important;
    height: 100%; /*IE6不识别min-height*/
    position: relative;
  }
  #body {
    width: 960px;
    margin: 0 auto;
    padding-bottom: 60px;/*等于footer的高度*/
  }
  #footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;/*脚部的高度*/
    clear:both;
  }

优点:
  结构简单清晰，无需js和任何hack能实现各浏览器下的兼容，同时在ipad、iphone下也可以正常运行

缺点：

1. 需要给div#footer容器设置一个固定高度
2. 需要将div#page容器的padding-bottom设置大于等于div#footer的高度

参考: http://matthewjamestaylor.com/blog/keeping-footers-at-the-bottom-of-the-page
DEMO: http://matthewjamestaylor.com/blog/bottom-footer-demo.htm

----------

第二种方法：

利用footer的margin-top负值来实现footer永远固定在页面的底部效果

HTML CODE：
    
  <div id="container">
    <div id="header">Header Section</div>
    <div id="page">Main Content</div>
  </div>  
    <div id="footer">footer</div>

CSS CODE:

    html,body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #container {
    min-height: 100%;
    height: auto !important;
    height: 100%;
  }
  #footer {
    position: relative;
    margin-top: -60px;/*等于footer的高度*/
    height: 60px;
    clear:both;
  }
  #page {
    padding-bottom: 60px;/*高度等于footer的高度*/
  }

优点:

  同 方法一

缺点：

  要给footer设置固定值，因此无法让footer部分自适应高度

参考： 

1. http://www.cssstickyfooter.com/
2. http://www.lwis.net/journal/2008/02/08/pure-css-sticky-footer/
      
DEMO： http://www.lwis.net/profile/CSS/sticky-footer.html     

----------

第三种方法：
  
HTML CODE：

    <div id="container">
      <div id="page"> Content </div>
      <div class="push"> 空标签</div>
    </div>
  <div id="footer">Footer</div>

CSS CODE: 

    html,body{
    height: 100%;
    margin:0;
    padding:0;
  }
  #container {
    min-height: 100%;
    height: auto !important;
    height: 100%;
    margin: 0 auto -60px;/*margin-bottom的负值等于footer高度*/
  }
  .push, #footer {
    height: 60px;
    clear:both;
  }

优点：

  简单明了，易于理解，兼容所有浏览器。

缺点：

1.较之前面的两种方法，多使用了一个div.push容器

2.同样此方法限制了footer部分高度，无法达到自适应高度效果。

参考： 
http://ryanfait.com/resources/footer-stick-to-bottom-of-page/

DEMO： http://ryanfait.com/sticky-footer/

其他方法：借助JS脚本

备注：这份文档来自我的同事田超强在内部做的一次技术分享
