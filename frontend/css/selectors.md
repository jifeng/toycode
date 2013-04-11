# CSS Selectors （整合css3 selectors）

## 属性选择器 (> IE6)

### E[foo]

包含有foo属性的dom

### E[foo="bar"]

foo属性为bar的dom

### E[foo~="bar"]

含有foo属性，并且foo属性的值是一个用空格符分割的列表，类似class，找出其中包含bar的dom

### E[foo^="bar"]

含有foo属性, 并且是以bar开始的

### E[foo$="bar"]

同上，是以bar结束

### E[foo*="bar"]

同上，属性中包含字符串 bar，是否是包含了就行

### E[foo|="en"]

会选择属性等于 en 或以 en- 开头的所有元素， 例如  img[src|="figure"]  可以查出那些图片的文件名都形如 figure-1.jpg 和 figure-2.jpg的img

## 结构性伪类（> IE8）

### :root 

root选择器将样式绑定到页面的根元素中。所谓根元素，是指位于文档树中最顶层结构的元素，在HTML页面中就是指包含着整个页面的“html”部分

注：使用时直接写:root可以定位到html，但前面加elem的话就无法定位，例如div.parent:root就无法定位到html

### E:nth-child(n)

E的父节点下的第几个E子节点（以1开始）， 可以使用li:nth-child(odd)和li:nth-child(even)来进行奇偶控制，也可以使用li:nth-child(4n+1)进行循环设置

如果直接写 div:nth-child(1) 则会从上到下逐层进行获取，将获取符合条件的dom

### E:nth-last-child(n)

E的父节点下的倒数第N个E子节点

### E:nth-of-type(n)

E的父节点下的该类型的第N个E子节点， E:nth-child(n)只管父节点下的第几个节点，而E:nth-of-type(n)的将范围缩小到改类型的节点

### E:nth-last-of-type(n)

同上，倒数

### E:first-child

E的父节点下的第1个E子节点

### E:last-child

E的父节点下的最后一个E子节点

### E:first-of-type

E的父节点下的该类型的第1个E子节点

### E:last-of-type

E的父节点下的该类型的最后一个E子节点

### E:only-child

当某个父元素中只有一个元素时才使用的样式 === E:nth-child(1):nth-last-child(1)

### E:only-of-type

当某个父元素中只有一个E类型的元素时才使用的样式

### E:empty  

使用empty选择器来指定当元素内容为空白时使用的样式。 例如<td>45</td>跟<td></td>，后者内容为空

## 组合选择器

### E,F

多元素选择器，同时匹配所有E元素或F元素，E和F之间用逗号分隔

### E F

后代元素选择器，匹配所有属于E元素后代的F元素，E和F之间用空格分隔

### E > F

直属子节点

### E + F

它用来指定位于同一个父元素之中的某个元素之前的所有其它某个种类的兄弟选择器所用到的样式

### E ~ F

它用来指定位于同一个父元素之中的某个元素之后的所有其它某个种类的兄弟选择器所用到的样式。但是对元素内部的元素不指定样式。

## 伪类

### E:link

未访问的链接

### E:visited

已访问的链接

### E:active

选定的链接

### E:hover

鼠标移动到链接上

### E:focus

获得焦点时的样式

### E:target

使用target选择器来对页面中的某个target元素（该元素中的ID被当作页面中的超链接来使用）指定样式，该样式只在用户点击了页面中的超链接，并且跳转到target元素后起作用。

### E:lang(C)   

:lang 伪类根据元素的语言编码匹配元素。这种语言信息必须包含在文档中，或者与文档关联，不能从 CSS 指定。:lang 的处理与 [lang|=C] 选择器相同。例如zh、en等，表示中英文的区分。

## 用户界面有关的伪类

### E:enabled  

获取可用的用户界面节点

### E:disabled   

获取不可用的用户界面节点

### E:checked   

一个被选中的用户节点dom（例如radio或者checkbox）

## 伪元素

### E::first-line   

用于为某个元素中的第一行文字使用样式。

### E::first-letter   

用于某个元素中的文字首字母或第一个字使用样式。

### E::before   

用于在某个元素之前插入一些内容。

### E::after   

用于在某个元素之后插入一下内容。

## CSS3的反选伪类

### E:not(s)  (>IE8)

找寻不匹配改搜索器s的dom

## css3文本选中的伪元素 (>IE8)

css3中可以通过以下形式来控制文字被选中时的样式，背景色，字的颜色，字体阴影等

```css
::selection {
  background: #F04530;
  color: white;
  text-shadow: none;
}
```

## 全屏

element.webkitRequestFullScreen() 调用全屏函数，在需要退出时对 document 调用 exitFullscreen() 这个 API。

CSS 选择器：

* :fullscreen – 当前全屏化的元素(:-webkit-full-screen)
* :fullscreen-ancestor – 所有全屏化元素的祖先元素(:-webkit-full-screen-ancestor)

## 伪类和伪元素

在css2.1中并没有被详细区分，在css3的标准中两者有了严格的区分

两者真正的区别可以它们是否创造了新的元素(抽象)。

例如伪元素first-line，就等于在一段文本中，为第一行文本套上了一个<span class="first-line">
而伪类first-child，则可以理解为，为第一个dom，添加了class="first-child"，而不需要创造新dom

单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。

双冒号是在css3规范中引入的，用于区分伪类和伪元素。不过浏览器需要同时支持旧的已经存在的伪元素写法，
比如:first-line、:first-letter、:before、:after等，而新的在CSS3中引入的伪元素则不允许再支持旧的单冒号的写法，如::selection不能写成:selection。

所以对于CSS2之前已有的伪元素，比如:before，单冒号和双冒号的写法::before作用是一样的。