import React from "react";
import BaseLayout from "./BaseLayout";
import { Card, Col, Row } from "react-bootstrap";
import { Button, Container, TextField } from "@material-ui/core";
import axios from "axios";

  class CovidSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            country: ""
        };
    }

    componentDidMount() {
        if (this.state.id >= 0) {
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
                rep.data.data.forEach((wid) => {
                    const country = JSON.parse(wid.data)
                    if (wid.id == this.state.id) {
                        this.setState({
                            country: country.country
                        })
                    }
                });
            })
        }
    }

    handleSubmit = () => {
        const token = localStorage.getItem("token");
        const foundToken = JSON.parse(token);

        const loggedInUser = localStorage.getItem("user");
        const foundUser = JSON.parse(loggedInUser);

        if (this.state.id >= 0) {
            const urlWidgets = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/updateWidget";
            const param = {
                id: this.state.id,
                data: {
                    country: this.state.country
                }
            }
            axios.post(urlWidgets, param, {headers: {'api_key': foundToken.name}})
            .then(() => {
                window.location.href="/covidServices"
            })
        } else {
            const urlWidgets = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/addWidget";
            const param = {
                user_name: foundUser.user.name,
                type: "covid",
                data: {
                    country: this.state.country
                }
            }
            axios.post(urlWidgets, param, {headers: {'api_key': foundToken.name}})
            .then(() => {
                window.location.href="/covidServices"
            })
        }
    }
    
    handleDelete = () => {
        const token = localStorage.getItem("token");
        const foundToken = JSON.parse(token);

        const loggedInUser = localStorage.getItem("user");
        const foundUser = JSON.parse(loggedInUser);

            const urlWidgets = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/removeWidget";
            const param = {
                id: this.state.id,
            }
            axios.post(urlWidgets, param, {headers: {'api_key': foundToken.name}})
            .then(() => {
                window.location.href="/covidServices"
            })
    }
    
    render () {
        const { country } = this.state
        return(
            <BaseLayout>
                <Container className="vh-100">
                    <Row className="vh-100 justify-content-center align-items-center">
                        <Col lg={7}>
                            <Card className="shadow-small-dark mt-0 m-3 m-md-0 pt-1 pl-md-4 pl-1 pr-md-4 pr-1" style={{width: "100%"}}>
                                <Card.Body className="pb-0">
                                    <Row className="justify-content-center mb-3 mt-3">
                                        <h3>Type your country</h3>
                                    </Row>
                                    <Row className="justify-content-center mb-5">
                                        <TextField
                                            label="Country"
                                            value={country}
                                            onChange={(e) => {this.setState({country:e.target.value})}}
                                            variant="outlined"
                                        />
                                    </Row>
                                    <Row className="justify-content-center mb-5">
                                        <Col>
                                            <Row className="justify-content-center">
                                                <Button
                                                    disabled={this.state.id < 0}
                                                    onClick={this.handleDelete}
                                                    color="primary"
                                                    variant="contained"
                                                >Delete</Button>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row className="justify-content-center">
                                                <Button
                                                    onClick={this.handleSubmit}
                                                    color="primary"
                                                    variant="contained"
                                                >Confirm</Button>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </BaseLayout>
        );
    }
}

export default CovidSettings;