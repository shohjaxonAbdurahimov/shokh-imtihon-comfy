import { useRouteError, Link } from "react-router-dom";
const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404)
    return (
      <main className="grid min-h-[100vh] place-items-center px-8 ">
        <div className="text-center">
          <p className="text-9xl font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <div className="mt-10 ">
            <Link to="/" className="btn btn-secondary">
              Go home
            </Link>
          </div>
        </div>
      </main>
    );

};
export default Error;
