import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import config from './config';
import root from './routes/root';
import errorHandler from './middleware/errorHandler';
import fourOhFour from './middleware/fourOhFour';

const app = express()

// Initialize database
//dbInit()

// Apply most middleware first
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors({
    origin: config.clientOrigins[config.nodeEnv]
}))

app.use(helmet())
app.use(morgan('tiny'))

// Apply routes before error handling
app.use('/', root)

// Apply error handling last
app.use(fourOhFour)
app.use(errorHandler)

export default app