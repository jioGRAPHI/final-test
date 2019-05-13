const db = require(__dirname + '/../db_config/mysql');
var multer  =   require('multer');
const path = require('path');

const photo_storage =   multer.diskStorage({
  destination: function (req, file, callback) {
		console.log(path.resolve('..'));
    callback(null,path.join(path.resolve('.'),'photo-uploads'));
  },
  filename: function (req, file, callback) {
  	console.log("MIMETYPE")
  	console.log(file.mimetype)
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

exports.multipleUpload = multer({ storage : photo_storage }).array('photos', 10);

exports.uploadShopPhotos = (req,res)=>{
	if(!req.files){
		return res.status(200).json();
	}else{
		const n = req.files.length;
		let SQL_STRING = `INSERT INTO
			photorestaurant(restaurant_id,photo_path)
			VALUES
			(?,?)`;
		let SQL_VALUES = [
			req.body.rest_id,
			'images/'+req.files[0].filename
		]
		for (let i=1; i<n; i++){
			SQL_STRING += ',\n\t\t\t(?,?)'
			SQL_VALUES.push(
				req.body.rest_id,
				'images/'+req.files[i].filename
			)
		}
		console.log(SQL_STRING);
		console.log(SQL_VALUES);
		db.query(SQL_STRING,SQL_VALUES,
			(err,result)=>{
				if(err){
					res.status(500).json();
				}else{
					res.status(200).json(result);
				}
			}
		);
	}
}