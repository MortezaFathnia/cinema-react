import { StarFilledIcon } from "@radix-ui/react-icons";
import { showItemExpanded } from "../../../lib/types";

type showListItemProps = {
    showItem: showItemExpanded;
};

export default function CardListItem({ showItem }: showListItemProps) {
   
    return (
        <div className="card-wrapper">
            <div className="card__image-wrapper">
                <img src={showItem.show.image ? showItem.show.image.original : './defaultImage.avif'} />
            </div>
            <div className="card-content">
                <p><span>Name:</span>{showItem.show.name}</p>
                <p>
                    <span>Genres:</span>{showItem.show.genres.map((item: string, index: number) => (
                        item && <span key={index}>{item},</span>
                    ))}
                </p>
                <p>
                    <span>Premiered:</span>{showItem.show.premiered}
                </p>
                <p className="rating">
                    <span>Score:</span>{showItem.score?<>{(showItem.score*100).toFixed(2)}<StarFilledIcon className="filled"/></>:<StarFilledIcon className="empty"/>}
                </p>
            </div>
        </div>
    );
}



