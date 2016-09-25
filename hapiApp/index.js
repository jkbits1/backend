'use strict';

const Hapi = require('hapi');

var config = require('./dbInfo.js');

var moment = require('moment');

var Pool = require('pg').Pool;
var pool = new Pool(config);

const server = new Hapi.Server();

const DEFAULT_PORT = 8000;
const SCHEMA_NAME = '"STAGE"';
const DRIVER_TABLE = '"WEBSUBMISSION_DRIVER"';

var appPort = DEFAULT_PORT;

if (process.env.NODE_ENV !== undefined) {
  console.error("NODE_ENV exists");

  if (process.env.NODE_ENV === "production") {
    console.error("NODE_ENV = production");

    appPort = process.env.PORT;
  }
  else if (process.env.NODE_ENV === "development") {
    console.error("NODE_ENV = development");
  }
  else {
    console.error("NODE_ENV = other");
  }
}
else {
  console.error("no NODE_ENV found");
}

server.connection({ port: appPort });

var rowId = 8;

server.route({
  method: 'GET',
  path: '/',
  handler: (req, reply) => {

    console.log(req.payload);

    pool.query('SELECT * FROM ' + SCHEMA_NAME + '.' + DRIVER_TABLE, (err, result) => {
      result.rows.forEach( val => console.log(val));

      reply('get received at carpool' + JSON.stringify(result.rows[0]));
    });
  }
});

server.route({
  method: 'POST',
  path: '/',
  handler: (req, reply) => {

    console.log(req.payload);

//     'INSERT INTO "NOV2016"."DRIVER"(Name, Phone, Email, EmailValidated, RideDate, RideTimeStart, RideTimeEnd, State, City, Origin, RiderDestination, Capability, Seats, DriverHasInsurance, Notes, Active, CreatedTimestamp, CreatedBy, ModifiedTimestamp, ModifiedBy) 
// values('George', '602-481-6000', 'testing2@ericanderson.com', '0', '2016-09-01T00:00:00.000Z', '12:00:00+00', '13:00:00+00', 'IL', 'CHICAGO', 'THE L2', 'THE POLLS', 'TBD', 4, '1',
//              'Notes on driver', '1', '2016-09-21T00:48:32.055Z', 'SYSTEM', '2016-09-21T00:48:32.055Z', 'SYSTEM')
             
// INSERT INTO "NOV2016"."DRIVER"
// values(3, 'Bill', '602-481-6000', 'testing2@ericanderson.com', '0', '2016-09-01T00:00:00.000Z', '12:00:00+00', '13:00:00+00', 'IL', 'CHICAGO', 'THE L2', 'THE POLLS', 'TBD', 4, '1',
//              'Notes on driver', '1', '2016-09-21T00:48:32.055Z', 'SYSTEM', '2016-09-21T00:48:32.055Z', 'SYSTEM')


        //  https://github.com/brianc/node-pg-pool    

        var timestampValue = // new Date().getTime();
               moment().utc().format("YYYY-MM-DDTHH:mm:ss") + "Z"

    pool.query(
      // {
    // name: 'insert driver',
    // text: 'INSERT INTO "NOV2016"."DRIVER"(Id, Name, Phone, Email, EmailValidated, RideDate, RideTimeStart, RideTimeEnd, State, City, Origin, RiderDestination, Capability, Seats, DriverHasInsurance, Notes, Active, CreatedTimestamp, CreatedBy, ModifiedTimestamp, ModifiedBy) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)',
    // values: [4, 'George', '602-481-6000', 'testing2@ericanderson.com', '0', '2016-09-01T00:00:00.000Z', '12:00:00+00', '13:00:00+00', 'IL', 'CHICAGO', 'THE L2', 'THE POLLS', 'TBD', 4, '1',
    //          'Notes on driver', '1', '2016-09-21T00:48:32.055Z', 'SYSTEM', '2016-09-21T00:48:32.055Z', 'SYSTEM']

    // text: 'INSERT INTO "NOV2016"."DRIVER" values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)',
    // values: [4, 'George', '602-481-6000', 'testing2@ericanderson.com', '0', '2016-09-01T00:00:00.000Z', '12:00:00+00', '13:00:00+00', 'IL', 'CHICAGO', 'THE L2', 'THE POLLS', 'TBD', 4, '1',
    //          'Notes on driver', '1', '2016-09-21T00:48:32.055Z', 'SYSTEM', '2016-09-21T00:48:32.055Z', 'SYSTEM']

    // text: 
    'INSERT INTO ' + SCHEMA_NAME + '.' + DRIVER_TABLE + ' values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)',
    // values: 
    [
              // '2016-09-01T00:00:00.000Z'
              timestampValue.toString()
              , '0.0.0.0', '60002', 20, 'after 10am', 
//   "TimeStamp" timestamp without time zone NOT NULL DEFAULT timezone('utc'::text, now()),
//   "IPAddress" character varying(20),
//   "DriverCollectionZIP" character varying(5) NOT NULL,
//   "DriverCollectionRadius" integer NOT NULL,
//   "AvailableDriveTimesJSON" character varying(2000),
              false, 2, false, 'ill. ins', '1234', 
//   "DriverCanLoadRiderWithWheelchair" boolean NOT NULL DEFAULT false,
//   "SeatCount" integer DEFAULT 1,
//   "DriverHasInsurance" boolean NOT NULL DEFAULT false,
//   "DriverInsuranceProviderName" character varying(255),
//   "DriverInsurancePolicyNumber" character varying(50),
              'IL', '1234', 'fred', 'smith', false,
//   "DriverLicenseState" character(2),
//   "DriverLicenseNumber" character varying(50),
//   "DriverFirstName" character varying(255) NOT NULL,
//   "DriverLastName" character varying(255) NOT NULL,
//   "PermissionCanRunBackgroundCheck" boolean NOT NULL DEFAULT false,
              'f@gmail.xxx', '555-123-4567', 555, false, false, 
//   "DriverEmail" character varying(255),
//   "DriverPhone" character varying(20),
//   "DriverAreaCode" integer,
//   "DriverEmailValidated" boolean NOT NULL DEFAULT false,
//   "DriverPhoneValidated" boolean NOT NULL DEFAULT false,
              false, 'misc', false, false, false, 
//   "DrivingOnBehalfOfOrganization" boolean NOT NULL DEFAULT false,
//   "DrivingOBOOrganizationName" character varying(255),
//   "RidersCanSeeDriverDetails" boolean NOT NULL DEFAULT false,
//   "DriverWillNotTalkPolitics" boolean NOT NULL DEFAULT false,
//   "ReadyToMatch" boolean NOT NULL DEFAULT false,

              false
//   "PleaseStayInTouch" boolean NOT NULL DEFAULT false
            ]

//  DriverID: 2,
//   Name: 'John Smith',
//   Phone: '602-481-6000',
//   Email: 'testing2@ericanderson.com',
//   EmailValidated: '0',
//   RideDate: 2016-09-01T00:00:00.000Z,
//   RideTimeStart: '16:00:00+00',
//   RideTimeEnd: '17:00:00+00',
//   State: 'IL',
//   City: 'CHICAGO',
//   Origin: 'THE L',
//   RiderDestination: 'THE POLLS',
//   Capability: 'TBD',
//   Seats: 3,
//   DriverHasInsurance: '1',
//   Notes: 'Notes Go Here',
//   Active: '1',
//   CreatedTimestamp: 2016-09-21T00:48:32.055Z,
//   CreatedBy: 'SYSTEM',
//   ModifiedTimestamp: 2016-09-21T00:48:32.055Z,
//   ModifiedBy: 'SYSTEM'

// }
)
.then(res => {
    console.log('hello from', res.rows[0].name)
  })
  .catch(e => {
    console.error('query error', e.message, e.stack)
  })
  ;

    reply('row inserted');
  }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

pool.on('error', (err, client) => {

  if (err) {
    console.error("db err" + err);
  } 
});


// CREATE TABLE "STAGE"."WEBSUBMISSION_DRIVER"
// (
//   "TimeStamp" timestamp without time zone NOT NULL DEFAULT timezone('utc'::text, now()),
//   "IPAddress" character varying(20),
//   "DriverCollectionZIP" character varying(5) NOT NULL,
//   "DriverCollectionRadius" integer NOT NULL,
//   "AvailableDriveTimesJSON" character varying(2000),

//   "DriverCanLoadRiderWithWheelchair" boolean NOT NULL DEFAULT false,
//   "SeatCount" integer DEFAULT 1,
//   "DriverHasInsurance" boolean NOT NULL DEFAULT false,
//   "DriverInsuranceProviderName" character varying(255),
//   "DriverInsurancePolicyNumber" character varying(50),

//   "DriverLicenseState" character(2),
//   "DriverLicenseNumber" character varying(50),
//   "DriverFirstName" character varying(255) NOT NULL,
//   "DriverLastName" character varying(255) NOT NULL,
//   "PermissionCanRunBackgroundCheck" boolean NOT NULL DEFAULT false,

//   "DriverEmail" character varying(255),
//   "DriverPhone" character varying(20),
//   "DriverAreaCode" integer,
//   "DriverEmailValidated" boolean NOT NULL DEFAULT false,
//   "DriverPhoneValidated" boolean NOT NULL DEFAULT false,

//   "DrivingOnBehalfOfOrganization" boolean NOT NULL DEFAULT false,
//   "DrivingOBOOrganizationName" character varying(255),
//   "RidersCanSeeDriverDetails" boolean NOT NULL DEFAULT false,
//   "DriverWillNotTalkPolitics" boolean NOT NULL DEFAULT false,
//   "ReadyToMatch" boolean NOT NULL DEFAULT false,

//   "PleaseStayInTouch" boolean NOT NULL DEFAULT false
// )
// WITH (
//   OIDS=FALSE
// );
// ALTER TABLE "STAGE"."WEBSUBMISSION_DRIVER"
//   OWNER TO carpool_admins;
// GRANT ALL ON TABLE "STAGE"."WEBSUBMISSION_DRIVER" TO carpool_admins;
// GRANT INSERT ON TABLE "STAGE"."WEBSUBMISSION_DRIVER" TO carpool_web_role;
// GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE "STAGE"."WEBSUBMISSION_DRIVER" TO carpool_role;
