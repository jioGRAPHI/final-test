delimiter //
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Comment triggers.
drop trigger if exists add_comment;
create trigger add_comment after insert on comment for each row
    begin
        declare var_user varchar(50);
        declare table_name varchar(50);
        declare resto_name varchar(100);
        select username from user where user_id = new.user_id into var_user;
        select "comment" into table_name;
        select restaurant_name from restaurant where restaurant_id = new.restaurant_id into resto_name;
        insert into
            activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        values
            (new.user_id, var_user, concat("commented on ", resto_name,"'s page."), table_name, new.restaurant_id, resto_name);
    end;

//

drop trigger if exists delete_comment;
create trigger delete_comment after delete on comment for each row
    begin
        declare var_user varchar(50);
        declare table_name varchar(50);
        declare resto_name varchar(100);
        select username from user where user_id = old.user_id into var_user;
        select "comment" into table_name;
        select restaurant_name from restaurant where restaurant_id = old.restaurant_id into resto_name;
        insert into
            activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        values
            (old.user_id, var_user, concat("deleted comment on ", resto_name, "'s page."), table_name, old.restaurant_id, resto_name);
    end;

//

drop trigger if exists edit_comment;
create trigger edit_comment after update on comment for each row
    begin
        declare var_user varchar(50);
        declare table_name varchar(50);
        declare resto_name varchar(100);
        select username from user where user_id = old.user_id into var_user;
        select "comment" into table_name;
        select restaurant_name from restaurant where restaurant_id = old.restaurant_id into resto_name;
        if not (new.content <=> old.content)
        then
            insert into
                activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
            values
                (old.user_id, var_user, concat("edited comment on ", resto_name, "'s page."), table_name, old.restaurant_id, resto_name);
        end if;
    end;

//
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
delimiter ;
