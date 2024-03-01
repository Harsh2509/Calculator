import { RunResult } from "sqlite3";
import db from ".";

export async function getAllBlogs(): Promise<
  { title: string; description: string; createdAt: string }[]
> {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM blogs`;
    db.all(
      query,
      (
        err: Error | null,
        rows: {
          title: string;
          description: string;
          createdAt: string;
          markdown: string;
          id: number;
        }[]
      ) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

export async function insertBlog(blog: {
  title: string;
  description: string;
  markdown: string;
}): Promise<number> {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO blogs (title, description, markdown, createdAt) VALUES (?,?,?,?)`;
    db.run(
      query,
      [
        blog.title,
        blog.description,
        blog.markdown,
        new Date().toLocaleDateString(),
      ],
      function (this: RunResult, err: Error | null) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(`A row has been inserted with rowid ${this.lastID}`);
          resolve(this.lastID);
        }
      }
    );
  });
}

export async function getBlog(id: number) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM blogs WHERE id=?`;
    db.all(
      query,
      [id],
      (
        err: Error,
        data: {
          title: string;
          description: string;
          createdAt: string;
          markdown: string;
          id: number;
        }[]
      ) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(data[0]);
        }
      }
    );
  });
}

export async function deleteBlog(id: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM blogs WHERE id=?`;
    db.run(query, [id], (err: Error | null) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(1);
      }
    });
  });
}

export async function updateBlog(blog: {
  title: string;
  description: string;
  markdown: string;
  id: number;
}): Promise<number> {
  return new Promise((resolve, reject) => {
    const query = `UPDATE blogs set title=?, description=?, markdown=? WHERE id=?`;
    db.run(
      query,
      [blog.title, blog.description, blog.markdown, blog.id],
      (err: Error | null) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(1);
        }
      }
    );
  });
}
