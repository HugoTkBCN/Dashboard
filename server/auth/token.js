//---------------------------------------------Add------------------------------------------------------
exports.getToken = function(req, res){
    var pass = req.body.pass;
    
    if (pass == "DarkZorg28") {
        var token = randtoken.generate(16);
        bcrypt.hash(token, 10, function(err, hash) {
            db.query("INSERT INTO `keys`(token) VALUES (?)", [hash], function(err, result) {
                if (err) {
                    res.status(500).send({
                        success: false,
                        message: 'Error occured'
                    });
                    throw new Error(err);
                } else {
                    db.query("select id from `keys` where Id=(SELECT LAST_INSERT_ID());", function(err, result) {
                        res.status(200).send({
                            success: true,
                            message: 'Added',
                            token: result[0].id+'/'+token
                        });
                    });
                }
            });
        });
    } else {
        res.status(400).send({
            success: false,
            message: 'Permission denied'
        });
    }
 };
  
//-----------------------------------------------Check------------------------------------------------------
exports.checkToken = function(req, res){
    if (req.headers.api_key) {
        var token = req.headers.api_key;
        var tmp = token.split('/');
        token = tmp[1];
        var id = tmp[0];
        db.query("SELECT token FROM `keys` WHERE id=?", [id], function(err, results) { 
            if (results && results.length && !err) {
                bcrypt.compare(token, results[0].token, function(err, result) {
                    if (result) {   
                        res.status(200).send({
                            success: true,
                            message: 'Good Key'
                        });                     
                    } else {
                        res.status(400).send({
                            success: false,
                            message: 'Not found'
                        });
                    }
                });
            } else if (err) {
                res.status(500).send({
                    success: false,
                    message: 'Error occured'
                });
                throw new Error(err);
            } else {
                res.status(400).send({
                    success: false,
                    message: 'Cannot get keys'
                });
            }
        });
    } else {
        res.status(400).send({
            success: false,
            message: 'No key'
        });
    }
 };