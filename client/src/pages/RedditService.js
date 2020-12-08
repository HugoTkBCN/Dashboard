import React from "react";
import BaseLayout from "./BaseLayout";
import { Col, Row } from "react-bootstrap";
import { Button, Container } from "@material-ui/core";
import axios from "axios";
import RedditWidget from "../components/RedditWidget";

  class RedditService extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            updatedKey: 0,
            subs: []
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
            type: "reddit"
        }
        axios.post(urlWidgets, param, {headers: {'api_key': foundToken.name}})
        .then((rep) => {
            var subs = []
            rep.data.data.forEach((wid, index) => {
                const sub = JSON.parse(wid.data)
                subs.push({ id:wid.id, sub: sub.name })
            });
            this.setState({
                subs: subs
            })
        })
    }
    
    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    render () {
        const { subs } = this.state
        return(
            <BaseLayout>
                <Container className="mt-3">
                    <Row className="justify-content-center">
                        {subs.map(sub => (
                            <Col lg={6} className="mt-4 justify-content-center" key={sub}>
                                <RedditWidget key={this.state.updatedKey} link={"/redditSettings/"+sub.id} nbPost={1} sub={sub.sub}/>
                            </Col>
                        ))}
                    </Row>
                    <Row className="justify-content-center mt-3">
                        <Button
                            onClick={() => {window.location.href="/redditSettings/-1"}}
                            color="primary"
                            variant="contained"
                        >Add a new widget</Button>
                    </Row>
                </Container>
            </BaseLayout>
        );
    }
}

export default RedditService;