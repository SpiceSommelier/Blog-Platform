import { retry } from "@reduxjs/toolkit/query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import FormContainer from "../../UI/FormContainer/FormContainer";
import TextAreaForm from "../../UI/TextAreaForm/TextAreaForm";
import CheckboxForm from "../../components/CheckboxForm/CheckboxForm";
import InputForm from "../../components/InputForm/InputForm";
import SubmitButtonForm from "../../components/SubmitButtonForm/SubmitButtonForm";
import { regexForValid } from "../../constants/regex";
import { setErrorFunction, updateUser } from "../../slices/MainSlice";

const RenderProfileEditForm = () => {
  const { userData } = useSelector((state) => state.main);
  const loginItems = [
    {
      name: "username",
      text: "Username",
      htmlType: "text",
      placeholder: "Username",
      defaultValue: userData?.username,
      rules: {
        required: "Enter your username.",
        minLength: {
          value: 4,
          message: "Username must have at least 4 characters",
        },
        maxLength: {
          value: 20,
          message: "Username must contain no more than 20 characters",
        },
      },
    },
    {
      name: "email",
      text: "Email address",
      placeholder: "Email address",
      htmlType: "text",
      defaultValue: userData?.email,
      rules: {
        required: "Enter your email.",
        pattern: {
          value: regexForValid.email,
          message: "Enter valid email.",
        },
      },
    },
    {
      name: "password",
      text: "New Password",
      placeholder: "New Password",
      htmlType: "password",
      rules: {
        required: "Enter your password.",
        minLength: {
          value: 1,
          message: "Username must have at least 1 characters",
        },
        validate: (prev) => {
          if (prev.includes(" ")) return "Password cannot contain spaces.";
        },
      },
    },
    {
      name: "image",
      text: "Avatar image(url)",
      placeholder: "Url to image",
      htmlType: "text",
      defaultValue: userData?.image,
      rules: {
        required: "Enter link on image",
        pattern: {
          value: regexForValid.link,
          message: "Enter valid link.",
        },
      },
    },
  ];
  const dispatch = useDispatch();
  const { isDataRequested, errors: serverErrors } = useSelector(
    (state) => state.main,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setError,
  } = useForm();
  useEffect(() => {
    if (userData) {
      reset((prevValues) => {
        return {
          ...prevValues,
          username: userData?.username,
          email: userData?.email,
          image: userData?.image,
          bio: userData?.bio,
        };
      });
    }
  }, [userData]);
  const onSubmit = (data) => {
    dispatch(setErrorFunction(setError));
    dispatch(updateUser(data));
  };

  return (
    <FormContainer title="Edit Profile">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "12px" }}>
          {loginItems.map((item, index) => (
            <InputForm
              control={control}
              name={item.name}
              text={item.text}
              placeholder={item.placeholder}
              rules={item.rules}
              htmlType={item.htmlType}
              key={index}
            />
          ))}
        </div>
        <TextAreaForm
          rows={8}
          control={control}
          name="bio"
          text="Bio"
          placeholder="Bio"
          rules={{
            minLength: {
              value: 10,
              message: "Text of post must have at least 10 characters",
            },
            validate: (prev) => {
              if (prev?.slice(0, 1) === " ")
                return "The first character in short description cannot be a space.";
            },
          }}
        />
        <SubmitButtonForm text="Save" isLoading={isDataRequested} />
      </form>
    </FormContainer>
  );
};

export default RenderProfileEditForm;
