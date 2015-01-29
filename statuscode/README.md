## HTTP Status Code

### 先看一个例子

```coffee
connect = require 'connect'
urllib = require 'urllib'

app = connect()

app.use (req, res, next)->
  res.statusCode = -1
  res.end 'hello world'

app.listen 1723, ()->
  console.log 'server listened 1723'
```

### 浏览器

chrome | safri

### nodejs执行

```coffee

http = require 'http'

g = http.get 'http://localhost:1723', (res)->
  console.log res.statusCode

g.on 'error', (err)->
  console.log err
```

结果

```bash
{ [Error: Parse Error] bytesParsed: 9, code: 'HPE_INVALID_STATUS' }
```

### 原因

statusCode 不在标准范围内


### 一个坑的例子

```coffee
connect = require 'connect'
urllib = require 'urllib'

app = connect()

app.use '/facebook', (req, res, next)->
  console.log 'facebook...........'
  # 这里err是访问超时了，会报错， statusCode = -1
  urllib.request 'https://www.facebook.com/', (err)->
    return next err if err
    res.end 'hello'

```
connect 默认的err处理

```javascript
      // respect err.status
      if (err.status) {
        res.statusCode = err.status
      }

```

悲剧了

### link

status_code: https://github.com/joyent/node/blob/7c0419730b237dbfa0ec4e6fb33a99ff01825a8f/lib/_http_server.js















