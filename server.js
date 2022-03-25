const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server

const init = async () => {
  await sequelize.sync({ force: true })
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  })
}

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });

init()

// mysql --ssl-ca=./certs/server-ca.cer --ssl-cert=./certs/client-cert.cer --ssl-key=./certs/client-key.cer  --host=db.stippled.art --user=root -p