-- select * from stage.websubmission_driver where "UUID" = '01cca29a-3608-45ec-8daf-8b02addad1c9';
-- select * from stage.websubmission_driver where "UUID" LIKE '01cc%';

--select * from stage.websubmission_driver where "UUID" = 'f6c34ebf%';
--select * from stage.websubmission_rider where "UUID" = 'f6c34ebf%';

-- select * from stage.websubmission_driver where "UUID" = 'f6c34ebf-b0b1-414f-98d4-a8db43ee7587';
-- select * from stage.websubmission_rider where "UUID" = 'f6c34ebf-b0b1-414f-98d4-a8db43ee7587';

-- select * from stage.websubmission_driver where "DriverFirstName" LIKE 'Ric%';
--select * from stage.websubmission_driver where "DriverLastName" LIKE 'Cle%';
-- select * from stage.websubmission_rider where "UUID" = 'f6c34ebf%';
--select * from stage.websubmission_driver order by "DriverLastName" ;
--select * from stage.websubmission_driver order by "state" ;
--select * from stage.websubmission_driver where state LIKE 'Cancel%' or state LIKE 'Pend%' order by "state" ;
--select MAX(created_ts), state from stage.websubmission_driver group by state;

-- select state, websubmission_driver."UUID", websubmission_driver."DriverLastName" from stage.websubmission_driver group by "state" ;
-- select state, count(*) from stage.websubmission_driver group by "state" ;
--select websubmission_driver."DriverFirstName", websubmission_driver."DriverLastName" from stage.websubmission_driver where state LIKE 'Cance%' order by websubmission_driver."DriverLastName";
select * from stage.websubmission_driver where "DriverLastName" LIKE 'van cle%';

--select * from nov2016.outgoing_sms where "body" LIKE '%8fe8%';
-- "From CarpoolVote.com\nDriver offer received! Ref: 8fe80b66-0676-4814-8e4f-bb6b31fe493a\nPick-up ZIP : 33139\nRadius : 10\nDrive Times  : 2016/11/07 09:00-2016/11/07 19:00,2016/11/08 09:00-2016/11/08 20:00\nSeats : 3\nWheelchair accessible : No\nPhone Numbe (...)"
--select body from nov2016.outgoing_sms where "body" LIKE '%8fe8%';

-- select * from stage.websubmission_driver where created_ts > '1 November 2016' order by created_ts limit 50
