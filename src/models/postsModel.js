import conectToBank from '../config/dbConfig.js'

const link = await conectToBank(process.env.STRING_CONEXAO)

export async function getAllPosts(){
  const db = link.db('instabyte');
  const colectionPost = db.collection('posts')
  return colectionPost.find().toArray();
};

export async function toCreatePost(newPost){
  const db = link.db('instabyte');
  const colectionPost = db.collection('posts')
  return colectionPost.insertOne(newPost)
}