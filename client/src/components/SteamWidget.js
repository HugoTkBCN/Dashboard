import React from "react";
import { Button } from 'react-bootstrap';
import Widget from "./Widget";

class SteamWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            capacity: this.props.data.capacity,
            load:  this.props.data.load,
            text: ""
        }
    }

    getExchangeText = (capacity, load) => {
        var text = "";
        text+="<div>";
        text+="<div class=\"row\">";
        text+="capacity: "+capacity
        text+="</div>";
        text+="<div class=\"row\">";
        text+="load: "+load
        text+="</div>";
        text+="</div>";
        return (text)
    }

    componentDidMount() {
        this.setState({
            text: this.getExchangeText(this.state.capacity, this.state.load)
        })
    }

    render () {
        const { link, server } = this.props;
        const { text } = this.state;
        return (
            <Button variant="light" href={link}>
                <Widget title={"Server in "+server} text={text} styleImg={"{}"} picture="data:image/jpeg;base64,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"/>
            </Button>
        );
    }    
}

export default SteamWidget;