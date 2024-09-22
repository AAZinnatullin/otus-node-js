const express = require('express');
const users = require('../fixtures/users.json');
const {createHash, generateAccessToken, verifyToken} = require('../tokens');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

router.post('/createUser', (req, res) => {
    console.log(req.body);
    if (req.body?.username && req.body?.email && req.body?.password) {
        const user = req.body;
        Object.assign(user, {id: users.length + 1});
        Object.assign(user, {role: 'user'});
        user.password = createHash(user.password);
        users.push(user);
        console.log(users);
        res.status(201).send({data: 'User was created successfully'});
    } else {
        res.status(400).send({data: 'Invalid input, request should contain body with: username, email, password'});
    }
});

router.post('/login', (req, res) => {
    console.log(req.body);
    if (req.body?.email && req.body?.password) {
        const user = users.find((u) => u.email === req.body.email);
        console.log(user);
        console.log(createHash(req.body.password));
        if (user && user.password === createHash(req.body.password)) {
            const userData = {
                email: user.email,
                password: user.password,
            }
            const token = generateAccessToken(userData);
            console.log(token);
            res.set('authorization', token).status(200).send({data: 'User was logged in successfully'});
        } else {
            res.status(401).send({data: 'Invalid email or password'});
        }
    } else {
        res.status(400).send({data: 'Invalid input, request should contain body with: email, password'});
    }
});

router.get('/guestPage', (req, res) => {
   if (req.header('authorization')) {
       const token = req.header('authorization');
       try {
           const checkToken = verifyToken(token);
           console.log(checkToken);
           res.status(200).send({data: `Welcome to the guest page! Your token is valid`});
       } catch (e) {
           res.status(403).send({data: 'Wrong token'});
       }
   } else {
       res.status(200).send({data: 'Welcome to the guest page!'});
   }
});

router.get('/clientPage', (req, res) => {
    if (req.header('authorization')) {
        const token = req.header('authorization');

        try {
            const checkToken = verifyToken(token);
            console.log(checkToken);
            res.status(200).send({data: `Welcome to the client page! Your token is valid`});
        } catch (e) {
            res.status(403).send({data: 'Wrong token' });
        }
    } else {
        res.status(401).send({data: 'Unauthorized'});
    }
});


module.exports = router;