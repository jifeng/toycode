var TreeData = [{
  name: 'top1',
  id: 1,
  status: 0,
  children: [
    {
      name: 'top2',
      id: 2,
      status: 1,
      children: [
        {
          name: 'top3',
          id: 3,
          status: 1
        },
        {
          name: 'top4',
          id: 4,
          status: 0
        }
      ]
    }
  ]
}];

var getNode = function(node){
  return { name: node.name, id: node.id, status: node.status }
};
var nodeRender  = function(nodes, filter) {
  filter = filter || function () { return true}
  var arr = []
  for (var j = 0; j < nodes.length; j++) {
    var node = nodes[j];
    if (filter(node)) {
      arr = arr.concat(getNode(node));
    }
    if( node.children !== undefined ) {
      var children = node.children;
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (filter(children)) {
          arr = arr.concat(getNode(child));
        }
        var arrs = nodeRender(child.children).filter(filter)
        arr = arr.concat(arrs);
      }
    } 
  }
  return arr;
}

console.log(nodeRender(TreeData));
console.log(nodeRender(TreeData, function (node) {return node.name === 'top4'}));
console.log(nodeRender(TreeData, function (node) {return node.status === 0}));
console.log(nodeRender(TreeData, function (node) {return node.id > 2 }));
      
