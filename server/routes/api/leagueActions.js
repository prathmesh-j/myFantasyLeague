const League = require('../../models/League');

module.exports = (app) => {
    app.get('/api/league/search/', (req, res, next) => {

        const { query } = req;
        const { name } = query;
    
        League.find({
            name: name,
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
                    Message: 'Error: Invalid !',
                    sessions: sessions
                });
            } else {
                return res.send({
                    success: true,
                    Message: 'Session good!'
                });
            }
        });
    });



    app.post('/api/league/create', function (req, res, next) {
        const { body } = req;
        const { name, createdOn, createdBy } = body;

        const newLeague = new League();
        newLeague.name = name;
        newLeague.createdOn = createdOn;
        newLeague.createdBy = createdBy;
        newLeague.members = {}

        console.log(name);
        console.log(createdOn);
        console.log(createdBy);
        
        newLeague.save((err, league) => {
            if(err) {
                return res.send({
                    success: false,
                    Message: 'Error: Server error!'
                });
            }
            return res.send({
                success: true,
                Message: 'New league created!'
            });
        });
      });


}