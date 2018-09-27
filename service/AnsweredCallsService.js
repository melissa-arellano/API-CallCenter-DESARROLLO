'use strict';


/**
 * Total answered calls filtered by country and date
 * This service returns the total of answered calls
 *
 * service String Name of the service
 * day String Format YYYY-MM-DD
 * country String Example: Brazil (optional)
 * from String Format HH:MM (optional)
 * to String Format HH:MM (optional)
 * threshold Integer Number representing seconds (optional)
 * returns List
 **/
exports.getAnsweredCalls = function(service,day,country,from,to,threshold) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "Service" : "ACARI",
  "Day" : "2018-02-10",
  "Country" : "Jamaica",
  "CallsAnswered" : 100,
  "From" : "08:00",
  "To" : "15:00",
  "Threshold" : 45
}, {
  "Service" : "ACARI",
  "Day" : "2018-02-10",
  "Country" : "Jamaica",
  "CallsAnswered" : 100,
  "From" : "08:00",
  "To" : "15:00",
  "Threshold" : 45
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

