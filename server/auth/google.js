//---------------------------------------------office login page call------------------------------------------------------
exports.officeAuth = function(req, res) {
    console.log(req);
    console.log(req.headers.api_key);
    const options = {
        method: 'POST',
        url: 'http://localhost:8080/checkToken',
        headers: {
            'api_key': req.headers.api_key
        }
   };
   console.log("la");
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
            console.log(req.body.user_name);
            var name = req.body.user_name;
            var pass = "";
            var enrollment = 0;
            
            db.query("SELECT id, user_name FROM users WHERE user_name=?", [name], function(err, results) {  
                if (results && results.length && !err) {
                    res.status(200).send({
                    success: true,
                    message: 'Connect'
                    });
                } else if (err) {
                    res.status(500).send({
                        success: false,
                        message: 'Error occured'
                    });
                } else {
                    bcrypt.hash(pass, 10, function(err, hash) {
                        db.query("INSERT INTO users(user_name, password, enrollment) VALUES (?, ?, ?)", [name, hash, enrollment], function(err, result) {
                            if (err) {
                                res.status(500).send({
                                    success: false,
                                    message: 'Error occured'
                                });
                                throw new Error(err);
                            } else {
                                res.status(200).send({
                                    success: true,
                                    message: 'Created'
                                });
                            }
                        });
                    });
                }
            });
        }
    });
};