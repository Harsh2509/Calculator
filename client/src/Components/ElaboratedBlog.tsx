import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogType } from "./Home";
import * as showdown from "showdown";
import { Button, Typography } from "@mui/material";

const converter = new showdown.Converter();

export const ElaboratedBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<blogType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://${import.meta.env.VITE_SECONDARY_PUBLIC_HOSTNAME}/blog/${id}`
      );
      const data = (await response.json()) as blogType;
      console.log(data);
      setBlog(data);
    })();
  }, [id]);
  return (
    <div>
      <h1>{blog && blog?.title}</h1>
      <Typography variant="body2" color="text.secondary">
        {blog && blog?.createdAt}
      </Typography>
      <hr />
      <div style={{ display: "flex", gap: "2%" }}>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => {
            navigate("/");
          }}
        >
          All Blogs
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            navigate(`/editBlog/${id}`);
          }}
        >
          Edit
        </Button>
      </div>

      {blog && (
        <div
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(blog.markdown || ""),
          }}
        />
      )}
    </div>
  );
};
