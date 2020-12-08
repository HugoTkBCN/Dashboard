var imdb = require('imdb-node-api');

exports.getMovie = function(req, res) {
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
            imdb.searchMovies(req.body.research, function (movies) {
                res.status(200).send({
                    success: true,
                    message: 'Get Movie',
                    body : movies
                });    
            }, function(error) { 
                res.status(500).send({
                    success: false,
                    message: 'Error'
                }); 
                throw new Error(error);
            });
        }
    });
  };