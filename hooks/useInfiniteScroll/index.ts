import { useCallback, useEffect, useRef, useState } from "react";

type hasMoreFunction = (data: any[]) => boolean;

export const useInfiniteScroll = (
  callback: () => Promise<any>,
  hasMore: boolean | hasMoreFunction
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const observer = useRef(new IntersectionObserver(() => {}));
  const triggerRef = useCallback(
    (node: any) => {
      const hasMoreResult =
        typeof hasMore === "boolean" ? hasMore : hasMore(data);

      if (isLoading || !hasMoreResult) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  const fetchData = () => {
    setIsLoading(true);
    callback().then((d) => {
      setData((state) => [...state, ...d]);
      setIsLoading(false);
    });
  };

  return { data, isLoading, triggerRef };
};
