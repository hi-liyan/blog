import React, {useState} from "react";
import Layout from '@theme/Layout'
import {Heading, Image} from "rebass";
import Pagination from "../../components/Pagination";
import Badge from "../../components/Badge";
import {Movie, useMovieCount, useMovieList} from "@site/src/query/movies";
import './index.scss'
import {QueryClient, QueryClientProvider} from "react-query";

const MoviesRecord = () => {

  const pageSize = 3;
  const [pageNum, setPageNum] = useState(1);
  const {data: movies} = useMovieList({pageNum, pageSize});
  const {data: movieCount} = useMovieCount();

  // 构建 Tags
  const buildTags = (item: Movie) => {
    if (!item.tags) return "-"
    return item.tags.split(',').map(tag => {
      let type // 徽章类型（颜色）
      switch (tag) {
        case '电影':
          type = 'info'
          break
        case '电视剧':
          type = 'warning'
          break
        case '动漫':
          type = 'success'
          break
        default:
          type = 'primary'
      }
      return (<Badge type={type} key={Math.random()}>{tag}</Badge>)
    });
  }

  // 构建 Table
  const buildTable = () => {
    return (
      <div className='movieBox'>
        <ol className='movieTitleOl'>
          <li>封面</li>
          <li>影片名称</li>
          <li>演员</li>
          <li>年代</li>
          <li>观影日期</li>
        </ol>
        {
          movies?.map(item => (
            <ol key={item.id} className='movieItemOl'>
              <li><Image src={item.img} sx={{width: ['120px'], borderRadius: 8}}/></li>
              <li>
                {item.name} <br/>
                {buildTags(item)}
              </li>
              <li>{item.stars}</li>
              <li>{item.years}</li>
              <li>{item.date}</li>
            </ol>
          ))
        }
      </div>
    )
  }

  // 翻页
  const pageOnChange = (pageNum) => {
    setPageNum(pageNum);
  }

  return (
    <Layout title='观影记录'>
      <div className='underline'></div>
      <div className='MoviesRecordBox'>
        {/*大字标题*/}
        <Heading
          fontSize={[5, 6, 7]}
          color='#CA228D'>
          观影记录
        </Heading>
        {/*表格*/}
        <div className='tableBox'>
          {/*表格*/}
          {buildTable()}
          {/*分页组件*/}
          <Pagination currentPage={pageNum} pageSize={pageSize} total={movieCount?.count} onChange={pageOnChange}/>
        </div>
      </div>
    </Layout>
  )
}

const MoviesRecordPage = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <MoviesRecord />
    </QueryClientProvider>
  );
}

export default MoviesRecordPage;