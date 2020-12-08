import axios from 'axios'
import React from "react";
import { Button } from 'react-bootstrap';
import Widget from "./Widget";

class ExchangeWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            base: this.props.base,
            symbols: this.props.symbols,
            text: ""
        }
    }

    getExchangeText = (symbols, rates) => {
        var text = "";
        text+="<div>";
            symbols.forEach(sym => {
                text+="<div class=\"row\">";
                text+=sym+" : "+rates[sym]
                text+="</div>";
            });
        text+="</div>";
        return (text)
    }

    componentDidMount() {
        const url = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/exchange";
        const param = {
            "base": this.state.base,
            "symbols": this.state.symbols
        };
        const token = localStorage.getItem("token");
        const foundToken = JSON.parse(token);
        axios.post(url, param, {headers: {'api_key': foundToken.name}})
        .then((rep) => {
            const text = this.getExchangeText(this.state.symbols, rep.data.body.rates)
            this.setState({
                text: text
            })
        }).catch(rep => {
            console.log(rep)
        });
    }

    render () {
        const { link } = this.props;
        const { base } = this.state;
        return (
            <Button variant="light" href={link}>
                <Widget title={"Exchange rate with "+base} text={this.state.text} styleImg={"{}"} picture="https://www.ncr-iran.org/en/wp-content/uploads/2020/05/Iran%E2%80%99s-Stock-Market-Bubble.jpg"/>
            </Button>
        );
    }    
}

export default ExchangeWidget;