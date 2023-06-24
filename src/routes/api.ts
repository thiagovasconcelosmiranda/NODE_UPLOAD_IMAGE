import { Router, Request, Response } from "express";
import * as apiController from '../controllers/apiController';
import multer from 'multer';
import sharp from 'sharp';

//validação do arquivo
const upload = multer({
  dest: './tmp',
  fileFilter: (req, file, cb) => {
     const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
     cb(null, allowed.includes(file.mimetype));
  },
  //site para calcular bites em imagens: https://gbmb.org/mb-to-bytes
  limits:{ fieldSize: 2000000 } //Limite de arquivos
});

/*
const storageConfig = multer.diskStorage({
    /*
    destination: (req, file, cb) => {
        cb(null, './tmp');
    },
    filename: (req, file, cb) => {
        let randomName = Math.floor(Math.random() * 99999999);
        cb(null, `${randomName}`+ '.jpg');
    }  
});
const upload = multer({
    storage: storageConfig
});


const upload = multer({
   storage: multer.memoryStorage() // ele não salva a imagem, pode usar muita memória
});
*/
const router = Router();

router.get('/ping', apiController.api);
router.get('/rondom', apiController.rondom);
router.get('/nome/:nome', apiController.nome);
router.post('/frases', apiController.createPhrase);
router.get('/frases', apiController.getListPhrase);
router.get('/frases/aleatoria', apiController.randomPhrase);
router.get('/frases/:id', apiController.getPhrase);
router.put('/frases/:id', apiController.updatePrase);
router.delete('/frases/:id', apiController.deletePhrase);
/*
router.post('/upload', upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'gallery', maxCount: 3}
]), apiController.uploadFile);

*/

router.post('/upload', upload.single('avatar'), apiController.uploadFile);
export default router;