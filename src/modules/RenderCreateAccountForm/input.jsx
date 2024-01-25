import { Button } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import FormContainer from "../../UI/FormContainer/FormContainer";
import CheckboxForm from "../../components/CheckboxForm/CheckboxForm";
import InputForm from "../../components/InputForm/InputForm";
import SubmitButtonForm from "../../components/SubmitButtonForm/SubmitButtonForm";
import { regexForValid } from "../../constants/regex";
import {
  requestOnCreateAccount,
  setErrorFunction,
} from "../../slices/MainSlice";
import classes from "./styles/styles.module.css";

const RenderCreateAccountForm = () => {
  const dispatch = useDispatch();
  const { isDataRequested } = useSelector((state) => state.main);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
    setError,
  } = useForm();
  function onSubmit(data) {
    const accountData = { ...data };
    delete accountData["repeat_password"];
    delete accountData.agree;
    dispatch(setErrorFunction(setError));
    dispatch(requestOnCreateAccount({ accountData }));
  }
  const loginItems = [
    {
      name: "username",
      text: "Username",
      htmlType: "text",
      placeholder: "Username",
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
      text: "Password",
      placeholder: "Password",
      htmlType: "password",
      rules: {
        required: "Enter your password.",
        minLength: {
          value: 6,
          message: "Password must have at least 6 characters.",
        },
        maxLength: {
          value: 40,
          message: "Password must contain no more than 40 characters.",
        },
        validate: () => {
          if (watch("password") !== watch("repeat_password"))
            return "Your passwords do no match";
        },
      },
    },
    {
      name: "repeat_password",
      text: "Repeat Password",
      placeholder: "Password",
      htmlType: "password",
      rules: {
        required: "Repeat your password.",
        minLength: {
          value: 6,
          message: "Password must have at least 6 characters.",
        },
        maxLength: {
          value: 40,
          message: "Password must contain no more than 40 characters.",
        },
        validate: () => {
          if (watch("password") !== watch("repeat_password"))
            return "Your passwords do no match";
        },
      },
    },
  ];
  return (
    <FormContainer title="Create new account">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.inputs}>
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
        <CheckboxForm
          name={"agree"}
          control={control}
          rules={{
            required: "Agree to the processing of my personal information.",
          }}
          text={"I agree to the processing of my personal information"}
        />
        <SubmitButtonForm text="Create" isLoading={isDataRequested} />
      </form>
      <p className={classes.containerLinkToSignUp}>
        Already have an account? <NavLink to={"/sign-in"}>Sign In.</NavLink>
      </p>
    </FormContainer>
  );
};

export default RenderCreateAccountForm;
