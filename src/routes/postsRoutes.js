import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { listPosts, createPost, uploadImage, listIdPost, updatePost } from '../controllers/postsController.js'

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
}

const upload = multer({dest: './uploads'})

function routes(app) {
  app.use(express.json());
  app.use(cors(corsOptions))
  app.get('/posts', listPosts)
  app.get('/posts/:id', listIdPost)
  
  app.post('/posts', createPost)
  app.post('/posts/upload', upload.single('image'), uploadImage)
  
  app.put('/posts/update/:id', updatePost)
};

export default routes;
