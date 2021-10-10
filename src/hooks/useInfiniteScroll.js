import { useState, useRef, useCallback } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const PAGE_SIZE = 30;

const useInfiniteScroll = ({ fetchMore, getCursor, pageSize = PAGE_SIZE }) => {
  let [isAllLoaded, setIsAllLoaded] = useState(false);
  let isFetchingMore = useRef(false);

  let handleScroll = useCallback(() => {
    if (isAllLoaded || isFetchingMore.current) {
      return;
    }
    isFetchingMore.current = true;
    fetchMore({
      variables: { limit: pageSize, cursorId: getCursor() },
    }).then((d) => {
      isFetchingMore.current = false;
      setIsAllLoaded(d.data.feed.length < pageSize);
    });
  }, [pageSize, getCursor, fetchMore, isAllLoaded]);

  useBottomScrollListener(handleScroll, { offset: 500, debounce: 0 });

  return isAllLoaded;
};

export default useInfiniteScroll;
