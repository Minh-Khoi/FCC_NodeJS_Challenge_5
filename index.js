var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
require('dotenv').config();

var app = express();

app.use(cors());
// Configure body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));

// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  let file = req.file;
  let resObj = {
    'name': file.originalname, 'type': file.mimetype, 'size': file.size
  };
  res.send(resObj);
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
