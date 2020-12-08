import React from "react";
import BaseLayout from "./BaseLayout";
import { Card, Col, Row } from "react-bootstrap";
import { Button, Container, FormControlLabel, Radio, RadioGroup, TextField } from "@material-ui/core";
import axios from "axios";

  class PornhubSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            keyword: "",
            order: ""
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
                type: "pornhub"
            }
            axios.post(urlWidgets, param, {headers: {'api_key': foundToken.name}})
            .then((rep) => {
                rep.data.data.forEach((wid) => {
                    const widget = JSON.parse(wid.data)
                    if (wid.id == this.state.id) {
                        this.setState({
                            keyword: widget.keyword,
                            order: widget.order
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
                    keyword: this.state.keyword,
                    order: this.state.order
        }
            }
            axios.post(urlWidgets, param, {headers: {'api_key': foundToken.name}})
            .then(() => {
                window.location.href="/pornhubServices"
            })
        } else {
            const urlWidgets = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/addWidget";
            const param = {
                user_name: foundUser.user.name,
                type: "pornhub",
                data: {
                    keyword: this.state.keyword,
                    order: this.state.order
                }
            }
            axios.post(urlWidgets, param, {headers: {'api_key': foundToken.name}})
            .then(() => {
                window.location.href="/pornhubServices"
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
                window.location.href="/pornhubServices"
            })
    }

    handleChangeOrder = (e) => {
        this.setState({
            order: e.target.value
        })
    }
    
    render () {
        const { keyword, order } = this.state
        const orderList = ["Most Recent", "Most Viewed", "Top Rated", "Longest"]
        return(
            <BaseLayout>
                <Container className="vh-100">
                    <Row className="vh-100 justify-content-center align-items-center">
                        <Col lg={7}>
                            <Card className="shadow-small-dark mt-0 m-3 m-md-0 pt-1 pl-md-4 pl-1 pr-md-4 pr-1" style={{width: "100%"}}>
                                <Card.Body className="pb-0">
                                    <Row className="justify-content-center mb-3 mt-3">
                                        <h3>Type your Preferences</h3>
                                    </Row>
                                    <Row className="justify-content-center mb-5">
                                        <Col>
                                            <TextField
                                                label="Keyword"
                                                value={keyword}
                                                onChange={(e) => {this.setState({keyword:e.target.value})}}
                                                variant="outlined"
                                            />
                                        </Col>
                                        <Col>
                                            <RadioGroup aria-label="Order" value={order} onChange={this.handleChangeOrder}>
                                                {orderList.map((order) => (
                                                    <FormControlLabel value={order} control={<Radio color="primary"/>} label={order} />
                                                ))}
                                            </RadioGroup>
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

export default PornhubSettings;