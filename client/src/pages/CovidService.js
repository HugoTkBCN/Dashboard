import React from "react";
import BaseLayout from "./BaseLayout";
import { Col, Row } from "react-bootstrap";
import { Button, Container } from "@material-ui/core";
import axios from "axios";
import CovidWidget from "../components/CovidWidget";

  class CovidService extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            updatedKey: 0,
            countries: []
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
            type: "covid"
        }
        axios.post(urlWidgets, param, {headers: {'api_key': foundToken.name}})
        .then((rep) => {
            var countries = []
            rep.data.data.forEach((wid, index) => {
                const country = JSON.parse(wid.data)
                countries.push({ id:rep.data.data[index].id, country: country.country })
            });
            this.setState({
                countries: countries
            })
        })
    }
    
    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    render () {
        const { countries } = this.state
        return(
            <BaseLayout>
                <Container className="mt-3">
                    <Row className="justify-content-center">
                        {countries.map(country => (
                            <Col lg={6} className="mt-4 justify-content-center" key={country.country}>
                                <CovidWidget key={this.state.updatedKey} link={"/covidSettings/"+country.id} country={country.country}/>
                            </Col>
                        ))}
                    </Row>
                    <Row className="justify-content-center mt-3">
                        <Button
                            onClick={() => {window.location.href="/covidSettings/-1"}}
                            color="primary"
                            variant="contained"
                        >Add a new widget</Button>
                    </Row>
                </Container>
            </BaseLayout>
        );
    }
}

export default CovidService;