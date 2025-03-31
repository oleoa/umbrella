"use client";

import { useSnackbar } from "./SnackbarProvider";

export default function Button() {
  const { snackbar } = useSnackbar();
  const handleClick = () => {
    snackbar.success("You successfully snuck past security");
  };
  return <button onClick={handleClick}>Click me</button>;
}
