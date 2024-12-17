/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import { Form } from "./Form";

interface Post {
  id: number;
  title: string;
  body: string;
}

export const Posts = () => {
  const [data, setData] = useState<Post[]>([]);
  const [updateDataApi, setUpdateDataApi] = useState({});

  const handleDeletePost = async (id: any) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatedPost = data.filter((curPost) => {
          return curPost.id != id;
        });
        setData(newUpdatedPost);
      } else {
        console.log("Failed to delete the post:", res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePost = (curElem: any) => setUpdateDataApi(curElem);
  const getPostData = async () => {
    try {
      const res = await getPost();
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPostData();
  }, []);

  return (
    <>
      <Form
        data={data}
        setData={setData}
        updateDataApi={updateDataApi}
        setUpdateDataApi={setUpdateDataApi}
      />
      <ul className="postWrapper">
        {data.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <div className="postId"> {id}.</div>
              <div className="postTitle">Title: {title}</div>
              <div className="postDesc">Description: {body}</div>

              <div>
                <button
                  type="submit"
                  className="greenBtn"
                  onClick={() => handleUpdatePost(curElem)}
                >
                  Edit
                </button>
                <button
                  type="submit"
                  className="redBtn"
                  onClick={() => handleDeletePost(id)}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
