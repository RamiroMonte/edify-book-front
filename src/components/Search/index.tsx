import { Grid, GridItem } from "@chakra-ui/react";

import React from "react";
import { Search } from "semantic-ui-react";
import { getGoogleBooks } from "../../services/api";
import { useQuery } from "react-query";

const initialState = {
  loading: false,
  results: [],
  value: "",
};

function searchReducer(state: any, action: any) {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query };
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results };
    case "UPDATE_SELECTION":
      return { ...state, selected: action.selection };

    default:
      throw new Error();
  }
}

interface IGoogleBook {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    pageCount: number;
  };
}

interface Props {
  handlerAddBookModal: (data: any) => void;
}

export default function SearchBar({ handlerAddBookModal }: Props) {
  const [state, dispatch] = React.useReducer(searchReducer, initialState);
  const { loading, results, value, selected } = state;

  const {
    data: resultBooks,
    isError,
    isLoading,
  } = useQuery<IGoogleBook[]>(["books", { filtro: value }], getGoogleBooks);

  const timeoutRef = React.useRef<any>();
  const handleSearchChange = React.useCallback(
    (e: any, data: any) => {
      clearTimeout(timeoutRef.current);
      dispatch({ type: "START_SEARCH", query: data.value });

      timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          dispatch({ type: "CLEAN_QUERY" });
          return;
        }

        dispatch({
          type: "FINISH_SEARCH",
          results: resultBooks,
        });
      }, 300);
    },
    [resultBooks]
  );
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Grid>
      <GridItem width={6}>
        <Search
          loading={loading}
          placeholder="Buscar..."
          onResultSelect={(e, data) => {
            handlerAddBookModal(data.result);
            dispatch({ type: "UPDATE_SELECTION", selection: data.result });
          }}
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
        />
      </GridItem>
    </Grid>
  );
}
