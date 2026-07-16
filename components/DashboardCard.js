/**
 * components/DashboardCard.js
 */

import { classes } from "@/lib/theme";

export default function DashboardCard({ title, value, icon }) {
  return (
    <div className={`${classes.card} p-6 flex items-center gap-4`}>
      <div className={classes.statIcon}>{icon}</div>
      <div>
        <p className={classes.mutedLight}>{title}</p>
        <p className={classes.statValue}>{value}</p>
      </div>
    </div>
  );
}
