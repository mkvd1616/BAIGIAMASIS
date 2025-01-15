import express from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/your-database-name')
  .then(() => console.log('prisijungia prie mngdb'))
  .catch((err) => console.log('err', err));

const Post = mongoose.model('Post', {
  title: String,
  content: String,
});

app.use(express.json());


app.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.json({ message: 'irasas sukurtas' });
});

app.listen(3000, () => {
  console.log('veikia');
});
