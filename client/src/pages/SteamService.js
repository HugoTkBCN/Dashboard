import React from "react";
import BaseLayout from "./BaseLayout";
import { Col, Row } from "react-bootstrap";
import { Button, Container } from "@material-ui/core";
import SteamWidget from "../components/SteamWidget";
import axios from 'axios'

  class SteamService extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            updatedKey: 0,
            widgets: [],
            apiData: null
        };
    }

    getCheckedServer = (foundToken) => {
        const loggedInUser = localStorage.getItem("user");
        const foundUser = JSON.parse(loggedInUser);
        const urlWidgets = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/getWidget";
        const param = {
            user_name: foundUser.user.name,
            type: "steam"
        }
        axios.post(urlWidgets, param, {headers: {'api_key': foundToken.name}})
        .then((rep) => {
            var serverLoactions = []
            rep.data.data.forEach(server => {
                const loc = JSON.parse(server.data)
                if (!serverLoactions.includes(loc.server)) {
                    serverLoactions.push(loc.server)
                }
            });
            this.setState({
                widgets: serverLoactions
            })
        })
    }

    componentDidMount() {
        this.timer = setInterval(() => {this.setState({updatedKey: this.state.updatedKey + 1})}, 10000);
        const url = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/steamStatus";
        const token = localStorage.getItem("token");
        const foundToken = JSON.parse(token);
        axios.get(url, {headers: {'api_key': foundToken.name}})
        .then((rep) => {
            this.setState({
                apiData: rep.data.body
            })
            this.getCheckedServer(foundToken)
        }).catch(rep => {
            console.log(rep)
        });
    }
    
    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    render () {
        const { apiData, widgets } = this.state
        return(
            <BaseLayout>
                <Container className="mt-3">
                    <Row className="justify-content-center">
                        {widgets.map((wid) => (
                            <Col lg={4} className="mt-4" key={wid}>
                                {apiData && <SteamWidget key={this.state.updatedKey} link="/steamSettings" server={wid} data={apiData[wid]}/>}
                            </Col>
                        ))}
                    </Row>
                    <Row className="justify-content-center mt-3">
                        <Button
                            onClick={() => {window.location.href="/steamSettings"}}
                            color="primary"
                            variant="contained"
                        >Add a new widget</Button>
                    </Row>
                </Container>
            </BaseLayout>
        );
    }
}

export default SteamService;