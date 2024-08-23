import { useShowItemsContext } from "../../lib/hooks";

export default function ResultsCount() {
  const { totalNumberOfResults } = useShowItemsContext();

  return (
    <p className="count">
      <span className="u-bold">{totalNumberOfResults}</span> results
    </p>
  );
}
