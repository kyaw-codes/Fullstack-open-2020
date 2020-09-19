import React from 'react'

const ErrorNotification = ({ message }) => {
    const errorStyle = {
      color: "red",
      background: "lightgrey",
      fontSize: "20px",
      borderStyle: "solid",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
    };

    return message ? <div style={errorStyle}>{message}</div> : null;
}

export default ErrorNotification