exports.getStatus = function(req, res) {
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
                url: 'https://api.steampowered.com/ICSGOServers_730/GetGameServersStatus/v1?key=26284671909F3C715EFF2A1DE5A9F4EE',
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
                        message: 'Cannot Get'
                    });
                } else {
                    res.status(200).send({
                        success: true,
                        message: 'Get Status',
                        body : body.result.datacenters
                    });
                }
            });
        }
    });
  };
  