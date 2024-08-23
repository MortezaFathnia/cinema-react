import { useContext, useEffect, useState } from "react";
import { showItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";
import { SearchTextContext } from "../contexts/SearchTextContextProvider";
import { ShowItemsContext } from "../contexts/ShowItemsContextProvider";

// --------------------------------------------------

const fetchShowItems = async (
  searchText: string
): Promise<showItemExpanded[]> => {
  const response = await fetch(`${BASE_API_URL}?q=${searchText}`);
  // 4xx or 5xx
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

export function useSearchQuery(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["show-items", searchText],
    () => fetchShowItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: handleError,
    }
  );

  return {
    showItems: data,
    isLoading: isInitialLoading,
  } as const;
}

// --------------------------------------------------

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}

// --------------------------------------------------

export function useSearchTextContext() {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw new Error(
      "useSearchTextContext must be used within a SearchTextContextProvider"
    );
  }
  return context;
}

export function useShowItemsContext() {
  const context = useContext(ShowItemsContext);
  if (!context) {
    throw new Error(
      "useShowItemsContext must be used within a ShowItemsContextProvider"
    );
  }
  return context;
}
