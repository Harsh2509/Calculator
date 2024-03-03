import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type blogType = {
  title: string;
  description: string;
  markdown: string;
  createdAt: string;
  id: number;
};

export const Home = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<blogType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://${import.meta.env.VITE_SECONDARY_PUBLIC_HOSTNAME}/blogs`
      );
      const data = await response.json();
      setBlogs(data);
    })();
  }, []);
  return (
    <>
      <h1>Blog Articles</h1>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/newBlog");
        }}
      >
        New Article
      </Button>

      {blogs.map((blog) => {
        return (
          <BlogCard
            title={blog.title}
            description={blog.description}
            date={blog.createdAt}
            key={blog.id}
            id={blog.id}
          />
        );
      })}
    </>
  );
};

function BlogCard(props: {
  title: string;
  date: string;
  description: string;
  id: number;
}) {
  const navigate = useNavigate();

  return (
    <Card style={{ margin: "2% 0" }}>
      <CardContent>
        <Typography variant="h5">{props.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {props.date}
        </Typography>
        <Typography variant="h6">{props.description}</Typography>
        <div style={{ display: "flex", gap: "1%" }}>
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/blog/${props.id}`);
            }}
          >
            Read More
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate(`/editBlog/${props.id}`);
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={async () => {
              await fetch(
                `https://${
                  import.meta.env.VITE_SECONDARY_PUBLIC_HOSTNAME
                }/blog/${props.id}`,
                {
                  method: "DELETE",
                }
              );
              window.location.reload();
            }}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
