import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Configura le variabili d'ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());  // Per gestire richieste JSON

// Rotta di esempio
app.get('/', (req, res) => {
  res.send('Hello from Playsthenics Backend!');
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
