import TextField from '@mui/material/TextField';

export const required = value => value ? undefined : 'Required'

export const renderTextField = ({
  label,
  input,
  type,
  value,
  meta: { touched, invalid, error },
  ...custom
  }) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    fullWidth
    type={type}
    value={value}
    {...input}
    {...custom}
  />
)


export const formError = (errorMsg) => {
  const msgs = {};
  Object.keys(errorMsg).forEach( key => {
    const msg = errorMsg[key];
    if(Array.isArray(msg)) {
      msgs[key] = msg.toString();
    } else {
      msgs[key] = msg;
    }
  });
  return msgs;
}