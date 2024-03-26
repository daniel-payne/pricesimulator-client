import type { HTMLAttributes, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

type ComponentProps = {
  title?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function HomePage({
  title = "HomePage",
  ...rest
}: PropsWithChildren<ComponentProps>) {
  return (
    <div
      {...rest}
      data-component={title}
      style={{ border: "1px solid grey", padding: 2 }}
    >
      {title}
      <hr />
      <Link to="/markets">Markets</Link>
    </div>
  );
}
