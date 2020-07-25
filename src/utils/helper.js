import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

export const dateFormatToday = () => {
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };

  const dateString = new Date().toLocaleString('id-ID', dateOptions);

  return dateString;
};

export const formatPhoneNumber = (str) => {
  const newPhone = str.slice(3);

  return newPhone;
};

export const formatEmail = (str) => {
  const newEmail = str.substring(0, str.indexOf('@'));

  return newEmail;
};

export const Alert = (props) => {
  return <MuiAlert elevation={10} variant="filled" {...props} />;
};
