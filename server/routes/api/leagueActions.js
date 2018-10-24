const League = require('../../models/League');

module.exports = (app) => {
    app.get('/api/league/search/', (req, res, next) => {

        const { query } = req;
        const { id } = query;
    
        League.find({
            id: id,
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
}