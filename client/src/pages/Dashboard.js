import React from "react";
import BaseLayout from "./BaseLayout";
import { Row } from "react-bootstrap";
import { Container } from "@material-ui/core";

  class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
    }

    render () {
        return(
            <BaseLayout>
                <Container className="vh-100">
                    <Row className="vh-100 justify-content-center align-items-center">
                        <h1>Welcome to your personal dashboard</h1>
                    </Row>
                </Container>
            </BaseLayout>
        );
    }
}

export default Dashboard;