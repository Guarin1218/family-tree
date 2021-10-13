"# family-tree" 

//Comando para inicializar mysql en docker

docker run --name mysqldb -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=family-tree -d -p 3306:3306 mysql
