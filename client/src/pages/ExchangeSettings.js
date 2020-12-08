import React from "react";
import BaseLayout from "./BaseLayout";
import { Card, Col, Row } from "react-bootstrap";
import { Button, Checkbox, Container, TextField } from "@material-ui/core";
import axios from "axios";

  class ExchangeSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            base: "",
            symbols: {
                "EUR":false, 
                "USD":false, 
                "JPY":false, 
                "BGN":false, 
                "CZK":false, 
                "DKK":false, 
                "GBP":false, 
                "HUF":false, 
                "PLN":false, 
                "RON":false, 
                "SEK":false, 
                "CHF":false, 
                "ISK":false, 
                "NOK":false, 
                "HRK":false, 
                "RUB":false, 
                "TRY":false, 
                "AUD":false, 
                "BRL":false
            }
        };
    }

    componentDidMount() {
        if (this.state.id) {
            const token = localStorage.getItem("token");
            const foundToken = JSON.parse(token);

            const loggedInUser = localStorage.getItem("user");
            const foundUser = JSON.parse(loggedInUser);
            const urlWidgets = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/getWidget";
            const param = {
                user_name: foundUser.user.name,
                type: "exchange"
            }
            axios.post(urlWidgets, param, {headers: {'api_key': foundToken.name}})
            .then((rep) => {
                rep.data.data.forEach((wid) => {
                    const exchange = JSON.parse(wid.data)
                    if (wid.id == this.state.id) {
                        exchange.symbols.forEach((sym) => {
                            this.state.symbols[sym] = true
                        })

                        this.setState({
                            base: exchange.base,
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

        var symbolsList = []
        for (const sym in this.state.symbols) {
            if (this.state.symbols[sym]) {
                symbolsList.push(sym)
            }
        }

        if (this.state.id >= 0) {
            const urlWidgets = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/updateWidget";
            const param = {
                id: this.state.id,
                data: {
                    base: this.state.base,
                    symbols: symbolsList
                }
            }
            axios.post(urlWidgets, param, {headers: {'api_key': foundToken.name}})
            .then(() => {
                window.location.href="/exchangeServices"
            })
        } else {
            const urlWidgets = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/addWidget";
            const param = {
                user_name: foundUser.user.name,
                type: "exchange",
                data: {
                    base: this.state.base,
                    symbols: symbolsList
                }
            }
            axios.post(urlWidgets, param, {headers: {'api_key': foundToken.name}})
            .then(() => {
                window.location.href="/exchangeServices"
            })
        }
    }
    
    handleDelete = () => {
        const token = localStorage.getItem("token");
        const foundToken = JSON.parse(token);

        const urlWidgets = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/removeWidget";
        const param = {
            id: this.state.id,
        }
        axios.post(urlWidgets, param, {headers: {'api_key': foundToken.name}})
        .then(() => {
            window.location.href="/exchangeServices"
        })
    }

    handleChangeSymbols = (sym) => {
        this.state.symbols[sym] = !this.state.symbols[sym]
        this.setState({
            symbols: this.state.symbols
        })
    }
    
    render () {
        const { base, symbols } = this.state
        const symbolsList = ["EUR", "USD", "JPY", "BGN", "CZK", "DKK", "GBP", "HUF", "PLN", "RON", "SEK", "CHF", "ISK", "NOK", "HRK", "RUB", "TRY", "AUD", "BRL"]
        return(
            <BaseLayout>
                <Container className="vh-100">
                    <Row className="vh-100 justify-content-center align-items-center">
                        <Col lg={7}>
                            <Card className="shadow-small-dark mt-0 m-3 m-md-0 pt-1 pl-md-4 pl-1 pr-md-4 pr-1" style={{width: "100%"}}>
                                <Card.Body className="pb-0">
                                    <Row className="justify-content-center mb-3 mt-3">
                                        <h3>Type your Exchange</h3>
                                    </Row>
                                    <Row className="justify-content-center mb-5">
                                        <Col>
                                            <TextField
                                                label="Base"
                                                value={base}
                                                onChange={(e) => {this.setState({base:e.target.value})}}
                                                variant="outlined"
                                            />
                                        </Col>
                                        <Col>
                                            {symbolsList.map((sym) => (
                                                <Row key={sym}>
                                                    <Checkbox
                                                        checked={symbols[sym]}
                                                        color="primary"
                                                        onClick={() => {
                                                            this.handleChangeSymbols(sym)
                                                        }}
                                                    />
                                                    {sym}
                                                </Row>
                                            ))}
                                        </Col>
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

export default ExchangeSettings;