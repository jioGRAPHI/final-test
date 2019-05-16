const db = require(__dirname + '/../db_config/mysql');


exports.rate = (req, res)=>{
	const { ratingToPass, restaurant_id, user_id } = req.body;
	const RATE_QUERY = 'insert into rating (user_id, restaurant_id, rating) values (?, ?, ?);'
	const errors = []
	db.query(RATE_QUERY, [user_id, restaurant_id, ratingToPass], (err, results) => {
		if(!err){
			const GET_RATES_QUERY = 'select restaurant_rating from restaurant where restaurant_id = ?'
			db.query(GET_RATES_QUERY, [restaurant_id], (err, results) => {
				if(!err){
					console.log("Rate Successful.");
					return res.json({
						message: 'Rate Successful.',
						errors: errors,
						currRates: results
					});
				}
			})
		}
		else{
			console.log("Error!");
			return res.json({
				message: 'Rate Failed',
				errors: errors
			});
		}
	});
}

exports.deleteRate = (req, res)=>{
	const { restaurant_id, user_id } = req.body;
	const DELETE_RATE_QUERY = 'delete from rating where restaurant_id = ? && user_id = ?;'
	const errors = []
	db.query(DELETE_RATE_QUERY, [restaurant_id, user_id], (err, results) => {
		if(!err){
			const GET_RATES_QUERY = 'select * from restaurant where restaurant_id = ?'
			db.query(GET_RATES_QUERY, [restaurant_id], (err, results) => {
				if(!err){
					console.log("Delete Rate Successful.");
					return res.json({
						message: 'Delete Rate Successful.',
						errors: errors,
						currRates: results
					});
				}
			})
		}
		else{
			console.log("Error!");
			return res.json({
				message: 'Delete Rate Failed',
				errors: errors
			});
		}
	});
}

exports.checkIfRated = (req, res)=>{
	const restaurant_id = req.params.restaurant_id;
	const user_id = req.params.user_id;

	db.query('select * from rating where user_id = ? && restaurant_id = ?', [user_id, restaurant_id], (err, results) => {
		if(!err){
			console.log(results)
			return res.json({
				isRatedInfo: results
			})
		}
		else{
			console.log("error!")
			res.send(err)
		}
	})
}