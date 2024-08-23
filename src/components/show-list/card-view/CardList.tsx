import { showItemExpanded } from "../../../lib/types";
import CardListItem from "./CardItem";
import Spinner from "../../Layout/Spinner";

type showListProps = {
    showItems: showItemExpanded[];
    isLoading: boolean;
};

export default function CardList({ showItems, isLoading }: showListProps) {

    return (
        <ul className="card-list">
            {isLoading && <Spinner />}

            {!isLoading &&
                showItems.map((showItem) => (
                    <CardListItem
                        key={showItem.show.id}
                        showItem={showItem}
                    />
                ))}
        </ul>
    )
}

