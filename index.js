const express = require('express' ) ;
const bodyParser = require('body-parser') ;
const cors = require('cors') ;
const db = require('./models/index.js')
const studentRoutes = require('./routes/studentRoutes.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
    try {
      res.status(200).json("Student Management Project");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.use('/studentManagement', studentRoutes);

const port = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

db.sequelize.sync().then(() => {
    app.listen(port, () => {
      try {
        console.log('server running')
      } catch (error) {
        console.log(error.message);
  }
  });
  });
