import React from "react";
import BaseLayout from "./BaseLayout";
import { Col, Row } from "react-bootstrap";
import { Button, Container } from "@material-ui/core";
import ExchangeWidget from "../components/ExchangeWidget";
import axios from "axios";

const widgets = [
    {
        type: "exchange",
        data: {
            base: "EUR",
            symbols: [
                "USD",
                "MXN",
                "CAD"
            ]
        }
    },
    {
        type: "exchange",
        data: {
            base: "USD",
            symbols: [
                "EUR",
                "MXN"
            ]
        }
    },
    {
        type: "exchange",
        data: {
            base: "MXN",
            symbols: [
                "USD",
                "EUR"
            ]
        }
    },
];

  class ExchangeService extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            updatedKey: 0,
            exchanges: []
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
            type: "exchange"
        }
        axios.post(urlWidgets, param, {headers: {'api_key': foundToken.name}})
        .then((rep) => {
            var exchanges = []
            rep.data.data.forEach((wid, index) => {
                const exchange = JSON.parse(wid.data)
                exchanges.push({ id:wid.id, base: exchange.base, symbols:exchange.symbols })
            });
            this.setState({
                exchanges: exchanges
            })
        })

    }
    
    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    render () {
        const { exchanges } = this.state
        return(
            <BaseLayout>
                <Container className="mt-3">
                    <Row className="justify-content-center">
                        {exchanges.map(ex => (
                            <Col lg={4} className="mt-4" key={ex.base}>
                                <ExchangeWidget key={this.state.updatedKey} link={"/exchangeSettings/" + ex.id} base={ex.base} symbols={ex.symbols}/>
                            </Col>
                        ))}
                    </Row>
                    <Row className="justify-content-center mt-3">
                        <Button
                            onClick={() => {window.location.href="/exchangeSettings/-1"}}
                            color="primary"
                            variant="contained"
                        >Add a new widget</Button>
                    </Row>
                </Container>
            </BaseLayout>
        );
    }
}

export default ExchangeService;