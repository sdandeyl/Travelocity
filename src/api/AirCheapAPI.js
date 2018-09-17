import 'whatwg-fetch';

let AirCheapAPI = {
  fetchAirports() {
    return fetch('https://aircheapapi.pro-react.com/airports')
    .then((response) => response.json())
    .catch(error => {
      console.log("YYYY", error.json());
      throw new Error("error");
    });
  },

  fetchTickets(origin, destination) {
    return fetch(`https://aircheapapi.pro-react.com/tickets?origin=${origin}&destination=${destination}`)
    .then((response) => response.json());
  }
};

export default AirCheapAPI;
