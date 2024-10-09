const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());
const whiteList = ['http://localhost:3000'];
const options = {
  origin:(origin, callback)=> {
    if(whiteList.includes(origin) || !origin){
      callback(null, true);
    }else{
      callback(new Error('Not allowed by CORS'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/nueva-ruta', (peticion, respuesta) => {
  respuesta.send('Nueva ruta');
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {11
  console.log(`Example app listening at http://localhost:${port}`);
})
