exports.getWeather = function(req, res) {
    const options = {
        method: 'POST',
        url: 'http://localhost:8080/checkToken',
        headers: {
            'api_key': req.headers.api_key
        }
    };
    request(options, function (error, response) {
        if (error) {
            res.status(500).send({
                success: false,
                message: 'Error'
            });
            throw new Error(error);
        } else if (response.statusCode != 200) {
            res.status(400).send({
                success: false,
                message: 'Bad Token'
            });
        } else {
            const options = {
                method: 'GET',
                url: 'http://api.openweathermap.org/data/2.5/weather?q='+req.body.city+'&appid=2545656ea18d64851a760091ce8f4314&units=metric'
            };

            request(options, function (error, response, body) {
                body = JSON.parse(body);
                if (error) {
                    res.status(500).send({
                        success: false,
                        message: 'Error'
                    });
                    throw new Error(error);
                } else if (response.statusCode != 200) {
                    res.status(400).send({
                        success: false,
                        message: 'City Not found'
                    });
                } else {
                    const icon =  "http://openweathermap.org/img/wn/"+body.weather[0].icon+"@2x.png"
                    res.status(200).send({
                        success: true,
                        message: 'Get Weather',
                        body : body,
                        icon : icon
                    });
                }
            });
        }
    });
  };
  