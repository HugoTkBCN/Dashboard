const moment = require('moment');

exports.about = function(req, res){
    res.json({
        customer: {
            host: req.ip
        },
        server : {
            current_time: moment().unix(),
            service: [{
                name: "covid",
                widgets: [{
                    name: "covid_stat",
                    description: "Display covid stat for a country",
                    params: [{
                        name: "country",
                        type: "string"
                    }]
                }]
            }, {
                name: "exchange",
                widgets: [{
                    name: "currency_rate",
                    description: "Display currency of money comparated to N others",
                    params: [{
                        name: "base",
                        type: "string"
                    }, {
                        name: "symbols",
                        type: "string"
                    }]
                }]
            }, {
                name: "pornhub",
                widgets: [{
                    name: "pornhub_research",
                    description: "Display pornhub videos by keyword and sort by “Most Recent” | “Most Viewed” | “Top Rated” | “Longest”",
                    params: [{
                        name: "keyword",
                        type: "string"
                    }, {
                        name: "order",
                        type: "string"
                    }]
                }]
            }, {
                name: "reddit",
                widgets: [{
                    name: "reddit_subreddit",
                    description: "Display N last post from a Subreddit",
                    params: [{
                        name: "name",
                        type: "string"
                    }, {
                        name: "limit",
                        type: "integer"
                    }]
                }]
            }, {
                name: "steam",
                widgets: [{
                    name: "steam_status",
                    description: "Display steam server status",
                    params: []
                }]
            }, {
                name: "weather",
                widgets: [{
                    name: "city_weather",
                    description: "Display weather for a city",
                    params: [{
                        name: "city",
                        type: "string"
                    }]
                }]
            }]
        }
	});
 };