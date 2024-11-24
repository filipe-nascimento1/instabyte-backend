import { getAllPosts, toCreatePost, getIdPost, toUpdatePost } from '../models/postsModel.js'
import fs from 'fs';
import gerarDescricaoComGemini from '../services/geminiServices.js'

export async function listPosts(req, res) {
    const posts = await getAllPosts()
    res.status(200).json(posts);
  }
  
export async function listIdPost(req, res) {
  const id = req.params.id
  const idPost = await getIdPost(id)
  res.status(200).json(idPost)
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

export async function updatePost(req, res) {
  const id = req.params.id;
  const urlImage = `http://localhost:3000/${id}.png`
  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
    const descricao = await gerarDescricaoComGemini(imgBuffer)
    const post = {
    imgUrl: urlImage,
    descricao: descricao,
    alt: req.body.alt
  }
    const postCreated = await toUpdatePost(id, post)
    res.status(200).json(postCreated)
  } catch (erro) {
    console.error(erro.massage)
    res.status(500).json({"Erro": "erro na requisicao"})
  }
}