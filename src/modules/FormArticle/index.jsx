import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormArticleContainer from "../../UI/FormArticleContainer/FormArticleContainer";
import TextAreaForm from "../../UI/TextAreaForm/TextAreaForm";
import InputForm from "../../components/InputForm/InputForm";
import SubmitButtonForm from "../../components/SubmitButtonForm/SubmitButtonForm";
import { createArticle, updateArticle } from "../../slices/MainSlice";
import classes from "./styles/FormArticle.module.css";

const FormArticle = ({ data }) => {
  const { currentArticle } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      title: data?.title ? data.title : "",
      description: data?.description ? data.description : "",
      body: data?.body ? data.body : "",
      tagList: data?.title ? [...data.tagList] : [" "],
    },
  });
  const isUpdate = data?.title;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tagList",
  });

  async function onSubmit(data) {
    if (isUpdate) {
      await dispatch(updateArticle(data));
      navigate(`/articles/${currentArticle}`);
    }
    if (!isUpdate) {
      await dispatch(createArticle(data));
      navigate("/");
    }
  }
  async function onSubmitCreateArticle(data) {
    const newArticle = await dispatch(createArticle(data));
    navigate(`/articles/${newArticle.payload.article.slug}`);
  }
  return (
    <div>
      <FormArticleContainer
        title={data?.title ? "Edit article" : "Create new article"}
      >
        <form className={classes.formArticle} onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            control={control}
            name="title"
            text="Title"
            placeholder="Title"
            rules={{
              required: "Enter title.",
              minLength: {
                value: 2,
                message: "Title must have at least 2 characters",
              },
              maxLength: {
                value: 20,
                message: "Title cannot have more than 20 characters",
              },
              validate: (prev) => {
                if (prev.slice(0, 1) === " ")
                  return "The first character in a title cannot be a space.";
              },
            }}
          />
          <InputForm
            control={control}
            name="description"
            text="Short description"
            placeholder="Short description"
            rules={{
              required: "Enter short description",
              minLength: {
                value: 2,
                message: "Short description must have at least 2 characters",
              },
              maxLength: {
                value: 200,
                message:
                  "Short description cannot have more than 200 characters",
              },
              validate: (prev) => {
                if (prev.slice(0, 1) === " ")
                  return "The first character in short description cannot be a space.";
              },
            }}
          />
          <TextAreaForm
            rows={8}
            control={control}
            name="body"
            text="Text"
            placeholder="Text"
            rules={{
              required: "Enter text.",
              minLength: {
                value: 10,
                message: "Text of post must have at least 10 characters",
              },
              validate: (prev) => {
                if (prev.slice(0, 1) === " ")
                  return "The first character in short description cannot be a space.";
              },
            }}
          />
          {fields.map((item, index, array) => (
            <div key={item.id} style={{ display: "flex", gap: "18px" }}>
              <InputForm
                width={"300px"}
                control={control}
                name={`tagList[${index}]`}
                text={`Tag ${index + 1}`}
                placeholder={`Tag ${index + 1}`}
                value={"1"}
                rules={{
                  required: "Enter tag name.",
                  minLength: {
                    value: 2,
                    message: "Tag must have at least 2 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Tag cannot have more than 20 characters",
                  },
                  validate: (prev) => {
                    if (prev.slice(0, 1) === " ")
                      return "The first character in a title cannot be a space.";
                  },
                }}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className={`${classes.deleteTagButton} button`}
              >
                Remove Field
              </button>
              {array.length === index + 1 ? (
                <button
                  className={`${classes.addTagButton} button`}
                  type="button"
                  onClick={() => {
                    append("");
                  }}
                >
                  Add Field
                </button>
              ) : null}
            </div>
          ))}
          {fields.length === 0 ? (
            <button
              className={`${classes.addTagButton} button`}
              type="button"
              onClick={() => append("")}
            >
              Add Field
            </button>
          ) : null}

          <SubmitButtonForm text="Send" width="320px" />
        </form>
      </FormArticleContainer>
    </div>
  );
};

export default FormArticle;
