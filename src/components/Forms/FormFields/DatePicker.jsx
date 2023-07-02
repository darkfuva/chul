import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

export const DatePickerComponent = ({ ...props }) => {
  return (
    <div key={props.id} id={props.id}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          {...props}
          value={props.value || null}
          sx={{
            width: '100%',
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
            '.MuiInputLabel-root': {
              background: 'white',
              paddingRight: '2px',
            },
            '.MuiFormControl-root': { width: '100%' },
          }}
        />
      </LocalizationProvider>
    </div>
  );
};
