import Select from 'react-select'
import { GENRES_OPTIONS } from '../../lib/constants';
import { useShowItemsContext } from '../../lib/hooks';

export default function FilteringControls() {
    const { handleChangeFilterBy } = useShowItemsContext();

    return (
        <div className='sorting sorting__filter'>
            <label>Genres:</label>
            <Select onChange={handleChangeFilterBy} options={GENRES_OPTIONS} />
        </div>
    );
}