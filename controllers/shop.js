const db = require(__dirname + '/../db_config/mysql');


exports.addShop = (req, res)=>{
	console.log("Inside add restaurant")

	const restaurant_name1 = req.body.restaurant_name
	const restaurant_cuisine1 = req.body.restaurant_cuisine
	const restaurant_type1 = req.body.restaurant_type
	const restaurant_price1 = req.body.restaurant_price_range
	const restaurant_openingtime1 = req.body.restaurant_openingtime
	const restaurant_closingtime1 = req.body.restaurant_closingtime
	const restaurant_address1 = req.body.restaurant_address
	const latitude1 = req.body.latitude
	const longitude1 = req.body.longitude
	const added_by = req.body.added_by
	const is_deleted = 0
	
	const queryString = "INSERT INTO restaurant (restaurant_name, restaurant_cuisine, restaurant_type, restaurant_price, restaurant_openingtime, restaurant_closingtime, restaurant_address, latitude, longitude, added_by, updated_by, is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
	db.query(queryString, [restaurant_name1, restaurant_cuisine1, restaurant_type1, restaurant_price1, restaurant_openingtime1, restaurant_closingtime1, restaurant_address1, latitude1, longitude1, added_by, added_by, is_deleted], (err, results, fields) => {
		if (err) {
			console.log("Failed to insert new place: 	" + err)
			res.sendStatus(500)
			return res.json({
				message: err
			})
		}
		else{
			return res.json({
				message: "Adding Restaurant successful"
			})
		}
		console.log("Added new restaurant");
	})
}


exports.editShop = (req, res)=>{
	console.log("Inside edit restaurant API")
	const restaurant_id1 = req.body.restaurant_id
	const restaurant_name1 = req.body.restaurant_name
	const restaurant_cuisine1 = req.body.restaurant_cuisine
	const restaurant_type1 = req.body.restaurant_type
	const restaurant_openingtime1 = req.body.restaurant_openingtime
	const restaurant_closingtime1 = req.body.restaurant_closingtime
	const restaurant_address1 = req.body.restaurant_address
	const latitude1 = req.body.latitude
	const longitude1 = req.body.longitude

	const queryString = "UPDATE restaurant SET restaurant_name = ?, restaurant_cuisine = ?, restaurant_type = ?, restaurant_openingtime = ?, restaurant_closingtime = ?, restaurant_address = ?, latitude = ?, longitude = ? where restaurant_id = ?"
	db.query(queryString, [restaurant_name1, restaurant_cuisine1, restaurant_type1, restaurant_openingtime1, restaurant_closingtime1, restaurant_address1, latitude1, longitude1, restaurant_id1], (err, results, fields) => {
		if(!err){
			console.log("successfully edited info!");
			return res.json({
				message: 'successfully edited info!',
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
		console.log("Edited an existing record!");
	})
}

exports.deleteShop = (req, res)=>{
	const restaurant_id = req.body.restaurant_id;
	db.query('UPDATE restaurant SET is_deleted = 1 WHERE restaurant_id = ?', [restaurant_id], (err, results)=>{
		if(!err){
			return res.json({
				message: "delete successful",
				restaurantInfo: results
			})
		}
		else{
			res.send(err);
		}
	})
}

exports.getFeaturedShops = (req, res)=>{
	console.log('getting featured shops')
	const SEARCH_NEW = 'SELECT * FROM restaurant WHERE is_deleted = 0 ORDER BY restaurant_id desc LIMIT 10'
	const SEARCH_MOST_LIKED = 'SELECT * FROM restaurant WHERE is_deleted = 0 ORDER BY restaurant_likes desc LIMIT 10'
	const SEARCH_TOP_RATED = 'SELECT * FROM restaurant WHERE is_deleted = 0 ORDER BY restaurant_rating desc LIMIT 10'
	const SEARCH_DELETED = 'SELECT * FROM restaurant WHERE is_deleted = 1 ORDER BY restaurant_name'

	db.query(SEARCH_NEW, (err, new_restos)=>{
		if(!err){
			console.log('1')
			db.query(SEARCH_TOP_RATED, (err, top_rated)=>{
				if(!err){
					console.log('2')
					db.query(SEARCH_MOST_LIKED, (err, most_liked)=>{
						if(!err){
							console.log('3')
							db.query(SEARCH_DELETED, (err, deleted)=>{
								if(!err){
									console.log("Successfully fetched featured restaurants")
									return res.json({
										new: new_restos,
										top_rated: top_rated,
										most_liked: most_liked,
										deleted: deleted,
										error: ''
									});
								}
							})
						}
					})
				}else{console.log(err)}
			})
		}
		else{
			console.log("ERROR encountered while fetching user dashboard data")
			return res.json({
				error: 'failed'
			})
		}
	})
}

exports.randomizerSimple = (req, res)=>{
	//console.log("rand");
		const errors = []
		var restaurants = []
		//var count = 0;
		db.query('SELECT * FROM restaurant where is_deleted = 0', (err, results)=>{
			if(!err){
				console.log("Randomizing");
				restaurants = results;
				var restaurant = restaurants[Math.floor(Math.random()*restaurants.length)];
				console.log(restaurant.restaurant_id);
				return res.json({
					restaurant: restaurant
					//count: restaurants.length
				});
						
			}
			else{
				console.log("Error!");
				return res.json({
					errors: errors
				});
			}
		});
};

exports.randomizerAdvanced = (req, res)=>{
		console.log("rand");
		const errors = []
		
		const empty_obj = {
			'restaurant_name':'N/A',
			'restaurant_id':'N/A',
			'restaurant_price':'N/A',
			'restaurant_type':'N/A',
			'restaurant_cuisine':'N/A'
		}

		//console.log(req.body);
		var cuisines = req.body.cuisine;
		cuisines.forEach(function(item, index, array) {
		  			cuisines[index] = "\"" + cuisines[index] + "\"";
		});
		var all_cuisines = cuisines.join(",");
		console.log("Cuisine: " + cuisines);
		//if(cuisines==='*') cuisine = '%';

		var types = req.body.type;
		types.forEach(function(item, index, array) {
		  			types[index] = "\"" + types[index] + "\"";
		});
		var all_types = types.join(",");
		console.log("Type: " + types);
		//if(types==='*') type = '%';

		var price = req.body.price;
		console.log("Price: " + price);
		if(price==='*') price = '3';

		var restaurants = []
		//var count = 0;
		var randomizer_query = 'SELECT * FROM restaurant WHERE restaurant_cuisine IN (' + all_cuisines + ') AND restaurant_type IN (' + all_types + ') AND restaurant_price <= ' + price + ' AND is_deleted = 0';
		//console.log(randomizer_query);
		db.query(randomizer_query, (err, results)=>{
			try{
			if(!err){
				console.log("Randomizing");
				restaurants = results;
				//console.log(restaurants);
				var restaurant = restaurants[Math.floor(Math.random()*restaurants.length)];
				restaurant = (restaurant === undefined) ? empty_obj : restaurant;
				console.log(restaurant.restaurant_id);
				return res.json({
					restaurant: restaurant
					//count: restaurants.length
				});
						
			}
			else{
				console.log("Error!");
				//return res.json({
				//	errors: errors
				//});
			}
		}catch(e){
			console.log("\nempty",e);
		}
		});
};

exports.shopSummary = (req, res)=>{
	const SEARCH_NEW = 'SELECT * FROM restaurant ORDER BY restaurant_id desc;'
	const SEARCH_MOST_LIKED = 'SELECT * FROM restaurant ORDER BY restaurant_likes desc'
	const SEARCH_TOP_RATED = 'SELECT * FROM restaurant ORDER BY restaurant_rating desc'

	db.query(SEARCH_NEW, (err, new_restos)=>{
		if(!err){
			db.query(SEARCH_TOP_RATED, (err, top_rated)=>{
				if(!err){
					db.query(SEARCH_MOST_LIKED, (err, most_liked)=>{
						if(!err){
							console.log("successfully fetched admin dashboard data")
							return res.json({
								new: new_restos,
								top_rated: top_rated,
								most_liked: most_liked,
								error: ''
							});
						}
					})
				}
			})
		}
		else{
			console.log("ERROR encountered while fetching summaries!")
			return res.json({
				error: 'failed'
			})
		}
	})
}

exports.getShopInfo = (req, res)=>{
	console.log("inside search-restaurant")
	const id = req.params.restaurant_id;
	console.log(id)
	db.query("SELECT  * FROM restaurant WHERE restaurant_id = " + id, (err, restaurant)=>{
		if(!err){
			db.query("select * from photorestaurant where is_deleted = 0 && restaurant_id = " + id, (err, photos)=>{
				if(!err){
					console.log(restaurant)
					return res.json({
						restaurantInfo: restaurant,
						photos: photos
					})
					}
				});
		}
		else{
			console.log("error!")
			res.send(err)
		}
	})
}

// (Almost) duplicate of the fxn above but hassle palitan yung api call na ginamit sa client side
exports.getShopInfoV2 = (req, res)=>{
	const restaurant_id = req.params.restaurant_id;
	db.query('SELECT * FROM restaurant WHERE restaurant_id = ?', [restaurant_id], (err, results)=>{
		if(!err){
			console.log(results)
			return res.json({
				restaurant_info: results	
			})
		}
		else{
			console.log("error!")
			res.send(err)
		}
	})
}

exports.searchShopByCuisine = (req, res)=>{
	console.log("inside view by cuisine")
	const cuisine = req.params.cuisine;
	console.log(cuisine)
	db.query('SELECT * FROM restaurant WHERE restaurant_cuisine = ?', [cuisine], (err, results)=>{
		if(!err){
			console.log(results)
			return res.json({
				restaurants: results	
			})
		}
		else{
			console.log("error!")
			res.send(err)
		}
	})
}

exports.searchShopByType = (req, res)=>{
	console.log("inside view by type")
	const type = req.params.type;
	db.query('SELECT * FROM restaurant WHERE restaurant_type = ?', [type], (err, results)=>{
		if(!err){
			console.log(results)
			return res.json({
				restaurants: results	
			})
		}
		else{
			console.log("error!")
			res.send(err)
		}
	})
}

exports.getCuisineAndTypeList = (req, res)=>{
	console.log("Inside get cuisines and types api")
	const GET_CUISINES_QUERY = 'SELECT DISTINCT restaurant_cuisine FROM restaurant ORDER BY restaurant_cuisine'
	const GET_TYPES_QUERY = 'SELECT DISTINCT restaurant_type FROM restaurant ORDER BY restaurant_type'
	db.query(GET_CUISINES_QUERY, (err, cuisines)=>{
		if(!err){
			db.query(GET_TYPES_QUERY, (err, types)=>{
				if(!err){
					console.log(cuisines)
					return res.json({
						cuisines: cuisines,
						types: types	
					})
				}
			})
		}
		else{
			console.log("error!")
			res.send(err)
		}
	})
}

exports.searchShopByName = (req, res)=>{
	console.log("inside search-restaurant")
	const name = req.params.name;
	db.query("SELECT  * FROM restaurant WHERE  restaurant_name LIKE '%"+ name +"%'", (err, results)=>{
		if(!err){
			console.log(results)
			return res.json({
				restaurants: results	
			})
		}
		else{
			console.log("error!")
			res.send(err)
		}
	})
}