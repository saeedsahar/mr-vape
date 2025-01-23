import React, { useState } from "react";
import { TextField } from "@mui/material";

const DiscountCodeField = () => {
  const [discountCode, setDiscountCode] = useState("");

  const handleChange = (e) => {
    setDiscountCode(e.target.value);
  };

  return (
    <TextField
      label="Discount Code"
      value={discountCode}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          backgroundColor: "#fff",
        },
      }}
    />
  );
};

export default DiscountCodeField;
