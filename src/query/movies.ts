import {useHttp} from "@site/src/utils/http";
import {useQuery} from "react-query";

export interface Movie {
  id: number,
  name: string,
  img: string,
  stars: string,
  years: string,
  date: string,
  tags: string
}
/**
 * 影片列表
 */
export const useMovieList = ({pageNum, pageSize}: {pageNum:number, pageSize: number}) => {
  const client = useHttp();
  return useQuery<Movie[]>(["movieList", pageNum, pageSize], () =>
    client("", {
      data: {
        limit: pageSize,
        offset: (pageNum -1) * pageSize,
        sort: "-created_at"
      }
    }));
};

/**
 * 影片条数
 */
export const useMovieCount = () => {
  const client = useHttp();
  return useQuery<{count: number}>("movieCount", () => client("count"));
}