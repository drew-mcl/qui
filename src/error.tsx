import { useRouteError } from "react-router-dom";

// Define a type for your error object if you know the structure.
type ErrorWithMessage = { statusText?: string; message?: string };

// Type guard to check if an object is of the ErrorWithMessage type
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (error as ErrorWithMessage).message !== undefined || (error as ErrorWithMessage).statusText !== undefined;
}

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{isErrorWithMessage(error) ? error.statusText || error.message : "Unknown Error"}</i>
      </p>
    </div>
  );
}