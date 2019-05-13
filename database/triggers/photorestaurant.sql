delimiter //
------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------
drop trigger if exists add_photo_to_restaurant;
create trigger add_photo_to_restaurant after insert on photorestaurant for each row
	begin
		declare var_user varchar(50);
		declare table_name varchar(50);
		declare resto_name varchar(50);
		select username from user where user_id = new.user_id into var_user;
		select "photorestaurant" into table_name;
		select restaurant_name from restaurant where restaurant_id = new.restaurant_id into resto_name;
		insert into
			activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
		values
			(new.user_id, var_user, concat("added photo to ", resto_name), table_name, new.photorestaurant_id, concat("photo of ", resto_name));
	end;	
//

drop trigger if exists delete_photo_of_restaurant;
create trigger delete_photo_of_restaurant after delete on photorestaurant for each row
	begin
		declare var_user varchar(50);
		declare table_name varchar(50);
		declare resto_name varchar(50);
		select username from user where user_id = old.user_id into var_user;
		select "photorestaurant" into table_name;
		select restaurant_name from restaurant where restaurant_id = old.restaurant_id into resto_name;
		insert into
			activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
		values
			(old.user_id, var_user, concat("deleted photo of ", resto_name), table_name, old.photorestaurant_id, concat("photo of ", resto_name));
	end;
//
------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------

delimiter ;