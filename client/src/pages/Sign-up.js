import React from "react";
import { Container, Row, Card, Col, Form } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import LoginGoogle from '../components/LoginGoogle';


class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pseudo: "",
            pwd: "",
            checked: false,
            validated: false,
            pseudoError: "",
            passwordError: "",
        };
    }

    componentDidMount() {
        var url = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/getToken"
        axios.post(url, {pass: "DarkZorg28"})
        .then((rep) => {
            this.setState({
                token: rep.data.token
            })
        })
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {
            var url = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/signup"
            var data = {
                user_name: this.state.pseudo,
                password: this.state.pwd,
                enrollment: this.state.checked
            }
            axios.post(url, data, {headers: {'api_key': this.state.token}})
            .then((rep) => {
                var userStored = "{\"user\": {\"name\":\""+data.user_name+"\"}}"
                var tokenStored = "{\"name\":\""+this.state.token+"\"}"
                localStorage.setItem('user', userStored)
                localStorage.setItem('token', tokenStored)
                window.location.href = "/"
            }).catch(() => {
                this.setState({
                    pseudoError: "invalid pseudo or password",
                    passwordError: "invalid pseudo or password"
                })
            });
        } else {
            if (this.state.pseudo === "") {
                this.setState({
                    pseudoError: "Field must not be empty!",
                })
            }
            if (this.state.pwd === "") {
                this.setState({
                    passwordError: "Field must not be empty!",
                })
            }
        }
        this.setState({validated:true})
    };

    handleCheck = (event) => {
        this.setState({
            checked: event.target.checked
        });
    };

    render () {
        const { pseudo, pwd, checked, validated, passwordError, pseudoError } = this.state;
        return (
            <Container className="vh-100">
                <Row className="vh-100 justify-content-center align-items-center">
                    <Col lg={7}>
                        <Card className="shadow-small-dark mt-0 m-3 m-md-0 pt-1 pl-md-4 pl-1 pr-md-4 pr-1" style={{width: "100%"}}>
                            <Card.Body className="pb-0">
                                <Row className="justify-content-center">
                                    <h3>Inscription</h3>
                                </Row>
                                <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label htmlFor="idPseudo">Pseudo</Form.Label>
                                        <Form.Control
                                            required
                                            id="idPseudo"
                                            type="text"
                                            placeholder="Pseudo"
                                            value={pseudo}
                                            onChange={e => this.setState({pseudo: e.target.value, validated: false, pseudoError: "", passwordError: ""})}
                                        />
                                        {pseudoError}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="idPassword">Password</Form.Label>
                                        <Form.Control
                                            required
                                            id="idPassword"
                                            type="password"
                                            placeholder="Password"
                                            value={pwd}
                                            onChange={e => this.setState({pwd: e.target.value, validated: false, pseudoError: "", passwordError: ""})}
                                        />
                                        {passwordError}
                                    </Form.Group>
                                    <Row className="justify-content-center mt-4">
                                        <Form.Check
                                            type="checkbox"
                                            label="J'accepte les conditions d'utilisation"
                                            required
                                            checked={checked}
                                            onChange={this.handleCheck}
                                        />
                                    </Row>
                                    <Row className="justify-content-center mt-4 mb-4">
                                        <Button 
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Inscription
                                        </Button>
                                    </Row>
                                </Form>
                                <Row className="justify-content-center mt-4">
                                    <a href="/login">J'ai déjà un compte</a>
                                </Row>
                                <LoginGoogle />
                                &nbsp;
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }    
}

export default Signup;