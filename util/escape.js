/**
 * 对字符串进行安全转义
 * @param {String} str
 * @param {String} charset, default utf-8
 * @return {String}
 * author: pengchun
 */
var __escapemap = {
  '\''  : '\\\'',
  '"'   : '\\\"',
  '\\'  : '\\\\',
  '\0'  : '\\0',
  '\n'  : '\\n',
  '\r'  : '\\r',
  '\b'  : '\\b',
  '\t'  : '\\t',
  '\x1a': '\\Z',        /**<    EOF */
};
var escape  = exports.escape    = function(str) {
  if ('number' === (typeof str)) {
    return str;
  }
  var _char = [];
  for (var i = 0, m = str.length; i < m; i++) {
    var _me = str.charAt(i);
    if (__escapemap[_me]) {
      _me = __escapemap[_me];
    }
    _char.push(_me);
  }

  return _char.join('');
}

