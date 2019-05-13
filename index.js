const express = require('express');
const app = express();
const expressValidator = require('express-validator');
const multer  =   require('multer');
const path = require('path');
const port = process.env.PORT || 3001;

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use('/images', express.static('photo-uploads'));


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'front-end/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html')); 
  });
}


// const photo_storage =   multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, './photo-uploads');
//   },
//   filename: function (req, file, callback) {
//   	console.log("MIMETYPE")
//   	console.log(file.mimetype)
//     callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// app.post('/upload-restaurant-photos', multer({ storage : photo_storage }).array('photos',5), (req, res)=> {
//     	console.log(req.files)
//     	const files = req.files	
// 		if (!files) {
// 		    console.log('No file chosen')
// 		    return res.status(500).json({
// 				message: 'Upload failed'
// 			})
// 		  }
// 		  else{
// 		  	console.log('upload successful')
// 		  	console.log(req.files)
// 			console.log(req.files[0].filename)
// 			console.log(req.body.rest_id)
// 		  	return res.status(200).json({
// 				message: 'Upload successful',
// 				uploaded: req.files
// 			})
// 		  }
// 		next()
//     }
// );

require('./routers/router')(app);

app.listen(port, ()=> console.log(`Express server running at port number ${port}`));
