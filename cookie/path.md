前阵子，接一个用户授权服务时,遇到一个关于cookie的诡异问题，折腾了一天才知道问题出在哪儿，虽然时候才知道这是个小白问题。

遇到问题是这样子：

比如访问A地址（比如http://localhost/index，http://localhost/test/index)时需要登陆时会跳转到一个登陆页面，登陆成功后，跳转回原页面，这时将用户信息存入到session中，并通过response的Set-Cookie头信息，设置向对应的cookie值。具体如下：

````
Set-Cookie:sid=Wnse42HlgkYBbLtAEOMRkXcWHSwkr9nRUS0WBFFHA4TCZUga; Max-Age=28800; Expires=Mon, 18 Mar 2013 12:07:32 GMT; 
````
 乍一看没有问题吧？

 当A地址是在一级目录，比如http://localhost/index，这样是没有任何问题的。

 但A地址是在二级目录，比如http://localhost/test/index，问题就来了。访问过A后再去访问其他层级的目录，比如http://localhost/test2/index，这时是得不到用户的cookie信息，就好像之前的登陆无效一样。

现在大家应该清楚问题处在哪了？cookie的作用域问题。

解决方法也很简单，指定全局的作用域

````
Set-Cookie:sid=Wnse42HlgkYBbLtAEOMRkXcWHSwkr9nRUS0WBFFHA4TCZUga; Max-Age=28800; Expires=Mon, 18 Mar 2013 12:07:32 GMT; Path=/;
````

这里很重要的一点是：正常的cookie只能在一个应用中（简单理解，就是一个目录）共享，即一个cookie只能由创建它的应用获得，比如在/test1/*创建自己应用的cookie，/test2/*下是拿不到。而且很容易被忽视的一点：path默认是产生cookie的应用的路径。

:如果两者需要共享的话，指定Path为"/"即可

所以以前千万不要为了省事，而不设置一些重要的参数，不然......

具体的测试代码可见：https://github.com/jifeng/toycode/blob/master/cookie/path.js