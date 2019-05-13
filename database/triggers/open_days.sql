delimiter //
-------------------------------------------------------------------------------------------------------------------------
-- Open_days triggers 
drop trigger if exists add_open_days;
create trigger add_open_days after insert on open_days for each row
	begin
		declare edited_by int;
		declare var_user varchar(50);
		declare resto_name varchar(100);
		declare table_name varchar(50);
		select updated_by from restaurant where restaurant_id = new.restaurant_id into edited_by;
		select username from user where user_id = edited_by into var_user;
		select restaurant_name from restaurant where restaurant_id = new.restaurant_id into resto_name;
		select "open_days" into table_name;
		insert into
			activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
		values
			(edited_by, var_user, concat("added operating days of ", resto_name), table_name, new.day_id, concat("open days of ", resto_name));
	end;
//


drop trigger if exists edit_open_days;
create trigger edit_open_days after update on open_days for each row
	begin
		declare edited_by int;
		declare var_user varchar(50);
		declare resto_name varchar(100);
		declare table_name varchar(50);
		select updated_by from restaurant where restaurant_id = old.restaurant_id into edited_by;
		select username from user where user_id = edited_by into var_user;
		select restaurant_name from restaurant where restaurant_id = old.restaurant_id into resto_name;
		select "open_days" into table_name;
		if not (new.day_open <=> old.day_open)
		then
			insert into
				activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
			values
				(edited_by, var_user, concat("updated open days of ", resto_name), table_name, old.day_id, concat("open days of ", resto_name));
		end if;
	end;
//

-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
delimiter ;