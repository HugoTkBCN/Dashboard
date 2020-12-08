import React from "react";
import BaseLayout from "./BaseLayout";
import { Col, Row } from "react-bootstrap";
import { Button, Container } from "@material-ui/core";
import WeatherWidget from "../components/WeatherWidget";
import axios from "axios";

  class WeatherService extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            updatedKey: 0,
            cities: []
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => {this.setState({updatedKey: this.state.updatedKey + 1})}, 10000);

        const token = localStorage.getItem("token");
        const foundToken = JSON.parse(token);

        const loggedInUser = localStorage.getItem("user");
        const foundUser = JSON.parse(loggedInUser);
        const urlWidgets = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/getWidget";
        const param = {
            user_name: foundUser.user.name,
            type: "weather"
        }
        axios.post(urlWidgets, param, {headers: {'api_key': foundToken.name}})
        .then((rep) => {
            var cities = []
            rep.data.data.forEach((wid, index) => {
                const city = JSON.parse(wid.data)
                if (!cities.includes(city.city)) {
                    cities.push({ id:rep.data.data[index].id, city: city.city })
                }
            });
            this.setState({
                cities: cities
            })
        })
    }
    
    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    render () {
        const { cities } = this.state
        return(
            <BaseLayout>
                <Container className="mt-3">
                    <Row className="justify-content-center">
                        {cities.map(city => (
                            <Col lg={6} className="mt-4 justify-content-center" key={city.city}>
                                <WeatherWidget key={this.state.updatedKey} link={"/weatherSettings/"+city.id} city={city.city}/>
                            </Col>
                        ))}
                    </Row>
                    <Row className="justify-content-center mt-3">
                        <Button
                            onClick={() => {window.location.href="/weatherSettings/-1"}}
                            color="primary"
                            variant="contained"
                        >Add a new widget</Button>
                    </Row>
                </Container>
            </BaseLayout>
        );
    }
}

export default WeatherService;