const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports  = (app) => {

    // New User Signup
    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        const { firstName, lastName, password } = body;
        let { email } = body;

        if(!firstName) {
            return res.end({
                success: false,
                Message: 'Error: First name missing!'
            });
        }
        if(!lastName) {
            return res.send({
                success: false,
                Message: 'Error: Last name missing!'
            });
        }
        if(!email) {
            return res.send({
                success: false,
                Message: 'Error: Email missing!'
            });
        }
        if(!password) {
            return res.send({
                success: false,
                Message: 'Error: Password missing!'
            });
        }

        email = email.toLowerCase();

        User.find({
            email: email
        }, (err, previousUsers) => {
            if(err){
                return res.send({
                    success: false,
                    Message: 'Error: Server error!'
                });
            } else if(previousUsers.length > 0) {
                return res.send({
                    success: false,
                    Message: 'Error: Account alreadt exists!'
                });
            }

            const newUser = new User();
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.email = email;
            newUser.password = newUser.generateHash(password);

            newUser.save((err, user) => {
                if(err) {
                    return res.send({
                        success: false,
                        Message: 'Error: Server error!'
                    });
                }
                return res.send({
                    success: true,
                    Message: 'New user signed up!'
                });
            });

        });
    });

    // Existing User SignIn
    app.post('/api/account/signin', (req, res, next) => {
        const { body } = req;
        const { password } = body;
        let { email } = body;

        if(!email) {
            return res.send({
                success: false,
                Message: 'Error: Email missing!'
            });
        }
        if(!password) {
            return res.send({
                success: false,
                Message: 'Error: Password missing!'
            });
        }
        
        email = email.toLowerCase();

        User.find({
            email: email
        }, (err, users) => {
            if(err) {
                return res.send({
                    success: false,
                    Message: 'Error: Server error!'
                });
            }

            if(users.length != 1) {
                return res.send({
                    success: false,
                    Message: 'Error: Invalid!'
                });
            }

            const currentUser = users[0];
            if(!currentUser.validPassword(password)) {
                return res.send({
                    success: false,
                    Message: 'Error: Invalid!'
                });
            }

            // Valid User
            const userSession = new UserSession();
            userSession.userId = currentUser._id;
            userSession.save((err, doc) => {
                if(err) {
                    return res.send({
                        success: false,
                        Message: 'Error: Server error!'
                    });
                }

                return res.send({
                    success: true,
                    Message: 'Sucess: Valid login!',
                    token: doc._id,
                    currentUserId: currentUser._id
                });
            });
        });
    });

    // Verify User Session
    app.get('/api/account/verify/', (req, res, next) => {
        const { query } = req;
        const { token } = query;

        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, sessions) => {
            if(err) {
                return res.send({
                    success: false,
                    Message: 'Error: Server error!'
                });
            }
            if(sessions.length != 1) {
                return res.send({
                    success: false,
                    Message: 'Error: Invalid !'
                });
            } else {
                return res.send({
                    success: true,
                    Message: 'Session good!'
                });
            }
        });
    });

    // Logout 
    app.get('/api/account/logout/', (req, res, next) => {
        const { query } = req;
        const { token } = query;

        UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false
        }, {
            $set: {
                isDeleted: true
            }
        }, null, (err, sessions) => {
            if(err) {
                console.log(err);
                return res.send({
                    success: false,
                    Message: 'Error: Server error!'
                });
            } else {
                return res.send({
                    success: true,
                    Message: 'Logged out!'
                });
            }
        });
    });
}


