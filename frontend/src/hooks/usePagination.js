import { useMemo, useState } from 'react';

export default function usePagination(items = [], perPage = 5) {
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(items.length / perPage));
  const current = useMemo(() => {
    const start = (page - 1) * perPage;
    return items.slice(start, start + perPage);
  }, [items, page, perPage]);

  const goTo = (p) => setPage(Math.min(Math.max(1, p), pageCount));
  const next = () => goTo(page + 1);
  const prev = () => goTo(page - 1);
  const reset = () => setPage(1);

  return { page, pageCount, current, goTo, next, prev, reset };
}
