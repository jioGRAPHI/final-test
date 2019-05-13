const db = require(__dirname + '/../db_config/mysql');
const path = require('path');
const multer = require('multer');

exports.getAllComments = (req, res)=>{
	console.log("inside get all comments")
	db.query('SELECT * FROM comment', (err, comments)=>{
		if(!err){
			return res.status(200).json({
				comments: comments,
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

exports.getCommentsByRestaurantId = (req,res)=>{
	db.query(`SELECT
		c.comment_id,
		c.content,
		c.restaurant_id,
		c.created_at,
		u.user_id,
		u.username,
		u.firstname,
		u.lastname,
		img.photo_path
	FROM comment c
	LEFT JOIN user u
	ON c.user_id=u.user_id
	LEFT JOIN photocomment img
	ON c.comment_id=img.comment_id
	WHERE c.restaurant_id=?
	ORDER BY c.created_at DESC`,
	[req.params.restaurant_id],
	(err,data)=>{
		if(err){
			console.log(err)
			res.status(500).send(err);
		}
		console.log(data);
		res.send(JSON.parse(JSON.stringify(data)));
	})
}

const imageUpload = multer({
	fileFilter: (req,file,cb)=>{
		const [ type, extension ] = file.mimetype.split('/');
		if(type !== 'image')
			return cb(null,false);
		if ( extension === 'jpg'
			|| extension === 'jpeg'
			|| extension === 'png')
			cb(null,true);
		else
			cb(null,false);
	},
	storage: multer.diskStorage({
		destination: (req,file,cb)=>{
			// creates absolute path to /path/to/back-end/server/uploads/
			cb(null,path.join(path.resolve('.'),'photo-uploads'));
		},
		filename: (req,file,cb)=>{
			cb(null,'FIND_DINING-'+Date.now()+'.'+file.mimetype.split('/')[1]);
		}
	})
});


exports.newComment1 = imageUpload.single('img');
exports.newComment2 = (req,res,next)=>{
	req.checkBody("restaurant_id", "Restaurant ID required").notEmpty();
	req.checkBody("user_id", "User ID required").notEmpty();
	//req.checkBody("content", "Comment Content Required").notEmpty();

	const errors = req.validationErrors();
	if(errors){
		console.log(errors);
		return res.status(400).send(errors);
	}
	console.log('from new comment')
	db.query(`INSERT INTO 
	comment(user_id,restaurant_id,content)
	values(?,?,?)`,
	[req.body.user_id,req.body.restaurant_id,req.body.content],
	
	(err,result)=>{
		if(err){
			res.status(500).send(err);
		}
		console.log(result);
		req.body.comment_id = result.insertId;
		next();
	});
}
exports.newComment3 = (req,res)=>{
	if(!req.file)
		return res.status(200).end();
	
	db.query(`INSERT INTO
	photocomment(comment_id,user_id,restaurant_id,photo_path)
	VALUES(?,?,?,?)`,
	[ req.body.comment_id,
		req.body.user_id,
		req.body.restaurant_id,
		path.join('/','images',req.file.filename)],
	
	(err,result)=>{
		if(err){
			res.status(500).send(err);
		}
		res.status(200).send(result);
	})
}


exports.editComment1 = imageUpload.single('img');
exports.editComment2 = (req,res,next)=>{
	req.checkBody("comment_id", "Comment ID required").notEmpty();
	req.checkBody("content", "Comment Content Required").notEmpty();

	const errors = req.validationErrors()
	if(errors){
		console.log(errors);
		res.status(400).send(errors);
	}

	db.query(`UPDATE comment
	SET content=?
	WHERE comment_id=?`,
	[req.body.content,req.body.comment_id],
	(err,result)=>{
		if(err){
			console.log(err);
			res.status(500).send(err);
		}
		console.log(result);
		next();
	})
}
exports.editComment3 = (req,res)=>{
	if(!req.file)
		return res.status(200).end();

	db.query(`UPDATE photocomment
	SET photo_path=?
	WHERE comment_id=?`,
	[ path.join('/','img','comment',req.file.filename),
		req.body.comment_id],
	
	(err,result)=>{
		if(err){
			res.status(500).send(err);
		}else{
			console.log(result);
			res.status(200).send(result);
		}
	})
}

exports.deleteComment = (req,res)=>{
	db.query(`DELETE FROM comment
		WHERE comment_id=?`,
	[req.params.comment_id],
	
	(err,result)=>{
		if(err){
			console.log(err);
			res.status(500).send(err);
		}

		console.log(result);
		res.send(result);
	})
}