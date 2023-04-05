const express = require('express');
const Routes = require('./routes/route.js');
const cors=require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get('/',(req,res) => {
    res.status(200).send('https://datadigger.onrender.com/');
});

app.use('/api', Routes);

app.listen(4000, () => {
    console.log("Server onboard");
});