import { getAllPosts, toCreatePost } from '../models/postsModel.js'
import fs from 'fs';

export async function listPosts(req, res) {
    const posts = await getAllPosts()
    res.status(200).json(posts);
  }
  
export async function createPost(req, res) {
  const newPost = req.body;
  try {
    const postCreated = await toCreatePost(newPost)
    res.status(200).json(postCreated)
  } catch (erro) {
    console.error(erro.massage)
    res.status(500).json({"Erro": "erro na requisicao"})
  }
}

export async function uploadImage(req, res) {
    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
      const postCreated = await toCreatePost(newPost)
      const imgAtualizada = `uploads/${postCreated.insertedId}.png`
      fs.renameSync(req.file.path, imgAtualizada)
      res.status(200).json(postCreated)
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}