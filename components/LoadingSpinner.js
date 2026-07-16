/**
 * components/LoadingSpinner.js
 */

import { classes } from "@/lib/theme";

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className={classes.spinner} />
      <p className={`mt-4 ${classes.mutedLight}`}>{message}</p>
    </div>
  );
}
