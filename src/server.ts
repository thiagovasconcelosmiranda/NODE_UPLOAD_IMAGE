import express, {Request, Response, ErrorRequestHandler} from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'
import router from './routes/api';
import {sequelize} from './database/postgres';
import {MulterError} from 'multer';
import { json } from 'sequelize';

dotenv.config();


sequelize.authenticate();

const server = express();

server.use(cors({
    origin: 'https://resttesttest.com'
}));

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));
server.use('/api', router);


server.use((req: Request, res: Response)=>{
    res.status(404);
    res.json({error: 'Enpoint não encontrado'});
});
const errorHandler : ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); //Bad Resquest
    if(err instanceof MulterError){
       res.json({error: err.code});
    }else{
        console.log(err);
        res.json({èrror: 'Ocorreu algum erro.'});
    };
};

server.use(errorHandler);





server.listen(process.env.PORT);