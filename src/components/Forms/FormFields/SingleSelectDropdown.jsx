import React from "react";
import { MenuItem, TextField, TextFieldProps } from "@mui/material";

const style = {
  flex: "3.15 1 0",
  "font-size": "1.6rem",
  textField: {
    fontFamily: "var(--font-mulish)",
    ".MuiMenuItem-root": {
      fontFamily: "var(--font-mulish)",
      fontSize: "1.6rem",
    },
  },
};


const SingleSelectDropdown = ({...props }) => {
  let menuitems = props.menuitems
  delete props.menuitems
  return (
    <TextField
    {...props}
      select // tell TextField to render select
      SelectProps={{
        MenuProps: {
          sx: style.textField,
        },
      }}
      sx={{
        flex: "1 1 0",
        width: "100%",
        'fieldset':{
          borderColor: "var(--fuji-light)"
        },
        ".MuiTextField-root": {
          fontSize: "1.6rem",
          fontFamily: "var(--font-mulish)",
          padding: "8.5px 14px",
          height: "40px",
          border: "var(--fuji-bright)",
        },
        ".MuiInputLabel-root": {
          fontSize: "1.6rem",
          paddingRight: "4px",
          background: "white",
          fontFamily: "var(--font-mulish)",
        },
        ".MuiSelect-select": {
          fontSize: "1.6rem",
          fontFamily: "var(--font-mulish)",
        },
      }}
    >
      {menuitems && menuitems.map((menuItem) => (
        <MenuItem key={menuItem.label} value={menuItem.value}>
          {menuItem.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
export default SingleSelectDropdown;
