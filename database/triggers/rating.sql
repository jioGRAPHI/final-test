delimiter //

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Sample rating triggers --

drop trigger if exists add_rating;
create trigger add_rating after insert on rating for each row
    begin
        declare avgRating float(3,2);
        declare varUser varchar(50);
        declare restoName varchar(100);
        select username from user where user_id = new.user_id into varUser;
        select restaurant_name from restaurant where restaurant_id = new.restaurant_id into restoName;

        insert into
            activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        values
            (new.user_id, varUser, concat("rated restaurant ", restoName, " with ", new.rating), "rating", new.restaurant_id, restoName);

        select avg(rating) from rating where restaurant_id = new.restaurant_id into avgRating;
        update restaurant set restaurant_rating = avgRating where restaurant_id = new.restaurant_id;
    end;

//

drop trigger if exists delete_rating;
create trigger delete_rating after delete on rating for each row
    begin
        declare avgRating float(3, 2);
        declare varUser varchar(50);
        declare restoName varchar(100);
        select username from user where user_id = old.user_id into varUser;
        select restaurant_name from restaurant where restaurant_id = old.restaurant_id into restoName;

        insert into
            activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        values
            (old.user_id, varUser, concat("deleted rating for restaurant ", restoName), "rating", old.restaurant_id, restoName);

        select avg(rating) from rating where restaurant_id = old.restaurant_id into avgRating;
        update restaurant set restaurant_rating = avgRating where restaurant_id = old.restaurant_id;
    end;

//

drop trigger if exists update_rating;
create trigger update_rating after update on rating for each row
    begin
        declare avgRating float(3, 2);
        declare varUser varchar(50);
        declare restoName varchar(100);
        select username from user where user_id = old.user_id into varUser;
        select restaurant_name from restaurant where restaurant_id = old.restaurant_id into restoName;

        if not (new.rating <=> old.rating)
        then
            insert into
                activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
            values
                (old.user_id, varUser, concat("updated rating for restaurant ", restoName), "rating", old.restaurant_id, restoName);
            select avg(rating) from rating where restaurant_id = old.restaurant_id into avgRating;
            update restaurant set restaurant_rating = avgRating where restaurant_id = old.restaurant_id;
        end if;
    end;

//
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
delimiter ;
