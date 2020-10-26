const router = require('express').Router();
let User = require('../models/user');


router.route('/').get((req,res) =>{
  User.find()
  .then(users => res.json(users))
  .catch(err => console.log(err))
})

router.route('/docexists').get((req, res) => {
  const emailnew = req.query.email
  User.exists({ email : emailnew }, (err, result) => {
    if (err) {
     res.send(err);
    } else {
     res.send(result);
    }
  })
});

router.route('/add').post((req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const newUser = new User({
    email,
    firstName,
    lastName,
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
