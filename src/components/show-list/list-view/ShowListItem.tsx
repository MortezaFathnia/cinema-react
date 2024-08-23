import { StarFilledIcon } from "@radix-ui/react-icons";
import { showItemExpanded } from "../../../lib/types";

type showListItemProps = {
  showItem: showItemExpanded;
};

export default function ShowListItem({ showItem }: showListItemProps) {
  return (
    <tr className='show-item'>
      <td>
        {showItem.show.name}
      </td>
      <td>
        {showItem.show.genres.length==0 && <span>--</span>}
        {showItem.show.genres.map((item: string, index: number) => (
          item && <span key={index}>{item},</span>
        ))}
      </td>
      <td>
        {showItem.show.premiered}
      </td>
      <td>
        {showItem.score ? <>{(showItem.score * 100).toFixed(2)}<StarFilledIcon className="filled" /></> : <StarFilledIcon className="empty" />}
      </td>
    </tr>
  );
}
