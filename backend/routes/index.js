var express = require('express');
const hellosign = require('../utils/hellosign');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Create embedded: creates signature request for a user and returns the sign_url */
router.post('/sign', function (req, res, next) {
  const { email, name } = req.body

  const options = {
    test_mode: 1,
    clientId: '153fe6c1601c1c11925eda77430b9e6d',
    title: 'NDA with Acme Co.',
    subject: 'The NDA we talked about',
    message: 'Please sign this NDA and then we can discuss more. Let me know if you have any questions.',
    signers: [
      {
        email_address: email,
        name: name,
      },
    ],
    attachments: [
      {
        name: 'Example Name',
        instructions: 'Example instructions',
        required: 1,
        signer_index: 0,
      },
    ],
    cc_email_addresses: ['azeezlukman95@gmail.com', 'lawyer@example2.com'],
    file_url: ['https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.computerhope.com%2Fissues%2Fch001278.htm&psig=AOvVaw2aEPm27Z_8YbWyeOGCivN9&ust=1640297884171000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjvmfi3-PQCFQAAAAAdAAAAABAD']
  };

  hellosign.signatureRequest.createEmbedded(options)
    .then((response) => {
      const signatureId = response.signature_request.signatures[0].signature_id;
      console.log(signatureId)

      return hellosign.embedded.getSignUrl(signatureId)
    })
    .then((response) => {
      console.log(response);
      res.status(201).json({ data: response })
    })
    .catch((error) => {
      console.log(error)

      res.status(500).json({
        error
      })
    })
})

module.exports = router;
