import React from "react";
import BaseLayout from "./BaseLayout";
import { Button, Col, Row } from "react-bootstrap";
import { Checkbox, Container } from "@material-ui/core";
import axios from 'axios'

class SteamSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allServers: null,
            chosenServer: []
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
            this.state.allServers.forEach((server) => {
                if (serverLoactions.includes(server.server)) {
                    server.checked = true
                }
            })
            this.setState({
                chosenServer: serverLoactions
            })
        })
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        const foundToken = JSON.parse(token);
        this.setState({token: foundToken})

        const urlStatus = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/steamStatus";
        axios.get(urlStatus, {headers: {'api_key': foundToken.name}})
        .then((rep) => {
            var servers = []
            for (const server in rep.data.body) {
                servers.push({"server":server, "checked": false})
            }
            this.setState({
                allServers: servers
            })
            this.getCheckedServer(foundToken)
        }).catch(rep => {
            console.log(rep)
        });
    };

    handleChange = (index, checked) => {
        this.state.allServers[index].checked=checked
        this.setState({
            allServers: this.state.allServers
        })
    }

    addAllWidgets = (startingIndex) => {
        const loggedInUser = localStorage.getItem("user");
        const foundUser = JSON.parse(loggedInUser);
        const urlWidgets = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/addWidget";
        var check= true
        this.state.allServers.forEach((server, index) => {
            if (server.checked && index >= startingIndex && check) {
                const param = {
                    user_name: foundUser.user.name,
                    type: "steam",
                    data: {
                        "server": server.server
                    }
                }
                axios.post(urlWidgets, param, {headers: {'api_key': this.state.token.name}})
                .then((rep) => {
                    window.location.href="/steamServices"
                }).catch((rep) => {
                    console.log(rep)
                })
                this.addAllWidgets(index+1)
                check=false
            }
        })

    }

    handleSubmit = () => {
        const loggedInUser = localStorage.getItem("user");
        const foundUser = JSON.parse(loggedInUser);
        const urlWidgets = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/getWidget";
        const param = {
            user_name: foundUser.user.name,
            type: "steam"
        }
        axios.post(urlWidgets, param, {headers: {'api_key': this.state.token.name}})
        .then((rep) => {
            rep.data.data.forEach(server => {
                const urlWidgets = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/removeWidget";
                const param = {
                    id: server.id
                }
                axios.post(urlWidgets, param, {headers: {'api_key': this.state.token.name}})
            });
        }).then(() => {
            this.addAllWidgets(0)
        })
    }

    render () {
        const { allServers } = this.state
        return(
            <BaseLayout>
                <Container className="mt-3 justify-content-center">
                    <Row className="justify-content-center">
                        <h1>Steam widgets Settings</h1>
                    </Row>
                    &nbsp;
                    <Row className="justify-content-center">
                        <div className="jusify-content-center">
                            {allServers && allServers.map((server, index) => (
                                <Col key={index} className="justify-content-center">
                                    <Checkbox
                                        checked={server.checked}
                                        color="primary"
                                        onChange={(event) => {this.handleChange(index, event.target.checked)}}
                                    />
                                    {server.server}
                                </Col>
                            ))}
                        </div>
                    </Row>
                    &nbsp;
                    <Row className="justify-content-center">
                        <Button
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                            Valider
                        </Button>
                    </Row>
                </Container>
            </BaseLayout>
        );
    }
}

export default SteamSettings;