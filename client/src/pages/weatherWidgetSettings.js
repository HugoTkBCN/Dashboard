import React from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'

class WeatherWidgetSettings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            city: this.props.city,
        };
    }

    resetHelperText() {
        this.setState({
          incorrectField: '',
          incorrectMessage: "",
        });
    }

    chooseCity = () => {
        if (this.state.pseudo === "") {
            this.setState({
                incorrectField: 'pseudo',
                incorrectMessage: "champs vide",
            })
            return
        } else if (this.state.pwd === "") {
            this.setState({
                incorrectField: 'password',
                incorrectMessage: "champs vide",
            })
            return
        }
        this.setState({
            logginAttempt: true
        })
        var url = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/chooseCity"
        var data = {
            user_name: this.state.pseudo,
            password: this.state.pwd
        }
        axios.post(url, data)
        .then( rep => {
            var dataStored = "{\"user\": {\"name\":\""+data.user_name+"\"}}"
            localStorage.setItem('user', dataStored)
            window.location.href = "/"
        }).catch(rep => {
            console.log(rep)
        });
        this.setState({
            logginAttempt: false
        })
    }

    render () {
        const {pseudo, pwd, logginAttempt, incorrectField, incorrectMessage} = this.state;
        return (
            <Container className="vh-100">
                <Row className="vh-100 justify-content-center align-items-center">
                    <Col lg={7}>
                        <Card className="shadow-small-dark mt-0 m-3 m-md-0 text-center pt-1 pl-md-4 pl-1 pr-md-4 pr-1" style={{width: "100%"}}>
                            <Card.Body className="pb-0">
                            <h3>Connexion</h3>
                                <Row className="justify-content-center mt-5">
                                    <TextField
                                        fullWidth
                                        placeholder="Pseudo"
                                        value={pseudo}
                                        onChange={(e) => { this.resetHelperText(); this.setState({ pseudo: e.target.value }) }}
                                        error={incorrectField === 'pseudo'}
                                        helperText={incorrectField === 'pseudo' ? incorrectMessage : undefined}
                                    />
                                </Row>
                                <Row className="justify-content-center mt-4">
                                    <TextField
                                        fullWidth
                                        type="password"
                                        placeholder="Mot de passe" 
                                        value={pwd}
                                        onChange={(e) => { this.resetHelperText(); this.setState({ pwd: e.target.value }) }}
                                        error={incorrectField === 'password'}
                                        helperText={incorrectField === 'password' ? incorrectMessage : undefined}
                                    />
                                </Row>
                                <Row className="justify-content-center mt-4 mb-4">
                                    <Button 
                                        variant="contained"
                                        color="primary"
                                        disabled={logginAttempt}
                                        onClick={this.chooseCity}
                                    >
                                        Connexion
                                        {logginAttempt ?
                                        <CircularProgress 
                                            style={{
                                            marginLeft: "10px",
                                            height: "22px",
                                            width: "22px",
                                            color: "gray"
                                            }}
                                        />
                                        : <></>}
                                    </Button>
                                </Row>
                                <Row className="justify-content-center mt-4">
                                    <a href="/signup">Je n'ai pas encore de compte</a>
                                </Row>
                                &nbsp;
                                {/* <Row className="justify-content-center mt-4">
                                {['google', 'facebook', 'linkedin', 'github'].map(provider => (
                                    <Col className="p-0">
                                    <OAuthSocial provider={provider} onSuccess={this.socialchooseCity} />
                                    </Col>
                                ))}
                                </Row> */}
                                {/* <Row className="justify-content-center mt-4">
                                    <a href="/" style={{fontSize: '0.8rem'}}>Retour au site</a>
                                </Row> */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }    
}

export default WeatherWidgetSettings;