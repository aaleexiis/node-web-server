const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('upperCaseMe', (message) => {
    return message.toUpperCase();
});

app.use((req,res, next) => {
    const now = new Date().toDateString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to write in log file.');
        }
    });
    next();
});

/*app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance Page',
        homeMessage: "Work in progress. We'll be back soon."
    });
});*/

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        homeMessage: 'Welcome my dear friend.'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Something went wrong'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});