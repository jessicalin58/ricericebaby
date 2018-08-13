const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var favicon = require('serve-favicon')
// var path = require('path')
const fileUpload = require('express-fileupload');
const cool = require('cool-ascii-faces')
const app = express();

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(fileUpload())
  .use(favicon(path.join(__dirname, 'public', 'assets', 'favicon.ico')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/rice', (req, res) => res.render('pages/rice'))
  .get('/about', (req, res) => res.render('pages/about'))
  .get('/uploadpic', (req, res) => res.render('pages/upload'))
  .post('/upload', function (req, res) {
    if (!req.files)
      return res.status(400).send('No files were uploaded.');

      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let sampleFile = req.files.sampleFile;

      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv('public/images/ricepic.jpg', function (err) {
        if (err)
          return 
          // res.status(500).send(err);
          // res.send({err: 0, redirectUrl: "/"});
          res.redirect('/rice');
      });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


