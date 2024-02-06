import { StatsType } from "../bussiness/types";

interface StatsProps {
  stats: StatsType;
}

export const Stats = ({stats}: StatsProps) => {
  return (
    <div className="stats" role="status">
      <strong>Total:</strong>
      {` ${stats.total} `}
      <strong>| Completed:</strong>
      {` ${stats.completed} `}
      <strong>| Remaining:</strong>
      {` ${stats.remaining}`}
    </div>
  );
};
