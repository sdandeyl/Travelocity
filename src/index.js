import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import aircheapStore from './store/aircheapStore';
// import Autosuggest from 'react-autosuggest';
import Select from 'react-select';
import TicketItem from './components/TicketItem';
import AirportActionCreators from './actions/AirportActionCreators';

class App extends Component {

  componentDidMount(){
    console.log("componentDidMount");
    this.props.fetchAirports();
  }

  componentWillUpdate(nextProps, nextState){
    let originAndDestinationSelected = nextProps.origin && nextProps.destination;
    let selectionHasChangedSinceLastUpdate = nextProps.origin !== this.props.origin ||
                                             nextProps.destination !== this.props.destination;
    if(originAndDestinationSelected && selectionHasChangedSinceLastUpdate){
      this.props.fetchTickets(nextProps.origin, nextProps.destination);
    }
  }

  render() {
    //console.log("render");
    let ticketList = this.props.tickets.map((ticket)=>(
      <TicketItem key={ticket.id} ticket={ticket} />
    ));
    return (
      <div>
        <header>
          <div className="header-brand">
            <img src="logo.png" height="35"/>
            <p>Check discount ticket prices and pay using your AirCheap points</p>
          </div>
          <div className="header-route">

           <Select
               name="origin"
               value={this.props.code}
               options={this.props.airports}
               onChange={this.props.onChooseAirport.bind(this,'origin')}
           />

          <Select
               name="destination"
               value={this.props.code}
               options={this.props.airports}
               onChange={this.props.onChooseAirport.bind(this,'destination')}
           />

          </div>

        </header>
        <div style={{"marginTop":"50px"}}>
          { ticketList }
        </div>
      </div>
    );
  }
}
App.propTypes = {
  airports: PropTypes.array.isRequired,
  origin: PropTypes.string,
  destination: PropTypes.string,
  tickets: PropTypes.array.isRequired,
  fetchAirports: PropTypes.func.isRequired,
  onChooseAirport: PropTypes.func.isRequired,
  fetchTickets: PropTypes.func.isRequired
};


const mapStateToProps = (state) => {
  //console.log("mapStateToProps");
   return {
    airports: state.airports
      .map(airport => ({ value: airport.code, label: `${airport.city} - ${airport.country} (${airport.code})` })),
    origin: state.route.origin,
    destination: state.route.destination,
    tickets: state.tickets
   }
  }


const mapDispatchToProps = (dispatch) => {
  //console.log("mapDispatchToProps");
  return {
    fetchAirports: () => dispatch(AirportActionCreators.fetchAirports()),
    onChooseAirport: (target, airport) => dispatch(AirportActionCreators.chooseAirport(target, airport)),
    fetchTickets: (origin, destination) => dispatch(AirportActionCreators.fetchTickets(origin, destination))
  }  
}
 

//console.log("before connect");
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
//console.log("after connect");

render(
  <Provider store={aircheapStore}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
