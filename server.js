const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const db = new sequelize('techblog_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Post = db.define('post', {
  title: sequelize.STRING,
  content: sequelize.TEXT
});

app.get('/', (req, res) => {
  Post.findAll().then(posts => {
    res.render('index', { posts });
  });
});

db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});