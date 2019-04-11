var express = require('express');
var jsonfile = require('jsonfile');
var app = express();

var memFile = "html/datafile.json";

var data = [];

var port = 12345;

setData = function(key,val) {
  if (key && val) {
    var f = data.find(i => {
      return key == i.key;
    });

    if (f) {
      f.val = val;
      //writeFile();
      return (f.val.toString());
    } else {
      return('key niet gevonden');
    }
  } else {
    return('geen key en/of waarde ontvangen!')
  }
};

getData = function(key) {
  if (key) {
    var f = data.find(i => {
      return key == i.key;
    });

    if (f) {
      return(f.val.toString());
    } else {
      return('key niet gevonden');
    }
  } else {
    return('geen key ontvangen!')
  }
};

app.use(function(req,res,next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

writeFile = function() {
  jsonfile.writeFileSync(memFile, data, {spaces: 2}, function(err) {
    if (err) console.log("file write: " +  err );
  });
}

app.get('/', function (req, res) {
  res.send('<h1>CMD.CAMP IFTTT API</h1><hr>Gebruik de instructies die je hebt gekregen om met deze API te verbinden.')
});

app.get('/list', function (req, res) {
  res.send(data);
});

app.get('/send/:key/:val/get/:key2', function (req, res) {
  setData(req.params.key,req.params.val);
  res.send(getData(req.params.key2));
});

app.get('/get/:key2/send/:key/:val', function (req, res) {
  setData(req.params.key,req.params.val);
  res.send(getData(req.params.key2));
});

app.get('/send/:key/:val', function (req, res) {
  res.send(setData(req.params.key,req.params.val));
})

app.get('/get/:key', function (req, res) {
  res.send(getData(req.params.key));
})

app.listen(port, function () {
  jsonfile.readFile(memFile, function(err, obj) {
    if (err == null) {
      data = obj;
      console.log('Loaded ' + data.length + ' keys from ' + memFile);
    } else {
      console.log(err);
    }
  });

  console.log('Livebox server listening on port ' + port + '! Timestamp: ' + Date.now());
})
