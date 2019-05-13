delimiter //

-----------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------
drop trigger if exists file_report;
create trigger file_report after insert on report for each row
	begin
		declare var_user varchar(50);
		declare resto_name varchar(100);
		declare table_name varchar(50);
		select username from user where user_id = new.reported_by into var_user;
		select restaurant_name from restaurant where restaurant_id = new.restaurant_id into resto_name;
		select "report" into table_name;
		insert into
			activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
		values
			(new.reported_by, var_user, "filed a report.", table_name, new.report_id, concat("report filed for ", resto_name));
	end;
//

drop trigger if exists resolve_report;
create trigger resolve_report after update on report for each row
	begin
		declare var_user varchar(50);
		declare resto_name varchar(100);
		declare table_name varchar(50);
		select username from user where user_id = new.resolved_by into var_user;
		select restaurant_name from restaurant where restaurant_id = new.restaurant_id into resto_name;
		select "report" into table_name;
		insert into
			activity_log(user_id, username, log_details, table_affected, affected_id, name_of_affected)
		values
			(new.resolved_by, var_user, "resolved a report. ", table_name, new.report_id, concat("report filed for ", resto_name));
	end;
//
-----------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------
delimiter ;