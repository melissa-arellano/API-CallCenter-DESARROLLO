'use strict';


/**
 * Total calls filtered by duration
 * This service returns the total of calls by duration
 *
 * service String Name of the service
 * day String Format YYYY-MM-DD
 * country String Example: Brazil (optional)
 * from String Format HH:MM (optional)
 * to String Format YYYY-MM-DD (optional)
 * threshold Integer Number representing seconds (optional)
 * returns List
 **/
var CallsByDurationImplementation = require('../implementation/CallsByDurationImplementation');
exports.getCallsByDuration = function(service,day,country,from,to,threshold) {

  return new Promise(function(resolve, reject) {

    CallsByDurationImplementation.put(service, day, country, from, to, threshold).then((result) => {
    
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