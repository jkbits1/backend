var common = require('../../common/common.js');

module.exports = {
  'full-match-pause': function(client) {
    // common.matchRiderDriver(client)
    //   .driverCancelMatch()

    //   .nextDate()
    //   .addDriver()
    //   .viewDriverSelfService()
    //   .pauseDriverSelfService()
    //   .cancelDriverSelfService()
    //   .addRider()
    //   .viewRiderSelfService()
    //   .cancelRiderSelfService()

    //   .nextDate()
    //   .matchRiderDriver()
    //   .viewRiderSelfService()
    //   .viewRiderMatch()
    //   .riderCancelMatch()

    common
      .loginOperatorPage(client)
      .addRiderOperatorPage()
      .viewRiderSelfService()

      .loginOperatorPage(client)
      .addDriverOperatorPage()
      // from matchriderdriver
      .viewDriverSelfService()
      .viewProposedMatch()
      .acceptMatch()

      // .addDriverOperatorPage()
      // .viewDriverSelfService()
      // .loginOperatorPage()
      // .addRiderOperatorPage()
      // from match...()
      // .viewDriverSelfService()
      // .viewProposedMatch()
      // .acceptMatch()

      .viewRiderSelfService()
      .viewRiderMatch()
      .riderCancelMatch()

      .loginOperatorPage()
      // .logoutOperatorPage()
      .finish();
  }
};
