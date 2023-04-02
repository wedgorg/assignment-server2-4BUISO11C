const pool = require("./config/db.config");

const db = {
  initDatabase: async () => {
    try {
      await pool.query(`CREATE TABLE IF NOT EXISTS blogs(
          blog_id VARCHAR(60) PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP,
          media TEXT NOT NULL,
          category VARCHAR(60)
      )`);
    } catch (error) {
      console.log(error);
    }
  },

  // Blogs

  createBlogQuery: async (blog_id, title, description, media, category) => {
    const blog = await pool.query(
      `INSERT INTO blogs(blog_id, title, description, media, category) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [blog_id, title, description, media, category]
    );
    return blog.rows[0];
  },

  getBlogsQuery: async () => {
    const blogs = await pool.query(`SELECT * FROM blogs`);
    return blogs.rows;
  },

  findBlogQuery: async (id) => {
    const blog = await pool.query(`SELECT * FROM blogs WHERE blog_id = $1`, [
      id,
    ]);
    return blog.rows[0];
  },

  deleteBlogQuery: async (id) => {
    await pool.query(`DELETE FROM blogs WHERE blog_id = $1`, [id]);
  },

  updateBlogQuery: async (title, description, media, category, blog_id) => {
    
    const blog = await pool.query(
      `UPDATE blogs SET title=$1, description=$2, media=$3, category=$4 WHERE blog_id=$5`,
      [title, description, media, category, blog_id]
    );
    console.log(blog.rows);
    return blog.rows[0];
  },
};

module.exports = db;
