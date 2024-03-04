import { useState } from "react";
export default function useToggle(val = false) {
  const [open, setOpen] = useState(val);
  const setOn = () => setOpen(true);
  const setOff = () => setOpen(false);

  return { open, setOn, setOff };
}
