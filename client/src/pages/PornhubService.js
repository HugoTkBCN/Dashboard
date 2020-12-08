import React from "react";
import BaseLayout from "./BaseLayout";
import { Col, Row } from "react-bootstrap";
import { Button, Container } from "@material-ui/core";
import axios from "axios";
import PornhubWidget from "../components/PornhubWidget";

  class PornhubService extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            updatedKey: 0,
            widgets: []
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
            type: "pornhub"
        }
        axios.post(urlWidgets, param, {headers: {'api_key': foundToken.name}})
        .then((rep) => {
            var widgets = []
            rep.data.data.forEach((wid) => {
                const data = JSON.parse(wid.data)
                widgets.push({ id:wid.id, keyword: data.keyword, order: data.order })
            });
            this.setState({
                widgets: widgets
            })
        })
    }
    
    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    render () {
        const { widgets } = this.state
        return(
            <BaseLayout>
                <Container className="mt-3">
                    <Row className="justify-content-center">
                        {widgets.map(wid => (
                            <Col lg={6} className="mt-4 justify-content-center" key={wid}>
                                <PornhubWidget key={this.state.updatedKey} link={"/pornhubSettings/"+wid.id} nbPost={1} keyword={wid.keyword} order={wid.order}/>
                            </Col>
                        ))}
                    </Row>
                    <Row className="justify-content-center mt-3">
                        <Button
                            onClick={() => {window.location.href="/pornhubSettings/-1"}}
                            color="primary"
                            variant="contained"
                        >Add a new widget</Button>
                    </Row>
                </Container>
            </BaseLayout>
        );
    }
}

export default PornhubService;