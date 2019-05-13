delimiter //
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
drop trigger if exists add_cuisine;
create trigger add_cuisine after insert on cuisines for each row
	begin
		declare added_by int;
		declare var_user varchar(50);
		declare table_name varchar(50);
		declare resto_name varchar(100);
		select updated_by from restaurant where restaurant_id = new.restaurant_id into added_by;
		select username from user where user_id = added_by into var_user;
		select restaurant_name from restaurant where restaurant_id = new.restaurant_id into resto_name;
		select "cuisines" into table_name;
		insert into
			activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
		values
			(added_by, var_user, concat("added cuisine type for ", resto_name), table_name, new.cuisine_id, concat("cuisine type of ", resto_name));
	end;
//


drop trigger if exists edit_cuisines;
create trigger edit_cuisines after update on cuisines for each row
	begin
		declare added_by int;
		declare var_user varchar(50);
		declare resto_name varchar(100);
		select updated_by from restaurant where restaurant_id = old.restaurant_id into added_by;
		select username from user where user_id = added_by into var_user;
		select restaurant_name from restaurant where restaurant_id = old.restaurant_id into resto_name;
		if not (new.cuisine_name <=> old.cuisine_name)
		then
			insert into
				activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
			values
				(added_by, var_user, concat("edited cuisine type of ", resto_name), "cuisines", old.cuisine_id, concat("cuisine type/s of ", resto_name));
		end if;
	end;
//
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
delimiter ;