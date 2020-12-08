import axios from 'axios'
import React from "react";
import { Button } from 'react-bootstrap';
import Widget from "./Widget";

class PornhubWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            preview: ""
        }
    }

    getRedditText = (title, url, duration) => {
        var text = "";
        text+="<div>";

        text+="<div class=\"row justify-content-center\">";
        text+=title
        text+="</div>";
        text+="&nbsp;";

        text+="<div class=\"row justify-content-center\">";
        text+="duration : "+duration
        text+="</div>";
        text+="&nbsp;";

        text+="<div class=\"row justify-content-center\">";
        text+="<a href=\""+url+"\" class=\"btn btn-light\">";
        text+="Go to the video ♡"
        text+="<a class=\"row\">";
        text+="</div>";

        text+="</div>";
        return (text)
    }

    componentDidMount() {
        const url = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/pornhub";
        const param = {
            "keyword": this.props.keyword,
            "order": this.props.order
        };

        const token = localStorage.getItem("token");
        const foundToken = JSON.parse(token);

        axios.post(url, param, {headers: {'api_key': foundToken.name}})
        .then((rep) => {
            const text = this.getRedditText(rep.data.body[0].title, rep.data.body[0].url, rep.data.body[0].duration)
            this.setState({
                text: text,
                preview: rep.data.body[0].preview
            })
        }).catch(rep => {
            console.log(rep)
        });
    }

    render () {
        const { link, keyword, order } = this.props;
        const { text, preview } = this.state;
        return (
            <Button variant="light" href={link}>
                <Widget title={order+" video in "+keyword} text={text} picture={preview} styleImg={"{}"} />
            </Button>
        );
    }    
}

export default PornhubWidget;