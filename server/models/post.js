const db = require("../dbConfig/init");

class Post {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.name = data.name;
    this.body = data.body;
    this.time = data.time;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const postsData = await db.query(`SELECT * FROM posts;`);
        const posts = postsData.rows.map((ps) => new Post(ps));
        console.log(posts);
        resolve(posts);
      } catch (err) {
        reject("Error retrieving posts");
      }
    });
  }

  static findPostById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let postData = await db.query(`SELECT * FROM posts WHERE id = $1;`, [
          id,
        ]);
        let post = new Post(postData.rows[0]);
        resolve(post);
      } catch (err) {
        reject("Post not found");
      }
    });
  }

  static create(title, name, body) {
    return new Promise(async (resolve, reject) => {
      try {
        const time = new Date().toLocaleString("en-GB", {
          timeZone: "Europe/London",
        });
        let postData = await db.query(
          `INSERT INTO posts (title, name, body, time) VALUES ($1, $2, $3, $4) RETURNING *;`,
          [title, name, body, time]
        );
        let newPost = new Post(postData.rows[0]);
        resolve(newPost);
      } catch (err) {
        reject("Error creating new post");
      }
    });
  }

  update(title, name, body) {
    return new Promise(async (resolve, reject) => {
      try {
        let updatedPostBody = await db.query(
          `UPDATE posts SET title = $1, name = $2, body = $3 WHERE id = $4 RETURNING *;`,
          [title, name, body, this.id]
        );
        console.log(updatedPostBody);
        let updatedPost = new Post(updatedPostBody.rows[0]);
        resolve(updatedPost);
      } catch (err) {
        console.log(err);
        reject("Error updating post");
      }
    });
  }

  destroy() {
    return new Promise(async (resolve, reject) => {
      try {
        await db.query(`DELETE FROM posts WHERE id = $1;`, [this.id]);
        resolve("Post was deleted");
      } catch (err) {
        reject("Unable to delete post");
      }
    });
  }
}

module.exports = Post;
