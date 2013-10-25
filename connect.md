
```bash
app.handle = function(req, res, out) {
  var stack = this.stack
    , search = 1 + req.url.indexOf('?')
    , pathlength = search ? search - 1 : req.url.length
    , fqdn = 1 + req.url.substr(0, pathlength).indexOf('://')
    , protohost = fqdn ? req.url.substr(0, req.url.indexOf('/', 2 + fqdn)) : ''
    , removed = ''
    , slashAdded = false
    , index = 0;
  req.url = req.url.substr(protohost.length);

```bash
app.handle = function(req, res, out) {
  var stack = this.stack
    , fqdn = 1 + req.url.indexOf('://')
    , protohost = fqdn ? req.url.substr(0, req.url.indexOf('/', 2 + fqdn)) : ''
    , removed = ''
    , slashAdded = false
    , index = 0;

  req.url = req.url.substr(protohost.length);
 ```