const db = require(__dirname + '/../db_config/mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const expressValidator = require('express-validator');
const jwt = require('jsonwebtoken');
var Storage = require('dom-storage');
var localStorage = new Storage('./session_storage.json', { strict: false, ws: '  ' });
const fs = require('fs');

exports.signup = (req, res)=>{
	// Validate form fields
	req.checkBody('username', 'Username is required').notEmpty()
	req.checkBody('email', 'Email is invalid').isEmail()
	req.checkBody('password1', 'Password is required').notEmpty()
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password1)
	// Store validation errors in 'errors' var (will store an array of json obj containing error details for each error)
	const errors = req.validationErrors()
	if (errors){
		// If ret
		console.log(`errors: ${JSON.stringify(errors)}`)
		return res.json({
			message: 'Error!',
			errors: errors
		})
	} else {
		const { username, email, firstname, lastname, password1, password2 } = req.body;
		const FIND_BY_USERNAME_QUERY = 'SELECT * FROM user WHERE username = ?'
		const errors = []
		db.query(FIND_BY_USERNAME_QUERY, [username], (err, user_username)=>{
			if(!err){
				if(user_username.length > 0){
					return res.status(418).json({
						message: 'Username already exists.',
						errors: errors,
						statusCode: 418
					});
				}else{
					const FIND_BY_EMAIL_QUERY = 'SELECT * FROM user WHERE email = ?'
					db.query(FIND_BY_EMAIL_QUERY, [email], (err, user_email)=>{
						if(!err){
							if(user_email.length > 0){
								return res.status(418).json({
									message: 'Email already in use.',
									errors: errors,
									statusCode: 418
								});
							}else{
								const ADD_USER_QUERY = 'INSERT INTO user (username, email, firstname, lastname, password) VALUES (?, ?, ?, ?, ?)'
								bcrypt.hash(password1, saltRounds, function(err, hash) {
									db.query(ADD_USER_QUERY, [username, email, firstname, lastname, hash], (err, results)=>{
										console.log("Username is " + username + "email is " + email)
										if(!err){
											const FIND_USER_QUERY = 'SELECT * FROM user WHERE username = ?'
											db.query(FIND_USER_QUERY, [username], (err, results)=>{
												if(!err){
													if(results.length > 0 ){
														var user = results[0]
														localStorage.setItem('loggedIn', 'true');
														localStorage.setItem('userData', user);
														console.log("Signup successful.")
														return res.status(200).json({
															message: 'Signup successful.',
															errors: errors,
															statusCode: 200
														});
													}
												}else{
													return res.status(500).json({
														message: 'Internal Server Error.',
														errors: errors,
														statusCode: 500
													});
												}
											})
										}
										else{
											console.log("Error!")
											return res.status(500).json({
												message: 'Signup failed',
												errors: errors,
												statusCode: 500
											});
										}
									})
								})
							}
						}else{
							return res.status(500).json({
								message: 'Error!',
								errors: errors,
								statusCode: 500
							})
						}
					})
				}
			}else{
				return res.status(500).json({
					message: 'An error occurred while processing your request',
					errors: errors,
					statusCode: 500
				})
			}
		})
	}
};



exports.login = (req, res)=>{
	console.log("Inside login")
	const { username, password} = req.body;
	console.log(username)
	const FIND_USER_QUERY = 'SELECT * FROM user WHERE username = ?'
	db.query(FIND_USER_QUERY, [username], (err, results)=>{
		if(!err){
			console.log(results);
			console.log(results.length)
			if(results.length > 0 ){
				console.log('yes');
				console.log(results[0].password)
				const hash = results[0].password
				bcrypt.compare(password, hash, function(err, isMatch) {
					if(isMatch){
						console.log('Logged in')
						const token = jwt.sign({
							username: username,
							user_type: results[0].user_type
						}, 
						'secretkey', 
						{
							expiresIn: '2h'
						})
						var user = results[0]
						localStorage.setItem('loggedIn', 'true');
						localStorage.setItem('userData', user);
						return res.status(200).json({
							message: 'Login successful',
							statusCode: 200
						});
					}else{
						console.log('Wrong password')
						return res.status(401).json({
							message: 'Auth failed',
							statusCode: 401
						});
					}
				});
			}else{
				console.log('no result');
				return res.json({
					message: 'User does not exist',
					token: '',
					username: '',
					user_type: 0
				});
			}
		}
		else{
			console.log("Error!");
		}
	});
};

exports.checkSession = (req, res)=>{
	if(localStorage.getItem('loggedIn') === 'true'){
		var user = localStorage.getItem('userData')
		return res.status(200).json({
			userData: user,
			statusCode: 200
		});
	}else{
		return res.status(401).json({
			statusCode: 401
		});
	}
}

exports.logout = (req, res)=>{
	// localStorage.removeItem('loggedIn');
	// console.log('clear1');
	// localStorage.removeItem('userData');
	// console.log('clear2');
	localStorage.clear();
	console.log('Session successfully ended');
	
	fs.unlinkSync('./session_storage.json')

	return res.json({
		status: 'success'
	});
}


exports.getUserInfo = (req, res)=>{
	const id = req.params.user_id;
	console.log(id)
	db.query("SELECT  * FROM user WHERE user_id = " + id, (err, user)=>{
		if(!err){
			return res.status(200).json({
				userInfo: user,
				statusCode: 200
			})
		}
		else{
			return res.status(500).json({
				statusCode: 500
			})
		}
	})
}

exports.getActiveUsers = (req, res)=>{
	console.log("inside get all active users")
	db.query('SELECT * FROM user WHERE user_type = 0 && is_deleted = 0', (err, users)=>{
		if(!err){
			return res.status(200).json({
				active_users: users,
				statusCode: 200
			})
		}
		else{
			return res.status(500).json({
				statusCode: 500
			})
		}
	})
}

exports.getDeletedUsers = (req, res)=>{
	console.log("inside get all deleted users")
	db.query('SELECT * FROM user WHERE user_type = 0 && is_deleted = 1', (err, users)=>{
		if(!err){
			return res.status(200).json({
				deleted_users: users,
				statusCode: 200
			})
		}
		else{
			return res.status(500).json({
				statusCode: 500
			})
		}
	})
}

exports.searchActiveUser = (req, res)=>{
	const username = req.params.username;
	console.log(username)
	db.query("SELECT  * FROM user WHERE is_deleted = 0 && user_type = 0 && username = '" + username + "'", (err, user)=>{
		if(!err){
			return res.status(200).json({
				user: user,
				statusCode: 200
			})
		}
		else{
			return res.status(500).json({
				statusCode: 500
			})
		}
	})
}

exports.searchDeletedUser = (req, res)=>{
	const username = req.params.username;
	console.log(username)
	db.query("SELECT  * FROM user WHERE is_deleted = 1 && user_type = 0 && username = '" + username + "'", (err, user)=>{
		if(!err){
			return res.status(200).json({
				user: user,
				statusCode: 200
			})
		}
		else{
			return res.status(500).json({
				statusCode: 500
			})
		}
	})
}


exports.editProfile = (req, res)=>{
	console.log("Inside edit profile API")
	console.log(req.body.passwordOld)
	const user_id1 = req.body.user_id
	const username1 = req.body.username
	const password1 = req.body.password
	const password2 = req.body.password2
	const password0 = req.body.passwordOriginal
	const password3 = req.body.passwordOld
	console.log("Detect"+password1+password2+password3)
	const email1 = req.body.email
	const firstname1 = req.body.firstname
	const lastname1 = req.body.lastname
	const contactno1 = req.body.contactno
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password)
	const errors = req.validationErrors()
	console.log(password3)
	if(password1 == null && password2 == null && password3 == null){
		console.log("no password detected")
			const queryString = "UPDATE user SET username = ?,  email = ?, firstname = ?, lastname = ?, contactno = ? where user_id = ?"
	bcrypt.hash(password0, saltRounds, function(err, hash) {
		db.query(queryString, [username1, email1, firstname1, lastname1, contactno1, user_id1], (err, results, fields) => {
		if(!err){
			console.log("successfully profile edited info!");
			return res.json({
				message: 'successfully profile edited info!',
				restaurantInfo: results
			});
		}
		else{
			console.log("error!");
			return res.json({
				message: 'failed',
				restaurantInfo: results
			});
		}
		console.log("Edited an existing profile!");
	}
	)
	})
	}
	else{
	if (errors){
		// If ret
		console.log(`errors: ${JSON.stringify(errors)}`)
		return res.json({
			message: 'Error!',
			errors: errors
		})
	} else{
	console.log("password detected")
	const FIND_USER_QUERY = 'SELECT * FROM user WHERE user_id = ?'
	db.query(FIND_USER_QUERY, [user_id1], (err, results)=>{
		const hash = results[0].password
		bcrypt.compare(password3, hash, function(err, isMatch) {
			if(isMatch){
					const queryString = "UPDATE user SET username = ?, password = ?, email = ?, firstname = ?, lastname = ?, contactno = ? where user_id = ?"
					bcrypt.hash(password1, saltRounds, function(err, hash) {
						db.query(queryString, [username1, hash, email1, firstname1, lastname1, contactno1, user_id1], (err, results, fields) => {
						if(!err && password1.length > 0){
							console.log("successfully profile edited info!");
							return res.json({
								message: 'successfully profile edited info!',
								restaurantInfo: results
							});
						}
						else{
							console.log("error!");
							return res.json({
								message: 'failed',
								restaurantInfo: results
							});
						}
						console.log("Edited an existing profile!");
					}
					)
				})

			}else{
				return console.log("Old Password does not match")
			}
	})
	})
}
}
}