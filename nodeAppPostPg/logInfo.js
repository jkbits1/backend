module.exports = {
  includes: {
    request:  ['headers', 'payload'],
    response: ['payload']
  },  
  ops: {
      interval: 1000
  },
  reporters: {
      myConsoleReporter: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ 
            ops: '*', 
            error: '*',
            request: '*',
            log: '*', 
            response: '*' 
          }]
      }, {
          module: 'good-console'
      }, 'stdout'],
      myFileReporter: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ 
            ops: '*', 
            error: '*',
            request: '*',
            log: '*', 
            response: '*'
          }]
      }, {
          module: 'good-squeeze',
          name: 'SafeJson'
      }, {
          module: 'good-file',
          args: ['./cp_web_log']
      }]
      // ,
      // myHTTPReporter: [{
      //     module: 'good-squeeze',
      //     name: 'Squeeze',
      //     args: [{ error: '*' }]
      // }, {
      //     module: 'good-http',
      //     args: ['http://prod.logs:3000', {
      //         wreck: {
      //             headers: { 'x-api-key': 12345 }
      //         }
      //     }]
      // }]
  }
};