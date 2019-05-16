const userController 		= require(__dirname + '/../controllers/user');
const shopController 		= require(__dirname + '/../controllers/shop');
const likeController 		= require(__dirname + '/../controllers/like');
const photoController 	= require(__dirname + '/../controllers/photo');
const ratingController 	= require(__dirname + '/../controllers/rating');
const reportController 	= require(__dirname + '/../controllers/report');
const commentController = require(__dirname + '/../controllers/comment');

module.exports = (app) =>{

	// User 
	app.post('/signup', userController.signup);
	app.post('/login', userController.login);
	app.get('/check-session', userController.checkSession);
	app.get('/logout', userController.logout);
	app.get('/view-user/:user_id', userController.getUserInfo);
	app.post('/edit-profile',userController.editProfile);
	app.get('/get-active-users', userController.getActiveUsers);
	app.get('/get-deleted-users', userController.getDeletedUsers);
	app.get('/find-active-user-by-username/:username', userController.searchActiveUser);
	app.get('/find-deleted-user-by-username/:username', userController.searchDeletedUser);

	// Shop 
	app.post('/add-restaurant', shopController.addShop);
	app.post('/edit-restaurant', shopController.editShop);
	app.post('/delete-restaurant', shopController.deleteShop);
	app.get('/get-featured-shops', shopController.getFeaturedShops);
	app.get('/randomizer-simple', shopController.randomizerSimple);
	app.post('/randomizer', shopController.randomizerAdvanced);
	app.get('/shop-report-summary', shopController.shopSummary);
	app.get('/view-restaurant/:restaurant_id', shopController.getShopInfo);
	// Almost the same as above but things might get fubar if I change the route used by client to make this api call
	app.get('/restaurant/:restaurant_id', shopController.getShopInfoV2);

	app.get('/view-by-cuisine/:cuisine', shopController.searchShopByCuisine);
	app.get('/view-by-type/:type', shopController.searchShopByType);
	app.get('/get-cuisines-and-types', shopController.getCuisineAndTypeList);
	app.get('/search-restaurant/:name', shopController.searchShopByName);

	// Report
	app.post('/add-report', reportController.addReport);
	app.post('/resolve-report', reportController.resolveReport);
	app.get('/report/:report_id', reportController.getReportInfo);
	app.get('/view-reports', reportController.getReportLists);

	// Comment
	app.get('/get-all-comments', commentController.getAllComments);
	app.get('/comments/:restaurant_id', commentController.getCommentsByRestaurantId)
	app.post('/comments/new',
		commentController.newComment1,
		commentController.newComment2,
		commentController.newComment3);
	app.post('/comments/edit',
		commentController.editComment1,
		commentController.editComment2,
		commentController.editComment3);
	app.delete('/comments/delete/:comment_id',
	commentController.deleteComment);

	// Like 
	app.post('/add-like', likeController.addLike);
	app.post('/unlike', likeController.unlike);
	app.get('/check-if-liked/:restaurant_id/:user_id', likeController.checkIfLiked);

	// Rating
	app.post('/rate', ratingController.rate);
	app.post('/delete-rate', ratingController.deleteRate);
	app.get('/check-if-rated/:restaurant_id/:user_id', ratingController.checkIfRated);
	
	// Photo 
	app.post('/upload-restaurant-photos',
		photoController.multipleUpload,
		photoController.uploadShopPhotos);	
}