const Player = require('../../models/Player');

module.exports = (app) => {
//   app.get('/api/counters', (req, res, next) => {
//     Counter.find()
//       .exec()
//       .then((counter) => res.json(counter))
//       .catch((err) => next(err));
//   });

  app.post('/api/players', function (req, res, next) {
    const counter = new Player({
        id: req.body.id,
        fullName: req.body.fullName,
        shortName: req.body.shortName,
        nationality: req.body.nationality,
        dateOfBirth: req.body.dateOfBirth,
        rightArmedBowl: req.body.rightArmedBowl,
        rightHandedBat: req.body.rightHandedBat
    });
    console.log('req.body', req.body);
    console.log('counter', counter);

    counter.save()
      .then(() => res.json(counter))
      .catch((err) => next(err));
  });

//   app.delete('/api/counters/:id', function (req, res, next) {
//     Counter.findOneAndRemove({ _id: req.params.id })
//       .exec()
//       .then((counter) => res.json())
//       .catch((err) => next(err));
//   });

//   app.put('/api/players/:id/increment', (req, res, next) => {
//       console.log(req.params.id.match(/^[0-9a-fA-F]{24}$/));
//     Counter.findById(req.params.id.match(/^[0-9a-fA-F]{24}$/))
//       .exec()
//       .then((counter) => {
//         counter.count++;

//         counter.save()
//           .then(() => res.json(counter))
//           .catch((err) => next(err));
//       })
//       .catch((err) => next(err));
//   });

//   app.put('/api/counters/:id/decrement', (req, res, next) => {
//     Counter.findById(req.params.id)
//       .exec()
//       .then((counter) => {
//         counter.count--;

//         counter.save()
//           .then(() => res.json(counter))
//           .catch((err) => next(err));
//       })
//       .catch((err) => next(err));
//   });
};
