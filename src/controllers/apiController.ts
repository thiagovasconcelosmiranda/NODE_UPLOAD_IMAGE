import { Request, Response } from "express";
import {Sequelize} from 'sequelize'
import {Phease} from  '../models/Phrase';
import sharp from "sharp";
import { unlink } from "fs";


export const api = (req: Request, res: Response) => {
     res.json({pong: true});
}

export const rondom = (req: Request, res: Response) => {
    let nRand: number = Math.floor(Math.random() * 10 );
    res.json({number: nRand});
    
};

export const nome = (req: Request, res: Response) => {
      let nome: string = req.params.nome;
      res.json({nome: `Você enviou o nome ${nome}`});
};

export const createPhrase = async (req: Request, res: Response)=>{
    let id: number = 15;
    let {author, txt} = req.body;

  let newPhrase =  await Phease.create({ author, txt});

   res.json({id: newPhrase.id, author, txt});
}

export const getListPhrase = async (req: Request, res: Response)=>{

    let list = await Phease.findAll();
;
     res.json({list});
};

export const getPhrase = async (req: Request, res: Response) => {
     let id = req.params.id;
     let list = await Phease.findByPk(id);
    if(list){
        res.json({list});
    }else{
        res.json({error: 'Frase não encontrada'});
    }     
};

export const updatePrase = async (req: Request, res: Response) =>{
    let id = req.params.id;
    let {author, txt} = req.body;

   let phrase =  await Phease.update({author: author, txt:txt }, {
       where:{
          id: id
          }  
   })

   if(phrase){
      let list =  await Phease.findByPk(id);
      res.json({list})
   }else{
      res.json({error: 'Phrase não alterardo '});
   }
    
}

export const deletePhrase = async (req: Request, res: Response) => {
    let id = req.params.id;

   let phrase = await  Phease.destroy({
        where: {
            id: id
        }
    })
    if(phrase){
        res.json({data: 'Deletado com sucesso'});
    }else{
        res.json({error: 'Phrase não deletado'});
    }
 
}

 export const randomPhrase = async (req: Request, res: Response) => {
      let phrase = await Phease.findOne({
        order:[
             Sequelize.fn('RANDOM') 
        ]
      });

      if(phrase){
        res.json({phrase});
      }else{
        res.json({error: 'Não há frases cadastradas'});
      }
 }

 export const uploadFile =  async (req: Request, res: Response)=>{
   // const files = req.files as {[fieldname: string]: Express.Multer.File[] }; //tratamento do TS
   /*
    type UploadTypes = {
      avatar: Express.Multer.File[],
      gallery: Express.Multer.File[]
    //[fieldname: string]: Express.Multer.File[]
    }
   */
    //console.log('AVATAR', files.avatar);
    //console.log('GALLERY', files.gallery);
    
  //  console.log('FILE', req.file);
   // console.log('FILES', req.files);

   //sharp
   if(req.file){
     let filename = `${req.file.filename}.jpg`;
      await sharp(req.file.path)
       .resize(200,200, {
        fit: sharp.fit.cover,
        position:'top'
       })
       .toFormat('jpeg')
       .toFile(`./public/media/${req.file.filename}.jpg`);
       await unlink(req.file.filename, (error)=>{
           console.log("Erro deletar", error);

       }) // deletar imagens temporarias

       res.json({image: `${filename}.jpg`});
   }else{
      res.status(400);
      res.json({error: 'Arquivo invalido'});
   }

    res.json({});
 }
