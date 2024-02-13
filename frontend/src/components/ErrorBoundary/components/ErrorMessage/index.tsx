import React from "react";


const ErrorBoundaryErrorMessage = (): React.JSX.Element => {
  return (
    <div className="card text-white bg-danger mb-3" style={{maxWidth: 288}}>
      <div className="card-header">ERROR:</div>
      <div className="card-body">
        <h5 className="card-title">An error was found.</h5>
        <p className="card-text">`The error code was: </p>
      </div>
    </div>
  );
};

export default ErrorBoundaryErrorMessage;