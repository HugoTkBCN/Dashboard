const PornHub = require('pornhub.js')
const pornhub = new PornHub()

exports.get = function(req, res) {
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
                page: 1,
                order: req.body.order
            }
            
            pornhub.search('Video', req.body.keyword, options)
            .then(result => {
                res.status(200).send({
                    success: true,
                    message: 'Get Video',
                    body : result.data
                });
            }).catch (error => {
                res.status(500).send({
                    success: true,
                    message: 'Error'
                });
                throw new Error(error);
            });
        }
    });
};