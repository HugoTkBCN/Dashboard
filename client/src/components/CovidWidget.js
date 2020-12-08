import axios from 'axios'
import React from "react";
import { Button } from 'react-bootstrap';
import Widget from "./Widget";

class CovidWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            country: this.props.country,
            text: ""
        }
    }

    getCovidText = (death, active) => {
        var text = "";
        text+="<div>";

        text+="<div class=\"row\">";
        text+="active cases : "+active
        text+="</div>";

        text+="<div class=\"row\">";
        text+="deaths : "+death
        text+="</div>";

        text+="</div>";
        return (text)
    }

    componentDidMount() {
        const url = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/covid";
        const param = {
            "country": this.state.country
        };

        const token = localStorage.getItem("token");
        const foundToken = JSON.parse(token);

        axios.post(url, param, {headers: {'api_key': foundToken.name}})
        .then((rep) => {
            const text = this.getCovidText(rep.data.body.response[0].deaths.total, rep.data.body.response[0].cases.active)
            this.setState({
                text: text
            })
        }).catch(rep => {
            console.log(rep)
        });
    }

    render () {
        const { link } = this.props;
        const { country, text } = this.state;
        return (
            <Button variant="light" href={link}>
                <Widget title={"Covid stats in "+country} text={text} styleImg={"{}"} picture="https://lh3.googleusercontent.com/proxy/0Izqy4P95oMMjm8gLRbf57jkbPv38ymhS9e8pjON4l2OyD2O-SliVcs4qYq9_aaWHwABD40OME34s_gNwWvQMuuZ3ukhrRiIwX34bMwemNklFxOG7sEvjw2eKVBwsZs_jT1Qzl2wzJFOGdsYhg"/>
            </Button>
        );
    }    
}

export default CovidWidget;