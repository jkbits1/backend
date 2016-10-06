'use strict';

const Hapi        = require('hapi');
// const moment      = require('moment');
const Pool        = require('pg').Pool;
const Good        = require('good');
const GoodFile    = require('good-file');

// const config      = require('./dbInfo.js');
const logOptions  = require('./logInfo.js');

// const pool = new Pool(config);
// not passing config causes Client() to search for env vars
const pool = new Pool();
const server = new Hapi.Server();

const OPS_INTERVAL  = 300000; // 5 mins
const DEFAULT_PORT  = process.env.PORT || 3000;

// for db carpool.UPPERCASE
const UPPERCASE_SCHEMA_NAME   = '"STAGE"';
const UPPERCASE_DRIVER_TABLE  = '"WEBSUBMISSION_DRIVER"';
const UPPERCASE_RIDER_TABLE   = '"WEBSUBMISSION_RIDER"';

// for db carpool
const SCHEMA_NAME   = 'stage';
const DRIVER_TABLE  = 'websubmission_driver';
const RIDER_TABLE   = 'websubmission_rider';

const DRIVER_ROUTE  = 'driver';
const RIDER_ROUTE  = 'rider';

var appPort = DEFAULT_PORT;

logOptions.ops.interval = OPS_INTERVAL;

server.connection({ 
  port: appPort, 
  routes: { 
    cors: true 
  } 
});

server.route({
  method: 'GET',
  path: '/new',
  handler: (req, reply) => {
    var results = {
      success: 'GET new: ',
      failure: 'GET new error: ' 
    };

    req.log();

    dbGetData(pool, dbGetNewItemsQueryString, reply, results);
  }
});

server.route({
  method: 'GET',
  path: '/max-rider',
  handler: (req, reply) => {
    var results = {
      success: 'GET max rider: ',
      failure: 'GET max rider error: ' 
    };

    req.log();

    dbGetData(pool, dbGetMaxRiderTimeStampQueryString, reply, results);
  }
});

server.route({
  method: 'GET',
  path: '/new-rider-status',
  handler: (req, reply) => {
    var results = {
      success: 'INSERT rider status: ',
      failure: 'INSERT rider status error: ' 
    };

    req.log();

    dbGetData(pool, dbInsertNewStatusRiderQueryString, reply, results);
  }
});

server.route({
  method: 'GET',
  path: '/create-riders',
  handler: (req, reply) => {
    var results = {
      success: 'INSERT riders: ',
      failure: 'INSERT riders error: ' 
    };

    req.log();

    dbGetData(pool, dbInsertNewRiderQueryString, reply, results);
  }
});

server.register({
    register: Good,
    options:  logOptions
  }
  ,
  err => {
    if (err) {
      return console.error(err);
    }

    server.start(err => {
      if (err) {
          throw err;
      }

      console.log(`Server running at: ${server.info.uri} \n`);

      // console.log("driver ins: " + dbGetInsertDriverString());
      // console.log("rider ins: " + dbGetInsertRiderString());
      console.log("ops interval:" + logOptions.ops.interval);
    });
  }
);

server.on('request', (request, event, tags) => {

  // Include the Requestor's IP Address on every log
  if( !event.remoteAddress ) {
    event.remoteAddress = request.headers['x-forwarded-for'] || request.info.remoteAddress;
  }

  // Put the first part of the URL into the tags
  if(request && request.url && event && event.tags) {
    event.tags.push(request.url.path.split('/')[1]);
  }

  console.log('server req: %j', event) ;
});

server.on('response', (request) => {  
  console.log(
      "server resp: " 
    + request.info.remoteAddress 
    + ': ' + request.method.toUpperCase() 
    + ' ' + request.url.path 
    + ' --> ' + request.response.statusCode);
});

pool.on('error', (err, client) => {
  if (err) {
    console.error("db err: " + err);
  } 
});

function dbGetData(pool, fnGetString, reply, results) {
    var queryString =  fnGetString();

    pool.query( queryString )
    .then(result => {
      var firstRowAsString = "";

      if (result !== undefined && result.rows !== undefined) {

        // result.rows.forEach( val => console.log(val));
        result.rows.forEach(val => console.log("select: " + JSON.stringify(val)));
        firstRowAsString = JSON.stringify(result.rows[0]);
      }

      reply(results.success + firstRowAsString);
    })
    .catch(e => {
      var message = e.message || '';
      var stack   = e.stack   || '';

      console.error(results.failure, message, stack);

      reply(results.failure + message).code(500);
    });
}

function dbGetNewItemsQueryString () {
  return 'SELECT "IPAddress", "DriverCollectionZIP" FROM ' + SCHEMA_NAME + '.' + DRIVER_TABLE;
//   SELECT 
//   "IPAddress", "DriverCollectionZIP", "DriverCollectionRadius", 
//   "AvailableDriveTimesJSON", "DriverCanLoadRiderWithWheelchair", 
//   "SeatCount", "DriverHasInsurance", "DriverInsuranceProviderName", 
//   "DriverInsurancePolicyNumber", "DriverLicenseState", "DriverLicenseNumber", 
//   "DriverFirstName", "DriverLastName", "PermissionCanRunBackgroundCheck", 
//   "DriverEmail", "DriverPhone", "DriverAreaCode", "DriverEmailValidated", 
//   "DriverPhoneValidated", "DrivingOnBehalfOfOrganization", "DrivingOBOOrganizationName", 
//   "RidersCanSeeDriverDetails", "DriverWillNotTalkPolitics", "ReadyToMatch", 
//   "PleaseStayInTouch" 
// FROM
//  stage.websubmission_driver
// WHERE 
//   "TimeStamp" > timestamp '2000-01-01'

}

// select * from nov2016.rider;
// delete from nov2016.rider;

function dbGetMaxRiderTimeStampQueryString () {
  return 'SELECT MAX("CreatedTimeStamp") FROM stage.status_rider';
}

function dbInsertNewStatusRiderQueryString () {
  return  'INSERT INTO stage.status_rider ("CreatedTimeStamp") ' +
          'SELECT "CreatedTimeStamp" FROM stage.websubmission_rider ' +
          'WHERE stage.websubmission_rider."CreatedTimeStamp" > ' + 
          "timestamp '2000-01-01' " +
          'ORDER BY stage.websubmission_rider."CreatedTimeStamp" '
}

function dbInsertNewRiderQueryString () {
  return  'INSERT INTO nov2016.rider ("Name") ' +     
          'SELECT "RiderFirstName" FROM ' + SCHEMA_NAME + '.' + RIDER_TABLE + ' ' + 
          'WHERE "CreatedTimeStamp" > timestamp \'2000-01-01\' '
    ;

// INSERT INTO nov2016.rider ("Name")
//            SELECT "RiderFirstName" FROM stage.websubmission_rider
//           WHERE "CreatedTimeStamp" > timestamp '2000-01-01'

//   INSERT INTO TABLE1 (id, col_1, col_2, col_3)
// SELECT id, 'data1', 'data2', 'data3'
// FROM TABLE2
// WHERE col_a = 'something';
//   SELECT 
//   "IPAddress", "DriverCollectionZIP", "DriverCollectionRadius", 
//   "AvailableDriveTimesJSON", "DriverCanLoadRiderWithWheelchair", 
//   "SeatCount", "DriverHasInsurance", "DriverInsuranceProviderName", 
//   "DriverInsurancePolicyNumber", "DriverLicenseState", "DriverLicenseNumber", 
//   "DriverFirstName", "DriverLastName", "PermissionCanRunBackgroundCheck", 
//   "DriverEmail", "DriverPhone", "DriverAreaCode", "DriverEmailValidated", 
//   "DriverPhoneValidated", "DrivingOnBehalfOfOrganization", "DrivingOBOOrganizationName", 
//   "RidersCanSeeDriverDetails", "DriverWillNotTalkPolitics", "ReadyToMatch", 
//   "PleaseStayInTouch" 
// FROM
//  stage.websubmission_driver
// WHERE 
//   "TimeStamp" > timestamp '2000-01-01'

}





