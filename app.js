const express    = require('express');
const app        = express();
const logger     = require('morgan');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');

// Connect to mongodb server
mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost/apiproject')
                .then(db => {
                    console.log('DB connected!')
                })
                .catch((err) => {
                    throw err
                });

// Route files
const users = require('./routes/users');

const port = process.env.PORT || 3000;

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
// Routes
app.use('/users', users);

// Catch 404 errors and forward them to Error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    // Respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    })

    // Respond to ourselves
    console.error(err);
});


// Start the server 
app.listen(port, () => console.log(`Example app listening on port port! ${port}`));

//Run app, then load http://localhost:port in a browser to see the output.