import axios from 'axios'
import React from "react";
import { Button } from 'react-bootstrap';
import Widget from "./Widget";

class WeatherWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            city: this.props.city,
            icon: "",
            temperature: ""
        }
    }

    componentDidMount() {
        const url = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/weather";
        const param = {
            "city": this.state.city
        };
        const token = localStorage.getItem("token");
        const foundToken = JSON.parse(token);
        axios.post(url, param, {headers: {'api_key': foundToken.name}})
        .then((rep) => {
            this.setState({
                temperature: rep.data.body.main.temp,
                icon: rep.data.icon
            });
            var text = "Temparture in "+this.state.city+": "+this.state.temperature+"°C"
            this.setState({
                text: text
            });
        }).catch(rep => {
            console.log(rep)
        });
    }

    render () {
        const { city, link } = this.props;
        const { text, icon } = this.state;
        return (
            <Button variant="light" href={link}>
                <Widget title={"Weather in "+city} text={text} styleImg={"{}"} picture={icon}/>
            </Button>
        );
    }    
}

export default WeatherWidget;