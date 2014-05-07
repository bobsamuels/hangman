var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var words = ["Australia",
    "Czechoslovakia",
    "Connecticut",
    "February",
    "Presbyterian",
    "Teutonic",
    "Tuesday",
    "Wednesday",
    "abandon",
    "abyss",
    "abysmal",
    "abbreviate",
    "abscond",
    "absorbent",
    "absorption",
    "abstinence",
    "abundance",
    "abundant",
    "academy",
    "acceptance",
    "acceptable",
    "acceptably",
    "accessible",
    "accidentally",
    "accommodate",
    "across",
    "actually",
    "achieve",
    "acknowledgment",
    "acoustic",
    "accordion",
    "aqueous",
    "acquiesce",
    "across",
    "acrylic",
    "actor",
    "adamant",
    "adequate",
    "adieu",
    "adhesive",
    "adjacency",
    "adjacent",
    "agitate",
    "adjective",
    "adolescent",
    "advantageous",
    "adversary",
    "aficionado",
    "afterwards",
    "against",
    "aggravate",
    "aggressive",
    "almond",
    "heirloom",
    "aerator",
    "aerial",
    "adjective",
    "adjustment",
    "ache",
    "alchemy",
    "allegiance",
    "algae",
    "align",
    "allege",
    "allegiance",
    "allowance",
    "already",
    "all right",
    "amalgam",
    "amateur",
    "amateur",
    "ambidextrous",
    "ameliorate",
    "amoeba",
    "amphitheater",
    "analyze",
    "analyst",
    "analyze",
    "anarchistic",
    "ancestral",
    "ancillary",
    "annealing",
    "anxious",
    "anxiety",
    "annihilate",
    "ingenue",
    "anniversary",
    "anonymous",
    "annoyance",
    "anomalous",
    "anomaly",
    "annoyed",
    "amphibian",
    "ensemble",
    "ancestor",
    "antecedent",
    "anecdote",
    "entrepreneur",
    "annul",
    "aneurysm",
    "ennui",
    "aggravate"];

// instruct the app to use the `bodyParser()` middleware for all routes
app.use(bodyParser());

app.use(express.static(__dirname + '/public'));

app.get('/randomWord', function(req, res) {
    var randomItem = words[Math.floor(Math.random()* words.length)];
    res.json(randomItem);
});

app.post('/login', function(req, res) {
    if((!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')) ||
        (req.body.username.length < 1 || req.body.password.length < 1)){
        res.statusCode = 400;
        return res.send('Username and password required.');
    }
    else if(req.body.username !== 'bob' || req.body.password !== 'letmein'){
        res.statusCode = 401;
        return res.send("Invalid username and password");
    }
    else{
        res.statusCode = 200;
        return res.send("OK");
    }

});


var server = app.listen(3000, function() {
    console.log('Server address %d', server.address());
    console.log('Listening on port %d', server.address().port);
});
