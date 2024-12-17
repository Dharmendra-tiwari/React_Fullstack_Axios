/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { postData, updateData } from "../api/PostApi";

export const Form = ({
  data,
  setData,
  updateDataApi,
  setUpdateDataApi,
}: any) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  const isEmpty = Object.keys(updateDataApi).length === 0;

  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  const handleInputForm = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    const res = await postData(addData);
    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  const updatePostData = async () => {
    try {
      const res = await updateData(updateDataApi.id, addData);
      console.log(res);

      if (res.status === 200) {
        setData((prev: any) => {
          return prev.map((curElem: any) => {
            return curElem.id === res.data.id ? res.data : curElem;
          });
        });

        setAddData({ title: "", body: "" });
        setUpdateDataApi({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "ADD") {
      addPostData();
    } else if (action === "EDIT") {
      updatePostData();
    }
  };
  return (
    <div className="postFormWrap">
      <div className="postFormInner">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Add Title"
            name="title"
            value={addData.title}
            onChange={handleInputForm}
          />
          <input
            type="text"
            placeholder="Add Post"
            name="body"
            value={addData.body}
            onChange={handleInputForm}
          />
          <button
            type="submit"
            className="greenBtn"
            value={isEmpty ? "ADD" : "EDIT"}
          >
            {isEmpty ? "ADD" : "EDIT"}
          </button>
        </form>
      </div>
    </div>
  );
};
