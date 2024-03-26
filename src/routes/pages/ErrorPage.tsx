import type { HTMLAttributes, PropsWithChildren } from "react";
import { ErrorResponse, useRouteError } from "react-router-dom";

type ComponentProps = {
  title?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function ErrorPage({
  title = "ErrorPage",
  ...rest
}: PropsWithChildren<ComponentProps>) {
  const error = useRouteError() as ErrorResponse & Error;

  console.error(error);

  return (
    <div {...rest} data-component={title}>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error?.statusText || error?.message}</i>
        </p>
      </div>
    </div>
  );
}
