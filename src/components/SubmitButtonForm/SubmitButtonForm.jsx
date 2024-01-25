import { Button } from "antd";
import React from "react";

const SubmitButtonForm = ({ text, isLoading, width }) => {
  return (
    <Button
      style={{
        backgroundColor: "#1890FF",
        borderColor: "yellow",
        height: "auto",
        padding: "8px 16px",
        marginTop: "20px",
        color: "#FFF",
        width: `${width ? width : "100%"}`,
        lineHeight: "24px",
      }}
      type="primary"
      loading={isLoading}
      block={true}
      htmlType="submit"
    >
      {text}
    </Button>
  );
};

export default SubmitButtonForm;
