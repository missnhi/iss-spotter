// iss_promised.js
const needle = require('needle');

const fetchMyIP = function(callback) {
  return needle('get', 'https://api.ipify.org?format=json')
    .then((response) => {
      return response.body.ip;
    });
}

const fetchCoordsByIP = function(ip, callback) {
  return needle('get', `https://ipwho.is/${ip}`)
    .then((response) => {
      const {latitude, longitude} = response.body;
      return {latitude, longitude};
    });
}

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  return needle('get', url)
    .then((response) => {
      return response.body.response;
    });
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then((coords) => fetchISSFlyOverTimes(coords))
    .then((passtimes) => {
      return passtimes;
    });
};

module.exports = {nextISSTimesForMyLocation};
