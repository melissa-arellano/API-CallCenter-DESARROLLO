'use strict';


/**
 * Average Time Answered Calls
 * This service returns average time answered calls and answered calls average waiting time
 *
 * service String Name of the service
 * day String Format YYYY-MM-DD
 * country String Example: Brazil (optional)
 * from String Format HH:MM (optional)
 * to String Format HH:MM (optional)
 * threshold Integer Number representing seconds (optional)
 * returns List
 **/
var AverageCallsImplementation = require('../implementation/AverageCallsImplementation');
exports.getCallsbyAverage = function(service,day,country,from,to,threshold) {
  return new Promise(function(resolve, reject) {


    AverageCallsImplementation.put(service,day,country,from,to,threshold).then((result) => {
     /*var examples = {};

      examples['application/json'] = [ {
        "Service" : "GSS-USA",
        "Day" : "2018-07-05",
        "Country" : "MEXICO",
        "AverageTalkTimeDuration" : 800,
        "AverageWaitingTimeOfCallsAnswered" : 870,
        "From" : "08:00",
        "To" : "15:00",
        "Threshold" : 45
      }];*/
    
      if (Object.keys(result).length > 0) {
        resolve(result);
      } else {
        resolve();
      }
    }).catch((err) => {
      reject(err);
    });
    
  });

}

