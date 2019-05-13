delimiter //
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Entire section dedicated for user table procedures.

create procedure addUser(in username varchar(30), in password varchar(60), in email varchar(50), in firstname varchar(30), in lastname varchar(30), in contactno varchar(20), in user_type int(1))
BEGIN
    insert into user(username, password, email, firstname, lastname, contactno, user_type) values(username, password, email, firstname, lastname, contactno, user_type);
END;

//

create procedure deleteUser(in user_id int(10))
BEGIN
    delete from user where user_id = user_id and is_deleted = 1;
END;

//

-- Debatable, choose to remove this procedure if deemed unnecessary.

create procedure softDeleteUser(in user_id int(10))
BEGIN
    update user set is_deleted = 1 where user_id = user_id;
END;
//

create procedure unDeleteUser(in user_id int(10))
BEGIN
    update user set is_deleted = 0 where user_id = user_id;
END;
//
--

-- Once again, debatable. Remove if unnecessary.

create procedure setAdminPrivileges(in user_id int(10))
BEGIN
    update user set user_type = 1 where user_id = user_id;
END;

//

--
create procedure revokeAdminPrivileges(in user_id int(10))
BEGIN
    update user set user_type = 0 where user_id = user_id;
END;

//

create procedure changeUsername(in user_id int(10), in username varchar(30))
BEGIN
    update user set username = username where user_id = user_id;
END;

//

create procedure changePassword(in user_id int(10), in password varchar(60))
BEGIN
    update user set password = password where user_id = user_id;
END;

//

create procedure changeEmail(in user_id int(10), in email varchar(50))
BEGIN
    update user set email = email where user_id = user_id;
END;

//

create procedure updateContact(in user_id int(10), in contactno varchar(20))
BEGIN
    update user set contactno = contactno where user_id = user_id;
END;
//
create procedure changeFirstName(in user_id int(10), in in_firstname varchar(20))
BEGIN
    update user set firstname = in_firstname where user_id = user_id;
END;
//
create procedure changeLastName(in user_id int(10), in in_lastname varchar(20))
BEGIN
    update user set firstname = in_lastname where user_id = user_id;
END;

//

-- View all existing users.
-- Only chosen columns are displayed due to sensitive data stored in the same table as the other information.

create procedure view_all_users()
BEGIN
    select user_id, username, email, contactno from user where is_deleted = 0;
END;

//

create procedure view_all_is_deleted_users()
BEGIN
  select * FROM user WHERE is_deleted = 1;
END;
//

create procedure view_admins()
BEGIN
    select user_id, username, email, contactno from user where is_deleted = 0 and user_type = 1;
END;

//

create procedure view_general_users()
BEGIN
    select user_id, username, email, contactno from user where is_deleted = 0;
END;

//

create procedure search_by_id(in id int(11))
BEGIN
    select username, email, contactno from user where user_id = id;
END;

//

create procedure search_by_username(in username varchar(50))
BEGIN
    select username, email, contactno from user where username = username;
END;
//

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------




-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- This section is dedicated for restaurant table procedures.
create procedure addRestaurant(in name varchar(30), in type varchar(20), in price varchar(1), in open_time time, in close_time time, in address varchar(50), in latitude float, in longitude float)
BEGIN
    insert into restaurant(restaurant_name, restaurant_type, restaurant_price, restaurant_openingtime, restaurant_closingtime, restaurant_address, latitude, longitude) values (name, type, price, open_time, close_time, address, latitude, longitude);
END;

//

-- Use this procedure if you intend to update the information of the whole restaurant object.
-- Be sure to display the current information of the restaurant to user so that information will still be intact.

create procedure updateRestaurant(in id int(10), in name varchar(30), in rating float(4,2), in likes int(11), in type varchar(20), in price varchar(1), in open_time time, in close_time time, in address varchar(50), in latitude float, in longitude float)
BEGIN
    update restaurant set restaurant_name = name, restaurant_rating = rating, restaurant_likes = likes, restaurant_type = type, restaurant_price = price, restaurant_openingtime = open_time, restaurant_closingtime = close_time, restaurant_address = address, latitude = latitude, longitude = longitude where restaurant_id = id;
END;

//

------------------------------------------------------------------------------------------------------------------------------------------------------------------
--- Methods for updating individual fields of the restaurant table.
create procedure deleteRestaurant(in id int(10))
BEGIN
    delete from restaurant where restaurant_id = id;
END;

//

create procedure softDeleteRestaurant(in id int(10))
BEGIN
    update restaurant set is_deleted = 1 where restaurant_id = id;
END;

//

create procedure updateRestoRating(in average float(3, 2), in id int)
BEGIN
	update restaurant set restaurant_rating = average where restaurant_id = id;
END;

//

create procedure updateRestaurantName(in id int(10), in newName varchar(30))
BEGIN
    update restaurant set restaurant_name = newName where restaurant_id = id;
END;

//

create procedure updateRestaurantType(in id int(10), in type varchar(20))
BEGIN
    update restaurant set restaurant_type = type where restaurant_id = id;
END;

//

create procedure updateOpeningTime(in id int(10), in open_time time)
BEGIN
    update restaurant set restaurant_openingtime = open_time where restaurant_id = id;
END;

//

create procedure updateClosingTime(in id int(10), in close_time time)
BEGIN
    update restaurant set restaurant_closingtime = close_time where restaurant_id = id;
END;

//

create procedure updateAddress(in id int(10), in address varchar(50))
BEGIN
    update restaurant set restaurant_address = address where restaurant_id = id;
END;

//

create procedure updateCoordinates(in id int(10), in latitude float, in longitude float)
BEGIN
    update restaurant set latitude = latitude, longitude = longitude where restaurant_id = id;
END;

//

create procedure updateLikeCount(in id int(10), in likeCount int)
BEGIN
	update restaurant set restaurant_likes = likeCount where restaurant_id = id;
END;

//

create procedure viewAllRestoAsc()
BEGIN
    select restaurant_name, restaurant_cuisine, restaurant_type, restaurant_price, restaurant_rating, restaurant_likes, restaurant_openingtime, restaurant_closingtime, restaurant_address from restaurant where is_deleted = 0 order by restaurant_name;
END;

//

create procedure viewAllRestoDesc()
BEGIN
    select restaurant_name, restaurant_cuisine, restaurant_type, restaurant_price, restaurant_rating, restaurant_likes, restaurant_openingtime, restaurant_closingtime, restaurant_address from restaurant where is_deleted = 0 order by restaurant_name desc;
END;

//

create procedure viewRestaurantByLikes()
  BEGIN
    select * FROM restaurant WHERE is_deleted = 0 ORDER BY restaurant_likes DESC;
  END;

//

create procedure viewRestaurantByRating()
  BEGIN
    select * FROM restaurant WHERE is_deleted = 0 ORDER BY restaurant_rating DESC;
  END;
//

create procedure viewRestaurantByType()
  BEGIN
    select * FROM restaurant WHERE is_deleted = 0 ORDER BY restaurant_type;
  END;
//

create procedure viewRestaurantByPriceAsc()
  BEGIN
    select * FROM restaurant WHERE is_deleted = 0 ORDER BY restaurant_price ASC;
  END;
//

create procedure viewRestaurantByPriceDesc()
  BEGIN
    select * FROM restaurant WHERE is_deleted = 0 ORDER BY restaurant_price ASC;
  END;
//

create procedure viewRestaurantByPriceSrch(in price varchar(1))
  BEGIN
    select * FROM restaurant WHERE is_deleted = 0 AND restaurant_price = price;
  END;
//

create procedure viewTopRatedRestaurant()
	BEGIN
		select * FROM restaurant WHERE is_deleted = 0 ORDER BY restaurant_rating LIMIT 10;
	END;
//


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- This space describes procedures for the comments table.

create procedure addComment(in content varchar(250), in user_id int, in restaurant_id int)
BEGIN
    insert into comment(comment_content, user_id, restaurant_id) values (content, user_id, restaurant_id);
END;

//

create procedure deleteComment(in cID int)
BEGIN
  delete from comment where comment_id = cID;
END;

//

create procedure viewCommentsByRestoID(in resto_id int)
BEGIN
  select user_id, comment_content from comment where restaurant_id = resto_id;
END;

//

create procedure viewCommentsByUserID(in uID int)
BEGIN
  select comment_content, restaurant_id from comment where user_id = uID;
END;

//
--
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- This space describes procedures for the likes table.

create procedure addLikes(in uID int, in restoID int)
BEGIN
  declare likeCount int;
  insert into likes(user_id, restaurant_id) values (uID, restoID);
  select count(restoID) from likes into likeCount;
  call updateLikeCount(restoId, likeCount);
END;

//

create procedure unlike(in id int)
BEGIN
  delete from likes where like_id = id;
END;

//

create procedure countRestaurantLikes(in resto_ID int)
  BEGIN
    select count(like_id) from likes where restaurant_id = resto_ID;
  END;

//

create procedure view_usernames_of_likers(restoID int)
  BEGIN
    select username from user join likes on user.user_id = likes.user_id where likes.restaurant_id = restoID;
  END;

//
--
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- This is dedicated to rating table procedure.
create procedure addNewRating(in uID int, in rID int, in rate float(3, 2))
BEGIN
  declare average float;
  insert into rating(user_id, restaurant_id, rating) values(uID, rID, rate);
  select avg(rating) from rating where restaurant_id = rID into average;
  call updateRestoRating(average, rID);
END;

//

create procedure avgRestaurantRating(in restoID int)
BEGIN
  select avg(rating) as Average from rating where restaurant_id = restoID;
END;

//
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- This section is dedicated to activity_log table procedures.

create procedure viewAllActivities()
  BEGIN
    select username, log_details, created_at from activity_log order by created_at;
  END;

//

create procedure viewUsernameActivities(in uname varchar(30))
  BEGIN
    select log_details, created_at from activity_log where username = uname order by created_at;
  END;

//
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- This section is dedicated to photo_restaurant table procedures.

create procedure addPhotoToRestaurant(in ppath varchar(100), in uID int, in resto_id int)
  BEGIN
    insert into photorestaurant(photo_path, user_id, restaurant_id) values (ppath, uID, resto_id);
  END;

//

create procedure deletePhotoOfRestaurant(in phresID int(10))
  BEGIN
    delete from photorestaurant where photorestaurant_id = phresID;
  END;

//

create procedure softDeletePhotoOfRestaurant(in phresID int(10))
  BEGIN
    update photorestaurant set is_deleted = 1 where photorestaurant_id = phresID;
  END;

//

create procedure viewAllRestoPhotos()
  BEGIN
    select user_id, photo_path, restaurant_id from photorestaurant where is_deleted = 0;
  END;

//

create procedure viewRestoPhotosByUser(in uID int)
  BEGIN
    select photo_path, restaurant_id from photorestaurant where user_id = uID and is_deleted = 0;
  END;

//

create procedure viewRestoPhotosByID(in resto_ID int)
  BEGIN
    select user_id, photo_path from photorestaurant where restaurant_id = resto_ID and is_deleted = 0;
  END;

//

create procedure viewSpecificRestoPhoto(in phresID int)
  BEGIN
    select user_id, photo_path, restaurant_id from photorestaurant where photorestaurant_id = phresID;
  END;

//
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- This section is dedicated for photocomment procedures.

create procedure addPhotoToComment(in ppath varchar(100), in uID int, in resto_id int, in cmt_id int)
  BEGIN
    insert into photocomment(photo_path, user_id, restaurant_id, comment_id) values (ppath, uID, resto_id, cmt_id);
  END;

//

create procedure deletePhotoOfComment(in phcmtID int(10))
  BEGIN
    delete from photocomment where photocomment_id = phcmtID;
  END;

//

create procedure softDeletePhotoOfComment(in phcmtID int(10))
  BEGIN
    update photocomment set is_deleted = 1 where photocomment_id = phcmtID;
  END;

//

create procedure viewCommentPhotosByUser(in uID int)
  BEGIN
    select photo_path, restaurant_id, comment_id from photocomment where user_id = uID and is_deleted = 0;
  END;

//

create procedure viewCommentPhotosByRestoID(in resto_ID int)
  BEGIN
    select user_id, photo_path, comment_id from photocomment where restaurant_id = resto_ID and is_deleted = 0;
  END;

//

create procedure viewCommentPhotosByCommentID(in cmtID int)
  BEGIN
    select user_id, photo_id, restaurant_id from photocomment where comment_id = cmtID;
  END;

//
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- This section is dedicated to the report table.

create procedure addReport(in details varchar(200), in category varchar(50), in reporter int,in resto_ID int)
  BEGIN
    insert into report(report_details, report_category, reported_by,restaurant_id) values(details, category, reporter,resto_ID);
  END;

//

create procedure resolveReport(in repID int, in admin int)
  BEGIN
    update report set is_resolved = 1, resolved_by = admin where report_id = repID;
  END;

//

create procedure viewUnresolvedReports()
  BEGIN
    select report_category, report_details, reported_by, created_at from report where is_resolved = 0 order by created_at;
  END;

//

create procedure viewResolvedReports()
  BEGIN
    select report_category, report_details, reported_by, resolved_by, created_at from report where is_resolved = 1 order by created_at;
  END;

//

create procedure viewUnresolvedReportsByCategory(in category varchar(50))
  BEGIN
    select report_details, reported_by, created_at from report where is_resolved = 0 and report_category = category order by created_at;
  END;

//

create procedure viewResolvedReportsByCategory(in category varchar(50))
  BEGIN
    select report_details, reported_by, resolved_by, created_at from report where is_resolved = 1 and report_category = category order by created_at;
  END;

//
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- This section is dedicated to the cuisine table.

create procedure addCuisine(in cuiId int, in restoId int, in cuisineName varchar(20))
  BEGIN
    insert into cuisines(cuisine_id,restaurant_id,cuisine_name) values(cuiId,restoId,cuisineName);
  END;

//

create procedure updateCuisine(in cuiId int, in cuisineName varchar(20))
  BEGIN
    update cuisines set cuisine_name = cuisineName where cuisine_id = cuiId;
  END;

//

create procedure deleteCuisinebyResto(in restoId int)
  BEGIN
    delete from cuisines where restaurant_id = restoId;
  END;

//

create procedure deleteCuisinebyId(in cuiId int)
  BEGIN
    delete from cuisines where cuisine_id = cuiId;
  END;

//

create procedure viewCuisinebyResto(in restoId int)
  BEGIN
    select cuisine_name from cuisines where restaurant_id = restoId;
  END;
//
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

create procedure addDay(in dayId int,in restoId int, in openId int)
	BEGIN
		insert into open_days(day_id,restaurant_id,day_open) values(dayId,restoId,openId);
	END;
//

create procedure updateDay(in dayId int,in restoId int, in openId int)
	BEGIN
		update day_open set day_open = openId,restaurant_id = restoId where day_id = day_id;
	END;
//

create procedure deleteDay(in dayId int)
	BEGIN
		delete from open_days where day_id = dayId;
	END;
//

create procedure deleteDaybyResto(in restoId int)
	BEGIN
		delete from open_days where restaurant_id = restoId;
	END;
//

create procedure viewDayOpenbyResto(in restoId int)
	BEGIN
		select day_open from open_days where restaurant_id = restoId;
	END;
//

create procedure viewDayOpenbyRestobyDay(in dayIn varchar(20))
	BEGIN
		select restaurant_id from open_days where day_open = dayIn;
	END;
//


delimiter ;
