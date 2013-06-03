
## 操作指令

### 启动
```bash
mysqld start
```

默认端口: 3306

### 关闭
```bash
mysqld stop
```

### 重启
```bash
mysqld restart
```

### 连接数据库
```bash
# 正常登陆
mysql -h 10.232.31.154 -P 3306 -u name -pxxxxx

# root登陆
mysql -u root
```

### 新建数据库 
```bash
create database test_procedure
```

### 新建表
```sql
create table dxpweb_document (
  id bigint unsigned  not null comment '主键' auto_increment,
  gmt_create datetime  not null comment '创建时间',
  gmt_modified datetime  not null comment '修改时间',
  doc_key varchar(128)  not null comment '文档key',
  detail text comment '文档的具体内容',
  status tinyint  not null comment '这边文档的状态，1：可用，0：不可用',
  primary key (id),
  unique key doc_key_primary (doc_key)
) comment='用于记录在云端的可编辑的相关文档内容'
```


### 插入数据
```sql
insert into dxpweb_document(gmt_create, gmt_modified, doc_key, detail, status) values (now(), now(), 'k2', 'v2', 1);
```


## 存储过程

### 删除
```sql
drop procedure if exists pr_add;
```

### 报错
```
ERROR 1370 (42000): alter routine command denied to user ''@'localhost' for routine 'test_procedure.pr_add'
```
权限不够

需要root登陆设置权限:http://cocos.iteye.com/blog/1109996

### 新建
```sql
create procedure pr_add
(   
a int,   
b int   
)   
begin   
  declare c int;   
  if a is null then   
    set a = 0;   
  end if;   
  if b is null then   
    set b = 0;   
  end if;   
  set c = a + b;   
  select c as sum;
  /*   
  return c;
  */   
end;
```

简单例子
```sql
create procedure pr_add
(   
a int,   
b int   
)
begin  
  /*
    return 1
  */  
end;
```

```sql
create procedure pr_show_data
(
)
begin  
  SELECT * FROM dxpweb_document ;
end;
```

### 注意事项

由括号包围的参数列必须总是存在。如果没有参数，也该使用一个空参数列()。每个参数默认都是一个IN参数。要指定为其它参数，可在参数名之前使用关键词 OUT或INOUT
在mysql客户端定义存储过程的时候使用delimiter命令来把语句定界符从;变为//。
当使用delimiter命令时，你应该避免使用反斜杠(‘"’)字符，因为那是MySQL的转义字符。

```sql
delimiter //
CREATE PROCEDURE pr_show_data (OUT param1 INT)
BEGIN
  SELECT COUNT(*) INTO param1 FROM dxpweb_document;
END
//
```

```sql
DROP PROCEDURE IF EXISTS pr_get_rand_valid_user
CREATE PROCEDURE pr_get_rand_valid_user (
OUT x varchar(128), 
OUT y text)
BEGIN
  SELECT doc_key, detail INTO x, y FROM dxpweb_document WHERE status = 1 LIMIT 1;
  UPDATE dxpweb_document SET status = 0 WHERE doc_key = x;
  SELECT x AS 'key', y as 'value';
END
```

