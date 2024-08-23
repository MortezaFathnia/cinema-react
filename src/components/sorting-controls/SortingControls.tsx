import { useShowItemsContext } from "../../lib/hooks";

export default function SortingControls() {
  const { sortBy, handleChangeSortBy } = useShowItemsContext();

  return (
    <section className="sorting">
      <p>Sort By:</p>
      <SortingButton
        onClick={() => handleChangeSortBy("score")}
        isActive={sortBy === "score"}
      >
        Score
      </SortingButton>
      <SortingButton
        onClick={() => handleChangeSortBy("recent")}
        isActive={sortBy === "recent"}
      >
        Recent
      </SortingButton>
    </section>
  );
}

type SortingButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
};

function SortingButton({ children, onClick, isActive }: SortingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--recent ${
        isActive ? "sorting__button--active" : ""
      }`}
    >
      {children}
    </button>
  );
}
