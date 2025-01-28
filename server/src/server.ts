import express from 'express';
import sequelize from './config/connection.js';
import router from './routes/index.js';
import cors from 'cors'; // Change this line

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // This line is correct

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use your router
app.use(router);

// Connect to the database before starting the Express.js server
sequelize.sync().then(() => {
  console.log(`Connected to database successfully.`);
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
