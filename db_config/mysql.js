const mysql = require('mysql');
var connection;

//make connection
if (process.env.JAWSDB_MARIA_URL){
  connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL || "mysql://k8gklwr5xfvibsh4:cwgytriwy11luixx@ui0tj7jn8pyv9lp6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/opbu3iyewwd0imgx");
  console.log('Host DB');
}else{
  connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'useruser',
	database: 'find_dining',
	multipleStatements: true
  });
  console.log('Local DB');
}


connection.connect((err)=>{
	if(!err)
		console.log('DB connection succeeded');
	else
		console.log('DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
});



// Export connection for our ORM to use.
module.exports = connection;