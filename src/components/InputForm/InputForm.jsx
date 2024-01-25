import { Input } from "antd";
import { Controller } from "react-hook-form";

import classes from "./InputForm.module.css";

const InputForm = ({
  control,
  rules,
  text,
  placeholder,
  name,
  htmlType,
  width,
}) => {
  if (htmlType === "password") {
    return (
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div className={classes.inputContainer}>
            <p className={classes.textInput}>{text}</p>

            <Input.Password
              onChange={onChange}
              value={value}
              placeholder={placeholder}
              style={{ padding: "8px 12px", width }}
            />
            {error?.message && (
              <p className={classes.textErrorInput}>{error.message}</p>
            )}
          </div>
        )}
        name={name}
      />
    );
  }
  return (
    <Controller
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={classes.inputContainer}>
          <p className={classes.textInput}>{text}</p>

          <Input
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            style={{ padding: "8px 12px", width }}
          />
          {error?.message && (
            <p className={classes.textErrorInput}>{error.message}</p>
          )}
        </div>
      )}
      name={name}
    />
  );
};

export default InputForm;
