import { useShowItemsContext } from "../../lib/hooks";
import CardList from "./card-view/CardList";
import ShowList from "./list-view/ShowList";

export default function ShowListSearch() {
  const { showItemsSortedAndSliced, isLoading, showBy } = useShowItemsContext();

  if (showItemsSortedAndSliced.length == 0) {
    return <EmptyShowContent />
  }

  return (
    <>
      {showBy === "card" ? (<CardList showItems={showItemsSortedAndSliced} isLoading={isLoading} />) : (<ShowList showItems={showItemsSortedAndSliced} isLoading={isLoading} />)}
    </>
  );
}

function EmptyShowContent() {
  return (
    <section className="show-details">
      <div>
        <div className="show-details__start-view">
          <p>What are you looking for?</p>
          <p>
            Start by searching for any name your ideal show
          </p>
        </div>
      </div>
    </section>
  );
}