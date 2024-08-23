import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { SortBy, PageDirection, showItemExpanded, ShowBy, SelectOption } from "../lib/types";
import { ActionMeta, SingleValue } from "react-select";

type ShowItemsContext = {
  showItems: showItemExpanded[] | undefined;
  showItemsSortedAndSliced: showItemExpanded[];
  isLoading: boolean;
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  currentPage: number;
  sortBy: SortBy;
  showBy: ShowBy;
  filterBy: string | null;
  handleChangePage: (direction: PageDirection) => void;
  handleChangeSortBy: (newSortBy: SortBy) => void;
  handleChangeFilterBy: ((newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void) | undefined;
  handleChangeShowBy: (newShowBy: ShowBy) => void;
};

export const ShowItemsContext = createContext<ShowItemsContext | null>(null);

export default function ShowItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // dependency on other context
  const { debouncedSearchText } = useSearchTextContext();

  // state
  const { showItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("score");
  const [showBy, setShowBy] = useState<ShowBy>("card");
  const [filterBy, setFilterBy] = useState<string | null>(null);

  // derived / computed state
  const totalNumberOfResults = showItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;
  const showItemsSorted = useMemo(
    () =>
      [...(showItems || [])].sort((a, b) => {
        if (sortBy === "score") {
          return b.score - a.score;
        } else {
          if (a.show.premiered === null) {
            return 1;
          }
          else if (b.show.premiered === null) {
            return -1;
          }
          return parseInt(b.show.premiered.replace(/\s/g, '')) - parseInt(a.show.premiered.replace(/\s/g, ''));
        }
      }),
    [sortBy, showItems]
  );

  const showItemsSortedFiltered = useMemo(
    () =>
      showItemsSorted.filter((item: showItemExpanded) => {
        if (filterBy == null) {
          return item
        }
        return item.show.genres.includes(filterBy)
      }),
    [filterBy, showItemsSorted]
  );

  const showItemsSortedAndSliced = useMemo(
    () =>
      showItemsSortedFiltered.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [currentPage, showItemsSortedFiltered]
  );

  // event handlers / actions
  const handleChangePage = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);
  const handleChangeSortBy = useCallback((newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
    setFilterBy(filterBy);
    setShowBy(showBy);
  }, []);

  const handleChangeShowBy = useCallback((newShowBy: ShowBy) => {
    setCurrentPage(1);
    setSortBy(sortBy);
    setFilterBy(filterBy);
    setShowBy(newShowBy)
  }, []);

  const handleChangeFilterBy = useCallback((newFilterBy: SelectOption) => {
    setCurrentPage(1);
    setSortBy(sortBy);
    if (newFilterBy) {
      setFilterBy(newFilterBy?.value);
    }else{
      setFilterBy(null)
    }
    setShowBy(showBy)
  }, []);

  const contextValue = useMemo(
    () => ({
      showItems,
      showItemsSortedAndSliced,
      isLoading,
      totalNumberOfResults,
      totalNumberOfPages,
      currentPage,
      sortBy,
      showBy,
      filterBy,
      handleChangePage,
      handleChangeFilterBy,
      handleChangeSortBy,
      handleChangeShowBy
    }),
    [
      showItems,
      showItemsSortedAndSliced,
      isLoading,
      totalNumberOfResults,
      totalNumberOfPages,
      currentPage,
      sortBy,
      showBy,
      filterBy,
      handleChangePage,
      handleChangeSortBy,
      handleChangeFilterBy,
      handleChangeShowBy
    ]
  );

  return (
    <ShowItemsContext.Provider value={contextValue}>
      {children}
    </ShowItemsContext.Provider>
  );
}
