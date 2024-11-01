import { useRouteError } from "react-router-dom";
import "../styles/error.css"

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="errorBox">
      <p className="errorBox_errorTittle">Oops!</p>
      <p className="errorBox_errorStatus">ERROR {error.status}</p>
      <p className="errorBox_errorMessage">
        {error.statusText || error.message}
      </p>
    </div>
  );
}