delimiter //

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Restaurant table triggers --
drop trigger if exists add_restaurant;
create trigger add_restaurant after insert on restaurant for each row
    begin
        declare varUser varchar(50);
        declare table_name varchar(50);
        select username from user where user_id = new.added_by into varUser;
        select "restaurant" into table_name;
        insert into
            activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        values
            (new.added_by, varUser, "added to the restaurants list", table_name, new.restaurant_id, new.restaurant_name);
    end;
//

drop trigger if exists delete_restaurant;
create trigger delete_restaurant after delete on restaurant for each row
    begin
        declare varUser varchar(50);
        declare table_name varchar(50);
        select username from user where user_id = old.updated_by into varUser;
        select "restaurant" into table_name;
        insert into
            activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        values
            (old.updated_by, varUser, "deleted restaurant", table_name, old.restaurant_id, old.restaurant_name);
    end;
//

drop trigger if exists update_restaurant;
CREATE TRIGGER update_restaurant after UPDATE ON restaurant for each row
BEGIN
	DECLARE varUser varchar(50);
    declare table_name varchar(50);
	SELECT username from user where user_id = old.updated_by INTO varUser;
    select "restaurant" into table_name;
    if not(new.restaurant_name <=> old.restaurant_name)
    THEN
        INSERT INTO
            activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        VALUES
	       (old.updated_by, varUser, concat("updated restaurant name to ", new.restaurant_name), table_name, old.restaurant_id , old.restaurant_name);

    end if;

    if not(new.restaurant_likes <=> old.restaurant_likes)
    THEN
        INSERT INTO
	      activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        VALUES
	       (old.updated_by, varUser, concat("updated the number of likes to ", new.restaurant_likes), table_name, old.restaurant_id, old.restaurant_name);
    end if;

    if not(new.restaurant_type <=> old.restaurant_type)
    THEN
        INSERT INTO
            activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        VALUES
            (old.updated_by, varUser, concat("updated the restaurant type to ", new.restaurant_type), table_name, old.restaurant_id, old.restaurant_name);
    end if;

    if not(new.restaurant_price <=> old.restaurant_price)
    THEN
        INSERT INTO
            activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        VALUES
            (old.updated_by, varUser, concat("updated the price range to ", new.restaurant_price), table_name, old.restaurant_id, old.restaurant_name);
    end if;

    if not(new.restaurant_openingtime <=> old.restaurant_openingtime)
    THEN
        INSERT INTO
            activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        VALUES
            (old.updated_by, varUser, concat("updated the opening time to ", time_format(new.restaurant_openingtime, "%h:%i %p")), table_name, old.restaurant_id, old.restaurant_name);
    end if;

    if not(new.restaurant_closingtime <=> old.restaurant_closingtime)
    THEN
        INSERT INTO
            activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        VALUES
            (old.updated_by, varUser, concat("updated the closing time to ", time_format(new.restaurant_closingtime, "%h:%i %p")), table_name, old.restaurant_id, old.restaurant_name);
    end if;

    if not(new.restaurant_address <=> old.restaurant_address)
    THEN
        INSERT INTO
            activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        VALUES
            (old.updated_by, varUser, concat("updated the restaurant address to ", new.restaurant_address), table_name, old.restaurant_id, old.restaurant_name);
    end if;

    if not(new.latitude <=> old.latitude)
    THEN
        INSERT INTO
            activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        VALUES
            (old.updated_by, varUser, concat("updated the latitude to ", new.latitude), table_name, old.restaurant_id, old.restaurant_name);
    end if;

    if not(new.longitude <=> old.longitude)
    THEN
        INSERT INTO
            activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        VALUES
            (old.updated_by, varUser, concat("updated the longitude to ", new.longitude), table_name, old.restaurant_id, old.restaurant_name);
    end if;

    if not(new.is_deleted <=> old.is_deleted)
    THEN
        INSERT INTO
            activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
        VALUES
            (old.updated_by, varUser, "initiated a soft delete" , table_name, old.restaurant_id, old.restaurant_name);
    end if;
END;
//
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
delimiter ;
