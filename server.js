const express = require('express');
const Routes = require('./routes/route.js');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get('/',(req,res) => {
    res.status(200).json({'mssg': 'go'});
});

app.use('/api', Routes);

app.listen(4000, () => {
    console.log("Server onboard");
});