import { MongoClient, MongoDBCollectionNamespace, MongoDBNamespace } from "mongodb";

const express = require('express');
const mongodb = require('./models/connect');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use('/', require('./routes'))
  .use(express.urlencoded({ extended: true }))
  .use((req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })

mongodb.initDb((err: string, mongodb: MongoClient) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});


