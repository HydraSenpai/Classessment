import 'express-async-errors';
import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

//database and auth
import connectDB from './db/connect.js';

//routers
import authRouter from './routes/authRouter.js';
import classRouter from './routes/classRouter.js';

//middleware imports
import auth from './middleware/auth.js';
import notFoundMiddleWare from './middleware/not-found.js';
import errorHandlerMiddleWare from './middleware/error-handler.js';

//middleware
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome!' });
});
app.get('/api/v1', (req, res) => {
  res.json({ msg: 'API' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/classes', auth, classRouter);

//middleware calls
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
