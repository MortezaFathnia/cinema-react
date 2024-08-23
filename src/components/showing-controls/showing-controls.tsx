import { GridIcon, TableIcon } from "@radix-ui/react-icons";
import { useShowItemsContext } from "../../lib/hooks";

export default function ShowingControls() {
    const { showBy, handleChangeShowBy } = useShowItemsContext();

    return (
        <section className="sorting">
            <p>Show By:</p>
            <ListButton
                onClick={() => handleChangeShowBy("card")}
                isActive={showBy === "card"}
            >
                <GridIcon />
            </ListButton>
            <ListButton
                onClick={() => handleChangeShowBy("table")}
                isActive={showBy === "table"}
            >
                <TableIcon />
            </ListButton>
        </section>
    );
}

type showingButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
    isActive: boolean;
};

function ListButton({ children, onClick, isActive }: showingButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`sorting__button sorting__button--recent ${isActive ? "sorting__button--active" : ""
                }`}
        >
            {children}
        </button>
    );
}
