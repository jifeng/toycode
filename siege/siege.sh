#siege get acttion when urls is in the file
#file content:
#http://127.0.0.1:1823/a
#http://127.0.0.1:1823/b
siege -c 10 -t 5M -f file

#siege post action when data is in the file
#file content:
# {"sql" : "SELECT * FROM myfox.dim_category WHERE category_id = \"1512\""}
siege -r1000 -c20 -b "127.0.0.1:33759/sql POST <flie"
