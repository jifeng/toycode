var Client = require('easymysql');

var mysql = Client.create({
  'maxconnections' : 10
});

mysql.addserver({
  'host' : '127.0.0.1',
  'user' : 'root',
  'password' : '',
  database: 'test_procedure'
});

mysql.query('SHOW DATABASES', function (error, res) {
  console.log(res);
});

//要获取存储过程中最后值，需要再存储过程的最后写 select
mysql.query('call pr_get_rand_user(042129)', function () {
  console.log(JSON.stringify(arguments));
});