const express = require('express');
const libre = require('libreoffice-convert');

const path = require('path');
const fs = require('fs');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, 'views'));

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function (req, res) {
    res.render("index");
});

app.post('/doctopdf', function (req, res) {
    console.log(req.body.InputFileButton);
    const extend = '.pdf'

    const enterPath = path.join('C:/Users/bhavyachhabra/OneDrive/Documents', req.body.InputFileButton);
    const outputPath = path.join('C:/Users/bhavyachhabra/OneDrive/Documents', `/example${extend}`);

    // Read file
    const file = fs.readFileSync(enterPath);
    // Convert it to pdf format with undefined filter (see Libreoffice doc about filter)
    libre.convert(file, extend, undefined, (err, done) => {
        if (err) {
            console.log(`Error converting file: ${err}`);
        }

        // Here in done you have pdf file which you can save or transfer in another stream
        fs.writeFileSync(outputPath, done);
    });

    res.send('Success');

});

// Listen
app.listen(4000, () => {
    console.log('Server listing on 4000');
})