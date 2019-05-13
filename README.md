# final
CMSC 128 Project Test Deployment

### How To Run:
**1.** configure your database  
	- on the final/db_config folder  
	- edit the mysql.js file  
	  
**2.** populate your database  
	- on the final/database folder  
	- run your mysql service   
```
	$ source sources.sql
```

**3.** install node modules  
	- on the final folder  
```
	$ npm install
```
**4.** install node module on the front-end  
	- on the final/front-end folder  
```
	$ npm install
```
**5.** run server  
	- open terminal  
	- cd final
	
```
	$ npm start
```

**6.** run front-end  
	- open ANOTHER terminal  
	- cd final/front-end  
	
```
	$ npm start
```  

**NOTE:**   
On the final/front-end folder  
  inside the package.json file there is this:  

	"proxy": "http://localhost:3001"  

*Baka kailangan pong palitan sir.*
