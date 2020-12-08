//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function(req, res) {
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
         var pass = req.body.password;
         var enrollment = req.body.enrollment;
         
         db.query("SELECT id, user_name FROM users WHERE user_name=?", [name], function(err, results) {  
            if (results && results.length && !err) {
               res.status(400).send({
                  success: false,
                  message: 'Username Exist'
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
 
//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res) {
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
         var pass = req.body.password;

         db.query("SELECT id, user_name, password FROM users WHERE user_name=?", [name], function(err, results){      
            if (results && results.length && !err) {
               bcrypt.compare(pass, results[0].password, function(err, result) {
                  if (!result) {
                     res.status(400).send({
                        success: false,
                        message: 'Bad PassWord'
                     });
                  } else {
                     res.status(200).send({
                        success: true,
                        message: 'Connected'
                     });
                  }
               });
            } else if (err) {
               res.status(500).send({
                  success: false,
                  message: 'Error occured'
               });
               throw new Error(error);
            } else {
               res.status(400).send({
                  success: false,
                  message: 'Bad UseName'
               });
            }    
         }); 
      }
   });
};