const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const cors = require('cors');
const logs = require('./routes/logEntry')
const database = require('./database/connection')
const notFound = require('./middelwares/notFoud')

const app = express();
const PORT = process.env.PORT || 8080;
require('dotenv').config()

// Uses
app.use(cors());
app.use(morgan('dev'));
app.use(helmet())
app.use(express.json())

// Routes
app.get('/',(req,res) => {
    res.status(200).json({welcome: '🌎'});
})

app.use('/api/logs', logs)

app.use(notFound.notFound)
app.use(notFound.errorHandler)


// Init server & database
app.listen(PORT , async () => {
    database().then(()=>{
        console.log(`Server running on http://localhost:${PORT}`);
    }).catch(reason => {
        console.log(reason)
    })
})
