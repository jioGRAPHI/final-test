const db = require(__dirname + '/../db_config/mysql');


exports.addLike = (req, res)=>{
	const { restaurant_id, user_id } = req.body;
	const REGISTER_LIKE_QUERY = 'insert into likes (user_id, restaurant_id) values (?, ?);'
	const errors = []
	db.query(REGISTER_LIKE_QUERY, [user_id, restaurant_id], (err, results)=>{
		if(!err){
			const GET_LIKES_QUERY = 'select restaurant_likes from restaurant where restaurant_id = ?'
			db.query(GET_LIKES_QUERY, [restaurant_id], (err, results)=>{
				if(!err){
					console.log("Like Successful.");
					return res.json({
						message: 'Like Successful.',
						errors: errors,
						currLikes: results
					});
				}
			});
		}
		else{
			console.log("Error!");
			return res.json({
				message: 'Like Failed',
				errors: errors
			});
		}
	});
}

exports.unlike = (req, res)=>{
	const { restaurant_id, user_id } = req.body;
	const REGISTER_UNLIKE_QUERY = 'delete from likes where user_id = ? && restaurant_id = ?'
	const errors = []
	db.query(REGISTER_UNLIKE_QUERY, [user_id, restaurant_id], (err, results) => {
		if(!err){
			const GET_LIKES_QUERY = 'select restaurant_likes from restaurant where restaurant_id = ?'
			db.query(GET_LIKES_QUERY, [restaurant_id], (err, results) => {
				if(!err){
					console.log("Unlike Successful.");
					return res.json({
						message: 'Unlike Successful.',
						errors: errors,
						currLikes: results
					});
				}
			});
		}
		else{
			console.log("Error!");
			return res.json({
				message: 'Unlike Failed',
				errors: errors
			});
		}
	});	
}

exports.checkIfLiked = (req, res)=>{
	const restaurant_id = req.params.restaurant_id;
	const user_id = req.params.user_id;

	console.log('likes')
	console.log(user_id)
	console.log(restaurant_id)
	console.log('likes')

	db.query('select * from likes where user_id = ? && restaurant_id = ?', [user_id, restaurant_id], (err, results) => {
		if(!err){
			console.log(results)
			return res.json({
				isLikedInfo: results
			})
		}
		else{
			console.log("error!")
			res.send(err)
		}
	})
}

