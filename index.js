const {nextISSTimesForMyLocation} = require('./iss');

/**
 * Input:
 *   Array of data objects defining the next fly-overs of the ISS.
 *   [ { risetime: <number>, duration: <number> }, ... ]
 * Returns:
 *   undefined
 * Sideffect:
 *   Console log messages to make that data more human readable.
 *   Example output:
 *   Next pass at Mon Jun 10 2019 20:11:44 GMT-0700 (Pacific Daylight Time) for 468 seconds!
 */
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//
//   console.log('It worked! Returned IP:', ip);
// });
// fetchCoordsByIP('104.205.4.46', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//
//   console.log('It worked! Returned coordinates:', coordinates);
// });


// const exampleCoords = {latitude: '51.0486151', longitude: '-114.0708459'};
//
// fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//
//   console.log('It worked! Returned flyover times:', passTimes);
// });