import express from 'express';
import multer from 'multer';
import { listPosts, createPost, uploadImage } from '../controllers/postsController.js'

const upload = multer({dest: './uploads'})

function routes(app) {
  app.use(express.json());
  app.get('/posts', listPosts)
  
  app.post('/posts', createPost)
  app.post('/posts/upload', upload.single('image'), uploadImage)
};

export default routes;
