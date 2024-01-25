import { Checkbox } from "antd";
import { Controller } from "react-hook-form";

import classes from "./CheckboxForm.module.css";

const CheckboxForm = ({ control, rules, text, name }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={classes.checkboxContainer}>
          <Checkbox onChange={onChange} value={value}>
            {text}
          </Checkbox>
          {error?.message && (
            <p className={classes.textErrorCheckbox}>{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default CheckboxForm;
