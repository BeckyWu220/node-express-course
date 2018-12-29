const express = require('express');
const hbs = require('hbs'); //handlebars for html template
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express(); //Init an express app

hbs.registerPartials(__dirname + '/views/partials'); 
app.set('view engine', 'hbs'); //Make express app use handlebars.

app.use((req, res, next) => {
    //Logger
    var now  = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log(err);
    });
    next();
}); //This will be triggered every time user hit the website.

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// }); 
//This middleware here is going to render the maintenance page, and stop the code to execute further.

app.use(express.static(__dirname + '/public')); //Make the app to use an express middleware - express.static().
//The line of code will hold the publich folder as a static website. Check localhost:3000/help.html for results.

//HTTP routes handlers
app.get('/', (request, response) => {
    //response.send('<h1>Hello Express</h1>');
    // response.send({
    //     name: 'Becky',
    //     likes: [
    //         'Slepping',
    //         'Eating'
    //     ]
    // });
    response.render('home.hbs', {
        pageTitle: 'Welcome',
        welcomeMessage: 'Welcome to the express static localhost.',
        currentYear: new Date().getFullYear()
    });
}); //Setup a handler

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Us',
        currentYear: new Date().getFullYear()
    }); //Render template with current view engine.
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000. http://localhost:3000');
}); //Bind the app to port 3000 in our machine. Check http://localhost:3000/ for the results via Chrome.
