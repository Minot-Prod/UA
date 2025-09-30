import * as React from "react";
import { cn } from "../lib";

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn("btn-primary", className)} {...props} />;
}
