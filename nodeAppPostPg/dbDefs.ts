const SCHEMA_NAME           = 'stage';
const SCHEMA_NOV2016_NAME   = 'nov2016';

const DRIVER_TABLE  = 'websubmission_driver';
const RIDER_TABLE   = 'websubmission_rider';
const HELPER_TABLE  = 'websubmission_helper';
const MATCH_TABLE   = 'match';

var CANCEL_RIDE_FUNCTION = 'cancel_ride($1)';
var REJECT_RIDE_FUNCTION = 'reject_ride($1)';

// app routes (api paths)
const DRIVER_ROUTE  = 'driver';
const RIDER_ROUTE   = 'rider';
const HELPER_ROUTE  = 'helper';
const DELETE_ROUTE  = 'rider';
const PUT_ROUTE     = 'rider';

// for db carpool
module.exports = {
  SCHEMA_NAME:          SCHEMA_NAME,
  SCHEMA_NOV2016_NAME:  SCHEMA_NOV2016_NAME,

  DRIVER_TABLE: DRIVER_TABLE,
  RIDER_TABLE:  RIDER_TABLE,
  HELPER_TABLE: HELPER_TABLE,
  MATCH_TABLE:  MATCH_TABLE,

  CANCEL_RIDE_FUNCTION: CANCEL_RIDE_FUNCTION,
  REJECT_RIDE_FUNCTION: REJECT_RIDE_FUNCTION,

  // app routes (api paths)
  DRIVER_ROUTE: DRIVER_ROUTE,
  RIDER_ROUTE:  RIDER_ROUTE,
  HELPER_ROUTE: HELPER_ROUTE,
  DELETE_ROUTE: DELETE_ROUTE,
  PUT_ROUTE   : PUT_ROUTE
}
