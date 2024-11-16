const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const postController = require("../controllers/postController");


router.get("/", postController.getPosts);
router.post("/create", postController.createPost);
router.get("/delete/:id", postController.deletePost);
router.get("/edit/:id", postController.showEditForm);
router.post("/update/:id", postController.updatePost);

router.get("/home", (req, res) => {
    res.render("index");
  });  

// Сторінка всіх постів
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();  // Отримуємо всі пости з бази даних
    res.render('posts', { posts });  // Відправляємо пости в шаблон posts.ejs
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching posts');
  }
});

// Редагування поста
router.post('/update/:id', async (req, res) => {
  const { title, description, author } = req.body;
  const postId = req.params.id;

  try {
    // Оновлення поста в базі даних
    await Post.findByIdAndUpdate(postId, { title, description, author });

    // Перенаправлення на сторінку з усіма постами після оновлення
    res.redirect('/posts');  // Переадресовуємо на сторінку, де відображаються всі пости
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating post');
  }
});

// Маршрут для пошуку
router.get("/search", async (req, res) => {
  try {
    const query = req.query.query.toLowerCase(); // Отримуємо ключове слово
    const allPosts = await Post.find(); // Отримуємо всі пости з бази
    const filteredPosts = allPosts.filter(post =>
      post.title.toLowerCase().includes(query) || post.description.toLowerCase().includes(query)
    );
    res.render("posts", { posts: filteredPosts }); // Передаємо знайдені пости у відображення
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
