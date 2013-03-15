

### 获取属性和样式

```
.attr() //属性
.css()  //样式 宽高颜色等
```


### juery中得到特定值的方法

```
data-href='value'
.data('href'); //'value'
.data('href', 'change'); //'change'
```

### 获取事件主体

```
  <button id='btn' name='button'/>按钮</button>  
  $('#btn').on('click', function (evt) {
    console.log(this);
    console.log(evt.target);    
  });
```