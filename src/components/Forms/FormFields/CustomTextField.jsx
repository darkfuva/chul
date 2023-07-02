import React from 'react';
import { TextField } from '@mui/material';

const CustomTextField = ({ ...props }) => {
  return (
    <TextField
      {...props}
      variant="outlined"
      sx={{
        borderColor: 'red',
        width: '100%',
        flex: '3.15 1 0',
        fieldset: {
          borderColor: 'var(--fuji-light)',
        },
        '.MuiInputBase-input': {
          padding: '8.5px 14px',
          height: '40px',
          fontSize: 'var(--font-size-sm)',
        },
        '.MuiInputLabel-outlined': {
          fontSize: 'var(--font-size-sm)',
          backgroundColor: 'white',
          paddingRight: '7px',
        },
      }}
    />
  );
};
export default CustomTextField;
