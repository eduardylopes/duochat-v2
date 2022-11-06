import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

type Params = {
  [key: string]: string;
};

type UseQuery = {
  params: Params;
  urlSearchParams: URLSearchParams;
};

function UseQuery(): UseQuery {
  const { search } = useLocation();
  const urlSearchParams = useMemo(() => new URLSearchParams(search), [search]);

  const params = urlSearchParams
    .toString()
    .split('&')
    .reduce((acc: Params, it) => {
      const [key, value] = it.split('=');
      acc[key] = value;
      return acc;
    }, {});

  return { params, urlSearchParams };
}

export default UseQuery;
