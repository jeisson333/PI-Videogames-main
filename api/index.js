// H   H  AAAAA  PPPPP   PPPPP  IIIII EEEEE  RRRRR
// H   H  A   A  P   P   P   P   I    E      R   R
// HHHHH  AAAAA  PPPPP   PPPPP   I    EEEE   RRRRR
// H   H  A   A  P       P       I    E      R  R
// H   H  A   A  P       P     IIIII  EEEEE  R   R

// // //~~~~~~~~~~~~By:Jo~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const PORT = 3001;

// Syncing all the models at once.
conn.sync({ alter: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server raised in port: ${PORT}`); // eslint-disable-line no-console
  });
});
