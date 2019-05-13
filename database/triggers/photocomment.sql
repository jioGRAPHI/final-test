delimiter //
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- PhotoComment Triggers --
drop trigger if exists add_photo_to_comment;
create trigger add_photo_to_comment after insert on photocomment for each row
    begin
        declare var_user varchar(50);
        declare table_name varchar(50);
        declare resto_name varchar(100);
        select username from user where user_id = new.user_id into var_user;
        select "photocomment" into table_name;
        select restaurant_name from restaurant where restaurant_id = new.restaurant_id into resto_name;
        insert into
            activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        values
            (new.user_id, var_user, concat("added photo to a comment in ", resto_name, "'s page."), table_name, new.comment_id, concat(" comment from ", var_user, " on ", resto_name, "'s page"));
    end;
//

drop trigger if exists delete_photo_from_comment;
create trigger delete_photo_from_comment after delete on photocomment for each row
	begin
		declare var_user varchar(50);
		declare table_name varchar(50);
		declare resto_name varchar(100);
		select username from user where user_id = old.user_id into var_user;
		select "photocomment" into table_name;
		select restaurant_name from restaurant where restaurant_id = old.restaurant_id into resto_name;
		insert into
			activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
		values
			(old.user_id, var_user, concat("deleted photo on a comment in ", resto_name, "'s page."), table_name, old.comment_id, concat(" comment from ", var_user, " on ", resto_name, "'s page"));
	end;
//
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
delimiter ;
