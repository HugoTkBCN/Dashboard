//---------------------------------------------Add------------------------------------------------------
exports.add = function(req, res) {
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
            var name = req.body.user_name;
            var type = req.body.type;
            var data = JSON.stringify(req.body.data);
            
            db.query("SELECT id, user_name FROM users WHERE user_name=?", [name], function(err, results) {  
                if (results && results.length && !err) {
                    db.query("INSERT INTO widget(userid, type, data) VALUES (?, ?, ?)", [results[0].id, type, data], function(err, result) {
                    if (err) {
                        res.status(500).send({
                            success: false,
                            message: 'Error occured'
                        });
                        throw new Error(err);
                    } else {
                        res.status(200).send({
                            success: true,
                            message: 'Added'
                        });
                    }
                    });
                } else {
                console.error(err);
                res.status(400).send({
                    success: false,
                    message: 'Cannot get user'
                });
                }
            });
        }
    });
 };
  
//-----------------------------------------------Get------------------------------------------------------
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
            var name = req.body.user_name;
            var type = req.body.type;
            
            db.query("SELECT id, user_name FROM users WHERE user_name=?", [name], function(err, results) {  
                if (results && results.length && !err) {
                    db.query("SELECT id, data FROM widget WHERE userId=? and type=?", [results[0].id, type], function(err, result) {
                        if (err) {
                            res.status(500).send({
                                success: false,
                                message: 'Error occured'
                            });
                            throw new Error(err);
                        } else {
                            res.status(200).send({
                                success: true,
                                message: 'Get',
                                data: result
                            });
                        }
                    });
                } else {
                    res.status(400).send({
                        success: false,
                        message: 'Cannot get user'
                    });
                }
            });
        }
    });
 };

//-----------------------------------------------GetAll------------------------------------------------------
exports.getAll = function(req, res) {
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
            var name = req.body.user_name;
            
            db.query("SELECT id, user_name FROM users WHERE user_name=?", [name], function(err, results) {  
                if (results && results.length && !err) {
                    db.query("SELECT id, type, data FROM widget WHERE userId=?", [results[0].id], function(err, result) {
                        if (err) {
                            res.status(500).send({
                                success: false,
                                message: 'Error occured'
                            });
                        } else {
                            res.status(200).send({
                                success: true,
                                message: 'GetAll',
                                data: result
                            });
                        }
                    });
                } else {
                    console.error(err);
                    res.status(400).send({
                        success: false,
                        message: 'Cannot get user'
                    });
                }
            });
        }
    });
 };

//---------------------------------------------Update------------------------------------------------------
exports.update = function(req, res) {
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
            var id = req.body.id;
            var data = JSON.stringify(req.body.data);
            
            db.query("UPDATE widget SET data=? WHERE id=?", [data, id], function(err, result) {
                if (err) {
                    console.error(err);
                    res.status(500).send({
                        success: false,
                        message: 'Error occured'
                    });
                    throw new Error(err);
                } else if (result.affectedRows == 0) {
                    res.status(400).send({
                        success: true,
                        message: 'Not found'
                    });
                } else {
                    res.status(200).send({
                        success: true,
                        message: 'Updated'
                    });
                }
            });
        }
    });
 };

 //---------------------------------------------Remove------------------------------------------------------
exports.remove = function(req, res) {
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
            var id = req.body.id;

            db.query("DELETE FROM widget WHERE id=?", [id], function(err, result) {
                if (err) {
                    res.status(500).send({
                        success: false,
                        message: 'Error occured'
                    });
                    throw new Error(err);
                } else if (result.affectedRows == 0) {
                    res.status(400).send({
                        success: true,
                        message: 'Not found'
                    });
                } else {
                    res.status(200).send({
                        success: true,
                        message: 'Removed'
                    });
                }
            });
        }
    });
 };