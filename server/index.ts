import express from 'express'
import cors from 'cors';

// Importacao das rotas
import RecordCompanyRoutes from './routes/RecordCompanyRoutes';
import CDRoutes from './routes/CDRoutes';
import MusicRoutes from './routes/MusicRoutes';
import AuthorRouter from './routes/AuthorRoutes';

const app = express();

// Config JSON response
app.use(express.json());

// Solve CORS
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

// Public folder for images
app.use(express.static('public'));

// Routes
app.use('/recordcompany', RecordCompanyRoutes);
app.use('/cd', CDRoutes);
app.use('/music', MusicRoutes);
app.use('/author', AuthorRouter);

app.listen(5000, () => console.log('Estamos no back'));