import React, { Component } from "react";
import axios from 'axios';

class Bitcoin extends Component {
    constructor(props){
        // Pass props to parent class
        super(props);
        // Set initial state
        this.state = {
            btc_message: '',
            btc_currency: 'USD',
        }
        this.updateBitcoin = this.updateBitcoin.bind(this);
    }

    componentDidMount() {
        this.updateBitcoin(this.state.btc_currency);
    }

    updateBitcoin(currency) {
        axios.get(' https://api.coindesk.com/v1/bpi/currentprice/' + currency + '.json')
        .then(res => {
            const message = '1 BTC = ' + res.data.bpi[currency].rate + ' ' + currency; 
            this.setState({btc_message: message, btc_currency: currency});
        })
    
    }

    render() {
        return (
            <div>
                <h2>Kurs Bitcoin</h2>
                <p>Wybierz walutę z listy.</p>
                <select value={this.state.btc_currency} onChange={(e) => {
                    this.updateBitcoin(e.target.value);
                }}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="PLN">PLN</option>
                </select>
                <p>{this.state.btc_message}</p>
            </div>
        );
    }
}
export default Bitcoin;