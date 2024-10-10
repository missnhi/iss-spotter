// index.js
const {
  fetchMyIP,
  fetchISSFlyOverTimes,
  fetchCoordsByIP
} = require('./iss');

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


const exampleCoords = {latitude: '51.0486151', longitude: '-114.0708459'};

fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  
  console.log('It worked! Returned flyover times:', passTimes);
});