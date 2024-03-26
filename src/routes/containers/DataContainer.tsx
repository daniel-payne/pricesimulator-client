import type { HTMLAttributes, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

type ComponentProps = {
  title?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function DataContainer({
  title = "DataContainer",
  ...rest
}: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={title}>
      <div className="h-full w-full flex flex-col gap-0 ">
        <div>Header</div>
        <Outlet />
        <div>Footer</div>
      </div>
    </div>
  );
}
