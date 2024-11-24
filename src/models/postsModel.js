import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectToBank from '../config/dbConfig.js'

const link = await conectToBank(process.env.STRING_CONEXAO)

export async function getAllPosts(){
  const db = link.db('instabyte');
  const colectionPost = db.collection('posts')
  return colectionPost.find().toArray();
};

export async function getIdPost(id){
  const db = link.db('instabyte');
  const colectionPost = db.collection('posts')
  const query = { _id: new ObjectId(id) };
  return colectionPost.findOne(query)
}

export async function toCreatePost(newPost){
  const db = link.db('instabyte');
  const colectionPost = db.collection('posts')
  return colectionPost.insertOne(newPost)
}

export async function toUpdatePost(id, newPost){
  const db = link.db('instabyte');
  const colectionPost = db.collection('posts')
  const objId = ObjectId.createFromHexString(id)
  return colectionPost.updateOne({_id: new ObjectId(objId)}, {$set: newPost})
}
