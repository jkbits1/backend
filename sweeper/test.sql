 INSERT INTO stage.websubmission_driver 
  ( "IPAddress", "DriverCollectionZIP", "DriverCollectionRadius", 
    "AvailableDriveTimesJSON", "DriverCanLoadRiderWithWheelchair", 
    "SeatCount", "DriverHasInsurance", "DriverInsuranceProviderName", 
    "DriverInsurancePolicyNumber", "DriverLicenseState", "DriverLicenseNumber", 
    "DriverFirstName", "DriverLastName", "PermissionCanRunBackgroundCheck", 
    "DriverEmail", "DriverPhone", "DriverAreaCode", "DriverEmailValidated", 
    "DriverPhoneValidated", "DrivingOnBehalfOfOrganization", "DrivingOBOOrganizationName", 
    "RidersCanSeeDriverDetails", "DriverWillNotTalkPolitics", "ReadyToMatch", 
    "PleaseStayInTouch") 
  values
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,         $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)

SELECT 
  "IPAddress", "DriverCollectionZIP", "DriverCollectionRadius", 
  "AvailableDriveTimesJSON", "DriverCanLoadRiderWithWheelchair", 
  "SeatCount", "DriverHasInsurance", "DriverInsuranceProviderName", 
  "DriverInsurancePolicyNumber", "DriverLicenseState", "DriverLicenseNumber", 
  "DriverFirstName", "DriverLastName", "PermissionCanRunBackgroundCheck", 
  "DriverEmail", "DriverPhone", "DriverAreaCode", "DriverEmailValidated", 
  "DriverPhoneValidated", "DrivingOnBehalfOfOrganization", "DrivingOBOOrganizationName", 
  "RidersCanSeeDriverDetails", "DriverWillNotTalkPolitics", "ReadyToMatch", 
  "PleaseStayInTouch" 
FROM
 stage.websubmission_driver
WHERE 
  "TimeStamp" > timestamp '2000-01-01'

INSERT INTO nov2016.driver
  ( "Name",
    "Phone",
    "Email"
  )
values
  ('bill', '124 4567', 'b@test.com')

INSERT INTO 
  nov2016.rider ("Name")     
SELECT "RiderFirstName" FROM stage.websubmission_rider 
WHERE "CreatedTimeStamp" > timestamp '2000-01-01'

CREATE TABLE stage.status_rider
( 
  "RiderID" integer NOT NULL DEFAULT nextval('nov2016."RIDER_RiderID_seq"'::regclass),
  "status" integer NOT NULL DEFAULT 1,
  "CreatedTimeStamp" timestamp without time zone NOT NULL
)
WITH (
  OIDS=FALSE
);
ALTER TABLE stage.websubmission_rider
  OWNER TO carpool_admins;
GRANT ALL ON TABLE stage.websubmission_rider TO carpool_admins;
GRANT INSERT ON TABLE stage.websubmission_rider TO carpool_web_role;
GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE stage.websubmission_rider TO carpool_role;

select * from nov2016.rider;
delete from nov2016.rider;

INSERT INTO 
  stage.status_rider ("CreatedTimeStamp")     
SELECT "CreatedTimeStamp" FROM stage.websubmission_rider 
WHERE "CreatedTimeStamp" > timestamp '2000-01-01'

INSERT INTO 
  nov2016.rider ("Name")     
SELECT "RiderFirstName" FROM stage.websubmission_rider 
WHERE "CreatedTimeStamp" > timestamp '2000-01-01'

INSERT INTO 
  stage.status_rider ("CreatedTimeStamp")     
SELECT "CreatedTimeStamp" FROM stage.websubmission_rider 
WHERE "CreatedTimeStamp" > timestamp '2000-01-01';

select * from stage.status_rider;
select MAX("CreatedTimeStamp") from stage.status_rider;

delete from stage.status_rider;

DROP FUNCTION stage.create_riders();

-- NOTE: all code in a function exists in a transaction.
--       either it all succeeds or it is all rolled back
CREATE FUNCTION stage.create_riders() RETURNS timestamp AS $$
DECLARE
    tstamp timestamp := '2000-01-01';
BEGIN
    RAISE NOTICE 'tstamp here is %', tstamp; 

    -- get timestamp of unprocessed riders 
    IF EXISTS (select 1 from stage.status_rider) THEN
      select MAX("CreatedTimeStamp") into tstamp from stage.status_rider;
    ELSE 
      tstamp := '2010-01-01';
    END IF;

    -- create intermediate table of timestamps, processed flag and driverId
    INSERT INTO 
      stage.status_rider ("CreatedTimeStamp")     
    SELECT 
      "CreatedTimeStamp" FROM stage.websubmission_rider 
    WHERE 
      "CreatedTimeStamp" > tstamp;

    -- create riders in nov2016 db
    -- only insert riders in intermediate tables, and with status == 1
    -- ?? timestamp to be creation of nov2016 row, or original submission ??
    INSERT INTO 
      nov2016.rider 
        (
        "RiderID", "Name", "Phone", "Email", "EmailValidated",
        "State", "City", "Notes", "DataEntryPoint", "VulnerablePopulation",
        "NeedsWheelChair", "Active"
        )     
    SELECT
      stage.status_rider."RiderID",
      concat_ws(' ', 
                stage.websubmission_rider."RiderFirstName"::text, 
                stage.websubmission_rider."RiderLastName"::text) 
      ,
      stage.websubmission_rider."RiderPhone",
      stage.websubmission_rider."RiderEmail",
      stage.websubmission_rider."RiderEmailValidated"::int::bit,

      stage.websubmission_rider."RiderVotingState",
      'city?',
      'notes?',
      'entry?',
      stage.websubmission_rider."RiderIsVulnerable"::int::bit,

      stage.websubmission_rider."WheelchairCount"::bit,
      true::int::bit
    FROM 
      stage.websubmission_rider
    INNER JOIN 
      stage.status_rider 
    ON 
      (stage.websubmission_rider."CreatedTimeStamp" = stage.status_rider."CreatedTimeStamp") 
    WHERE 
          stage.websubmission_rider."CreatedTimeStamp" > tstamp 
      AND stage.status_rider.status = 1;
    
    UPDATE 
      stage.status_rider
    SET
      status = 100
    WHERE
          stage.status_rider."CreatedTimeStamp" > tstamp 
      AND stage.status_rider.status = 1;

    -- RAISE EXCEPTION 'Nonexistent ID --> %', user_id
    --   USING HINT = 'Please check your user ID';

    RETURN tstamp;
END;
$$ LANGUAGE plpgsql;

drop FUNCTION stage.create_riders();

delete from stage.status_rider;
delete from nov2016.rider;

select stage.createRiders();

select * from stage.status_rider order by "CreatedTimeStamp";
select * from nov2016.rider order by "CreatedTimestamp";