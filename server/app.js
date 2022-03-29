const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
// const expressSanitizer = require('express-sanitizer');

// Import routes
const categoryRoutes = require('./api/routes/category');
const userRoutes = require('./api/routes/user');
const feedPostRoutes = require('./api/routes/feedPost');
const invitationRoutes = require('./api/routes/invitation');
const projectRoutes = require('./api/routes/project');
const uploadRoutes = require('./api/routes/upload');

// Connect local mongo DB with server
mongoose.connect("mongodb+srv://dbUser:dbUserPassword@cluster0-evde9.gcp.mongodb.net/test?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useNewUrlParser: true
}).then(result => {
}
    
);

app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads')); // Damit client auf Bilder zugreifen kann
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(expressSanitizer());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Alllow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        return res.status(200).json({});
    }
    next();
});
 
// Define route names
app.use('/category', categoryRoutes);
app.use('/users', userRoutes);
app.use('/feedPost', feedPostRoutes);
app.use('/invitation', invitationRoutes);
app.use('/project', projectRoutes);
app.use('/upload', uploadRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;