const APP = require("express")();
const jwt = require("jsonwebtoken");


var bodyParser = require("body-parser");

const { check, validationResult } = require('express-validator/check');
const ENV = process.env;
const PORT = ENV.PORT || 80;
const commons = require("./common");
const logger = commons.logger;
const user = require("./user");
const appoinment = require("./appointment");
APP.use(bodyParser.json());

//Checking Api Status
APP.get("/status", (req, res) => {
  logger.debug("Looks like server is running ok");
  res.status(200).send("Looks like everything on API server is working");
});

//to Generate Authentication token
APP.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "rajeev",
    email: "rshankabar@gmail.com",

  }
  jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({ token });

  });
})


//verfication of token

function verifyToken(req, res, next) {
  //get Auth header value
  const bearerHeader = req.headers['authorization'];
  //Check if bearer is undefined
  if (typeof bearerHeader != "undefined") {
    //Split at the space
    const bearer = bearerHeader.split(" ");
    //get token from array
    const bearerToken = bearer[1];
    //set the token 
    req.token = bearerToken;
    // next middleware 
    next();
  }
  else {
    //forbidden 
    res.sendStatus(403);
  }
}

//Apointment's API Post
APP.post("/Appointment", verifyToken, function (req, res) {
  logger.debug(`got body ${req.body}`);
  appoinment
    .insert(req.body)
    .then(function (rows) {
      jwt.verify(req.token, "secretkey", (err) => {
        if (err) {
          res.sendStatus(403);
        }
        else {
          logger.debug(`Appointment insert Id: ${rows.data.insertId} `);
          res.status(200).send(rows);
        }
      });

    })
    .catch(function (error) {
      logger.error(`Got ` + JSON.stringify(error));
      res.status(error.error).send(error);
    })
    .catch(function (error) {
      logger.error(`Got ` + JSON.stringify(error));
    });
});

//Apointment's GET API 
APP.get("/Appointment/", verifyToken, function (req, res) {
  logger.debug(`got param `);
  appoinment
    .get()
    .then(function (rows) {
      jwt.verify(req.token, "secretkey", (err) => {
        if (err) {
          res.sendStatus(403);
        }
        else {
          logger.debug(`Got ` + JSON.stringify(rows));
          res.status(200).send(rows);
        }
      });

    })
    .catch(function (error) {
      logger.error(`Got ` + JSON.stringify(error));
      res.status(error.error).send(error);
    });
});

//Apointment's DELETE API 
APP.delete("/Appointment/:id", verifyToken, function (req, res) {
  logger.debug(`got params ${req.params.id}`);
  appoinment.delete(req.params.id)
    .then(function (rows) {
      jwt.verify(req.token, "secretkey", (err) => {
        if (err) {
          res.sendStatus(403);
        }
        else {
          logger.debug(`appointment deleted with Id: ${req.params.id} `)
          res.status(200).send(rows);
        }
      });


    })
    .catch(function (error) {
      logger.error(`Got ` + JSON.stringify(error))
      res.status(error.error).send(error);
    })
});

//Apointment's PUT API 
APP.put("/Appointment/:id", verifyToken, function (req, res) {
  logger.debug(`got params ${req.params.id}`);
  appoinment.update(req.body, req.params.id)
    .then(function (rows) {
      jwt.verify(req.token, "secretkey", (err) => {
        if (err) {
          res.sendStatus(403);
        }
        else {
          logger.debug(`appointment updated with Id: `)
          res.status(200).send(rows); S
        }
      });


    })
    .catch(function (error) {
      logger.error(`Got ` + JSON.stringify(error))
      res.status(error.error).send(error);
    })
});


//user's GET API 
APP.get("/user/:id", verifyToken, (req, res) => {
  logger.debug(`got param ${req.params.id}`);
  user
    .get(req.params.id)
    .then(function (rows) {
      jwt.verify(req.token, "secretkey", (err) => {
        if (err) {
          res.sendStatus(403);
        }
        else {
          logger.debug(`Got ` + JSON.stringify(rows));
          res.status(200).send(rows);
        }
      });
    })
    .catch(function (error) {
      logger.error(`Got ` + JSON.stringify(error));
      res.status(error.error).send(error);
    });
});

//user's POST API With Token varification and Fields Validation Using Express Validator
APP.post("/user", verifyToken, [check('name', "Name should be at least 3 characters ").isLength({ min: 3 }).isAlpha().withMessage('must be all charachters'),
check('address', "address should be at least 3 characters").isLength({ min: 10 }),
check('email', "enter a valid email address").isEmail(),
check('phonenumber', "enter a valid phone number").isLength({ min: 10 }).isDecimal().withMessage("should be in number").matches(/^(\+91[\-\s]?)(91)?[789]\d{9}$/).withMessage('please Enter the country code +91'),
check("password", "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long")
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)], (req, res) => {
    logger.debug(`got body ${req.body}`);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    user
      .insert(req.body)
      .then(function (rows) {
        jwt.verify(req.token, "secretkey", (err) => {
          if (err) {
            res.sendStatus(403);
          }
          else {
            logger.debug(`user insert Id: ${rows.data.insertId} `);
            res.status(200).send(rows);
          }
        });
      })
      .catch(function (error) {
        logger.error(`Got ` + JSON.stringify(error));
        res.status(error.error).send(error);
      })
      .catch(function (error) {
        logger.error(`Got ` + JSON.stringify(error));
      });
  });

//user's DELETE API 
APP.delete("/user/:id", verifyToken, function (req, res) {
  logger.debug(`got params ${req.params.id}`);
  user
    .delete(req.params.id)
    .then(function (rows) {
      jwt.verify(req.token, "secretkey", (err) => {
        if (err) {
          res.sendStatus(403);
        }
        else {
          logger.debug(`user deleted with Id: ${req.params.id} `);
          res.status(200).send(rows);
        }
      });

    })
    .catch(function (error) {
      logger.error(`Got ` + JSON.stringify(error));
      res.status(error.error).send(error);
    });
});

//user's PUT API 
APP.put("/user/:id", verifyToken, function (req, res) {
  logger.debug(`got params ${req.params.id}`);
  user
    .update(req.body, req.params.id)
    .then(function (rows) {
      jwt.verify(req.token, "secretkey", (err) => {
        if (err) {
          res.sendStatus(403);
        }
        else {
          logger.debug(`user updated with Id: `);
          res.status(200).send(rows);
        }
      });

    })
    .catch(function (error) {
      logger.error(`Got ` + JSON.stringify(error));
      res.status(error.error).send(error);
    });
});

//Listening to the Port
APP.listen(PORT, () => logger.debug(`API server listening on port ${PORT}!`));