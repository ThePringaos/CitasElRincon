import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../controllers/authController";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        console.log('VALOR REAL:'+auth.isAuthenticated());
        if (auth.isAuthenticated()==="true") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/signin",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
