# jade 和 ejs 的一个使用规范

## 例子

attributes.js

````js
var jade = require('jade');
var path = __dirname + '/attributes.jade';
var str = require('fs').readFileSync(path, 'utf8');
var fn = jade.compile(str, { filename: path, pretty: true });

var s = fn({ 
  name1: 'http://shu.taobao.com/assets/images/logo.png" onload="alert(123);',
  name2: "http://shu.taobao.com/assets/images/logo.png onload='alert(123);"}
);

console.log(s);
````

attributes.jade

````jade
p(value = name1)
p(value= name2)

````

最终结果

````
<p value="http://shu.taobao.com/assets/images/logo.png&quot; onload=&quot;alert(123);"></p>
<p value="http://shu.taobao.com/assets/images/logo.png onload='alert(123);"></p>
````

## 原因

[jade/lib/compiler.js](https://github.com/visionmedia/jade/blob/master/lib/compiler.js#L644)

````js
function escape(html){
  return String(html)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
````

## 悲剧

````js
var url = "http://shu.taobao.com/assets/images/logo.png' onload='alert(123);";
html = '<img src="'" + escape(url) + "'" />';
console.log(html);
````

结果

````html
<img src='http://shu.taobao.com/assets/images/logo.png' onload='alert(123);' />
````



