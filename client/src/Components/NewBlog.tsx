import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "./NewBlog.css";
import { useNavigate } from "react-router-dom";

const NewBlog = (props: {
  title: string;
  description: string;
  markdown: string;
  id: number;
  publish: boolean;
}) => {
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle(props.title);
    setDescription(props.description);
    setMarkdown(props.markdown);
  }, [props.title, props.description, props.markdown]);

  const navigate = useNavigate();

  const buttonClickHandler = async () => {
    const reqType = props.publish ? "POST" : "PUT";
    const reqUrl = props.publish
      ? `http://localhost:3000/addblog`
      : `http://localhost:3000/blog/${props.id}`;
    const response = await fetch(reqUrl, {
      method: reqType,
      body: JSON.stringify({
        title,
        description,
        markdown,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await response.json());
    navigate("/");
  };
  return (
    <>
      <Typography variant="h3">New Article</Typography>
      <Typography fontSize="1.3rem" marginTop="1%">
        Title
      </Typography>
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <Typography fontSize="1.3rem" marginTop="1%">
        Description
      </Typography>
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <Typography fontSize="1.3rem" marginTop="1%">
        Markdown
      </Typography>
      <SimpleMDE
        value={markdown}
        onChange={(value: string) => {
          setMarkdown(value);
        }}
      />
      <Button variant="contained" onClick={buttonClickHandler}>
        {props.publish ? "Publish" : "Update this blog"}
      </Button>
    </>
  );
};

export default NewBlog;
