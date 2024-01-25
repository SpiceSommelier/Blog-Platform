import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form";

import classes from "../../components/InputForm/InputForm.module.css";

const TextAreaForm = ({
  control,
  rules,
  text,
  placeholder,
  name,
  rows,
  defaultValue = "",
}) => {
  return (
    <Controller
      control={control}
      rules={rules}
      render={({
        field: { onChange, value = defaultValue },
        fieldState: { error },
      }) => (
        <div className={classes.inputContainer}>
          <p className={classes.textInput}>{text}</p>

          <TextArea
            rows={rows}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
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

export default TextAreaForm;
