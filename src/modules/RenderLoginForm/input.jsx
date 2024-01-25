import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import FormContainer from "../../UI/FormContainer/FormContainer";
import CheckboxForm from "../../components/CheckboxForm/CheckboxForm";
import InputForm from "../../components/InputForm/InputForm";
import SubmitButtonForm from "../../components/SubmitButtonForm/SubmitButtonForm";
import { regexForValid } from "../../constants/regex";
import { auth, autoAuth } from "../../slices/MainSlice";
import classes from "./styles/styles.module.css";

const RenderLoginForm = () => {
  const loginItems = [
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
          value: 1,
          message: "Username must have at least 1 characters",
        },
        validate: (prev) => {
          if (prev.includes(" ")) return "Password cannot contain spaces.";
        },
      },
    },
  ];
  const dispatch = useDispatch();
  const { isDataRequested } = useSelector((state) => state.main);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const onSubmit = (data) => {
    const loginData = { ...data };
    delete loginData.agree;
    console.log(loginData);
    dispatch(auth(loginData));
  };

  return (
    <FormContainer title="Sign In">
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
        <SubmitButtonForm text="Login" isLoading={isDataRequested} />
      </form>

      <p className={classes.containerLinkToSignUp}>
        Don’t have an account? <NavLink to={"/sign-up"}>Sign Up</NavLink>
      </p>
    </FormContainer>
  );
};

export default RenderLoginForm;
