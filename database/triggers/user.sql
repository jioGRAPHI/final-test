delimiter //

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- USER triggers --
DROP TRIGGER if exists add_user;
CREATE TRIGGER add_user after INSERT ON user for each row

BEGIN
	DECLARE varUser varchar(50);
	DECLARE table_name varchar(50);
	SELECT new.username INTO varUser;
	SELECT "user" INTO table_name;
INSERT INTO
	activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
VALUES
	(new.user_id, varUser,  " registered ", table_name, new.user_id, varUser);
END;

//

DROP TRIGGER if exists delete_user;
CREATE TRIGGER delete_user after delete on user for each row

BEGIN
	DECLARE varUser varchar(50);
	DECLARE table_name varchar(50);
	select old.username into varUser;
	select "user" into table_name;

	INSERT INTO
		activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
	VALUES
		(old.user_id, varUser, " deleted ", table_name, old.user_id, varUser);
END;

//

DROP TRIGGER if exists update_user;
CREATE TRIGGER update_user after UPDATE ON user for each row

BEGIN
	DECLARE varUser varchar(50);
	DECLARE table_name varchar(50);
	SELECT new.username INTO varUser;
	select "user" into table_name;

	if not(new.username <=> old.username)
	THEN
		INSERT INTO
			activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
		VALUES
			(old.user_id, varUser, concat("updated username to ", new.username), table_name, old.user_id, varUser);
	end if;


	if not(new.password <=> old.password)
	THEN
		INSERT INTO
			activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
		VALUES
			(old.user_id, varUser,concat("updated password to ", new.password), table_name, old.user_id, varUser);
	end if;

	if not(new.email <=> old.email)
	THEN
		INSERT INTO
			activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
		VALUES
			(old.user_id, varUser,concat("updated email to ", new.email), table_name, old.user_id, varUser);
	end if;

	if not(new.firstname <=> old.firstname)
	THEN
		INSERT INTO
			activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
		VALUES
			(old.user_id, varUser,concat("updated first name to ", new.firstname), table_name, old.user_id, varUser);
	end if;

	if not(new.lastname <=> old.lastname)
	THEN
		INSERT INTO
			activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
		VALUES
			(old.user_id, varUser,concat("updated last name to ", new.lastname), table_name, old.user_id, varUser);
	end if;


	if not(new.user_type <=> old.user_type)
	THEN
	INSERT INTO
		activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
	VALUES
		(old.user_id, varUser,concat("updated user type to ", new.user_type), table_name, old.user_id, varUser);
		end if;

	if not(new.is_deleted <=> old.is_deleted)
	THEN
	INSERT INTO
		activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
	VALUES
		(old.user_id, varUser,concat("updated soft delete details to ", new.is_deleted), table_name, old.user_id, varUser);
	end if;
END;
//

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

delimiter ;
