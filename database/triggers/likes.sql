delimiter //

------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Sample triggers for likes.

drop trigger if exists likeResto;
create trigger likeResto after insert on likes for each row
    begin
        declare likeCount int;
        declare varUser varchar(50);
        declare table_name varchar(50);
        declare resto_name varchar(100);
        select username from user where user_id = new.user_id into varUser;
        select "likes" into table_name;
        select restaurant_name from restaurant where restaurant_id = new.restaurant_id into resto_name;
        insert into
            activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        values
            (new.user_id, varUser, concat("liked restaurant ", resto_name), table_name, new.restaurant_id, resto_name);
        select count(restaurant_id) from likes where restaurant_id = new.restaurant_id into likeCount;
        update restaurant set restaurant_likes = likeCount where restaurant_id = new.restaurant_id;
    END;
//

drop trigger if exists unlikeResto;
create trigger unlikeResto after delete on likes for each row
    begin
        declare likeCount int;
        declare varuser varchar(50);
        declare table_name varchar(50);
        declare resto_name varchar(100);
        select username from user where user_id = old.user_id into varUser;
        select "likes" into table_name;
        select restaurant_name from restaurant where restaurant_id = old.restaurant_id into resto_name;
        insert into
            activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        values
            (old.user_id, varuser, concat("unliked restaurant ", resto_name), table_name, old.restaurant_id ,resto_name);
        select count(restaurant_id) from likes where restaurant_id = old.restaurant_id into likeCount;
        update restaurant set restaurant_likes = likeCount where restaurant_id = old.restaurant_id;
    END;
//
------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------
delimiter ;
