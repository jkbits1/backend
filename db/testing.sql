-- select * from stage.websubmission_driver where "UUID" LIKE '01cc%';

--select * from stage.websubmission_driver where "UUID" = 'f6c3%';
--select * from stage.websubmission_rider where "UUID" = 'f6c3%';

-- select * from stage.websubmission_driver where "DriverFirstName" LIKE 'R%';
--select * from stage.websubmission_driver where "DriverLastName" LIKE 'c%';
-- select * from stage.websubmission_rider where "UUID" = 'f6c3%';
--select * from stage.websubmission_driver order by "DriverLastName" ;
--select * from stage.websubmission_driver order by "state" ;
--select * from stage.websubmission_driver where state LIKE 'Cancel%' or state LIKE 'Pend%' order by "state" ;
--select MAX(created_ts), state from stage.websubmission_driver group by state;

-- select state, websubmission_driver."UUID", websubmission_driver."DriverLastName" from stage.websubmission_driver group by "state" ;
-- select state, count(*) from stage.websubmission_driver group by "state" ;
--select websubmission_driver."DriverFirstName", websubmission_driver."DriverLastName" from stage.websubmission_driver where state LIKE 'Cance%' order by websubmission_driver."DriverLastName";
select * from stage.websubmission_driver where "DriverLastName" LIKE 'v%';

--select * from nov2016.outgoing_sms where "body" LIKE '%8fe8%';
--select body from nov2016.outgoing_sms where "body" LIKE '%8fe8%';

-- select * from stage.websubmission_driver where created_ts > '1 November 2016' order by created_ts limit 50
