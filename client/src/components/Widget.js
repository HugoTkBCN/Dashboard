import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";

class Widget extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        const {title, text, picture, styleImg } = this.props;
        return (
            <Card className="shadow-small-dark">
                <div className="m-3">
                    <Card.Title style={{ textAlign: 'center' }}>{title}</Card.Title>
                    <Card.Body className="pb-0 mb-3">
                        <Row>
                            <Col lg={4}>
                                <Image src={picture} fluid style={JSON.parse(styleImg)} />
                            </Col>
                            <Col lg={8}>
                                <Row className="justify-content-center">
                                    <div dangerouslySetInnerHTML={{__html: text}}></div>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                </div>
            </Card>
        );
    }    
}

export default Widget;