import axios from 'axios'
import React from "react";
import { Button } from 'react-bootstrap';
import Widget from "./Widget";

class RedditWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            thumbnail: ""
        }
    }

    getRedditText = (title, url, ups) => {
        var text = "";
        text+="<div>";

        text+="<div class=\"row justify-content-center\">";
        text+="title : "+title
        text+="</div>";
        text+="&nbsp;";

        text+="<div class=\"row justify-content-center\">";
        text+="thumbs up : "+ups
        text+="</div>";
        text+="&nbsp;";

        text+="<div class=\"row justify-content-center\">";
        text+="<a href=\""+url+"\" class=\"btn btn-light\">";
        text+="Go to the post"
        text+="<a class=\"row\">";
        text+="</div>";

        text+="</div>";
        return (text)
    }

    componentDidMount() {
        const url = "http://localhost:"+process.env.REACT_APP_SERVER_PORT+"/getSubReddit";
        const param = {
            "name": this.props.sub,
            "limit": this.props.nbPost
        };

        const token = localStorage.getItem("token");
        const foundToken = JSON.parse(token);

        axios.post(url, param, {headers: {'api_key': foundToken.name}})
        .then((rep) => {
            const ups = rep.data.body.data.children[0].data.ups >= 0 ? rep.data.body.data.children[0].data.ups : rep.data.body.data.children[0].data.downs*-1
            const text = this.getRedditText(rep.data.body.data.children[0].data.title, rep.data.body.data.children[0].data.url, ups)
            this.setState({
                text: text,
                thumbnail: rep.data.body.data.children[0].data.thumbnail
            })
        }).catch(rep => {
            console.log(rep)
        });
    }

    render () {
        const { link, sub } = this.props;
        const { text, thumbnail } = this.state;
        return (
            <Button variant="light" href={link}>
                <Widget title={"top post today in "+sub} text={text} picture={thumbnail} styleImg={"{\"borderRadius\": \"50%\"}"} />
            </Button>
        );
    }    
}

export default RedditWidget;