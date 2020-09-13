import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import getWeb3 from './utils/getWeb3.js';
import {Grid,Row,Col} from 'react-bootstrap';
import TeamA from './TeamA.jsx';
import TeamB from './TeamB.jsx';
import TeamB0 from './TeamB0.jsx';
import TeamA0 from  './TeamA0.jsx';

class App extends Component {
	constructor(){
	super(); 
	
	this.state = {
      web3 : '',
      address: '',
    };
  }
  componentDidMount() {
    getWeb3.then(results => {
      results.web3.eth.getAccounts( (error,acc) => {
        this.setState({
          address: acc[0],
          web3: results.web3
        })
      });
    }).catch( () => {
      console.log('Error finding web3.')
    })
  }
  render() {
    return (
      <div className="App">
       <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
		  <h1 className="App-title">E-Bets</h1>
		  </header>
		  <div>
          Welcome to my E-Sports Betting website <br/>
        Wallet address: {this.state.address}
		   </div>
		   <Grid>
            <Col>
             <Row xs={6} sm={6}><TeamA0 /> </Row>
             <Row xs={6} sm={6}><TeamB0 /> </Row>
          </Col>
        </Grid>
      </div>
    );
  }
}

export default App;
