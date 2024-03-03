import { useEffect, useState } from "react";
import NewBlog from "./NewBlog";
import { useParams } from "react-router-dom";
import { blogType } from "./Home";

export const EditBlog = () => {
  const { id } = useParams();
  const [data, setData] = useState<blogType>({
    title: "",
    description: "",
    markdown: "",
    createdAt: "",
    id: 0,
  });

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://${import.meta.env.VITE_SECONDARY_PUBLIC_HOSTNAME}/blog/${id}`
      );
      setData(await response.json());
    })();
  }, [id]);
  return (
    <NewBlog
      title={data && data?.title}
      description={data && data?.description}
      markdown={data?.markdown}
      publish={false}
      id={data?.id}
    />
  );
};
