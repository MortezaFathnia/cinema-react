import { showItemExpanded } from "../../../lib/types";
import Spinner from "../../Layout/Spinner";
import ShowListItem from "./ShowListItem";

type showListProps = {
  showItems: showItemExpanded[];
  isLoading: boolean;
};

export function ShowList({ showItems, isLoading }: showListProps) {
  return (
    <>
      <table className="table-results">
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Genres
            </th>
            <th>
              Premiered
            </th>
            <th>
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <Spinner />}

          {!isLoading &&
            showItems.map((showItem) => (
              <ShowListItem
                key={showItem.show.id}
                showItem={showItem}
              />
            ))}
        </tbody>
      </table>
    </>
  );
}

export default ShowList;
