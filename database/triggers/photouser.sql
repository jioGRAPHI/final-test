delimiter //
--------------------------------------------------------------------------------------------------------------------
-- PhotoUser triggers
drop trigger if exists add_user_photo;
create trigger add_user_photo after insert on photouser for each row
	begin
		declare var_user varchar(50);
		declare table_name varchar(50);
		select username from user where user_id = new.user_id into var_user;
		select "photouser" into table_name;
		insert into
			activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
		values
			(new.user_id, var_user, "added photo to profile.", table_name, new.userphoto_id, concat("photo of ", var_user));
	end;
	
//

drop trigger if exists update_photo;
create trigger update_photo after update on photouser for each row
	begin
		declare var_user varchar(50);
		declare table_name varchar(50);
		select username from user where user_id = old.user_id into var_user;
		select "photouser" into table_name;
		if not (new.photo_path <=> old.photo_path)
		then
			insert into
				activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
			values
				(old.user_id, var_user, "updated profile picture.", table_name, old.userphoto_id, concat("photo of ", var_user));
		end if;
		if not (new.is_deleted <=> old.is_deleted)
		then
			insert into
				activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
			values
				(old.user_id, var_user, "discarded profile picture.", table_name, old.userphoto_id, concat("photo of ", var_user));
		end if;
	end;
	
//

drop trigger if exists delete_photo;
create trigger delete_photo after delete on photouser for each row
	begin
		declare var_user varchar(50);
		declare table_name varchar(50);
		select username from user where user_id = old.user_id into var_user;
		select "photouser" into table_name;
		insert into
				activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
			values
				(old.user_id, var_user, "deleted profile picture.", table_name, old.userphoto_id, concat("photo of ", var_user));
	end;
	
//
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
delimiter ;