import React, {Component} from "react";
import Layout from '@theme/Layout'
import {Heading, Image} from "rebass";
import Pagination from "../../components/Pagination";
// import movies from "../../../json/movies.json"
import Badge from "../../components/Badge";

import './index.scss'

class MoviesRecord extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pageNum: 1, // 页码
      pageSize: 3, // 每页多少条
      total: 0, // 影片总数
      movies: [] // 影片列表

    }
  }

  componentDidMount() {
    this.getList()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 页面更新时，重新获取影片列表
    if (this.state.pageNum != prevState.pageNum) {
      this.getList()
    }
  }

  async getList() {
    const {pageNum, pageSize} = this.state
    const url = 'https://noco.surcode.cn/nc/shiguangping_blog_08v8/api/v1/movies'
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjcyMTc0ODg4OUBxcS5jb20iLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJpZCI6Miwicm9sZXMiOiJ1c2VyIiwiaWF0IjoxNjM3NzY1Mjg0fQ.eEX-nok9kYubG4bsMtuKcGuAUPen3GTl1cn5D8L3hkM'
    // res1：分页获取影片列表 res2：影片总数
    try {
      const res1 = await fetch(`${url}?limit=${pageSize}&offset=${(pageNum - 1) * pageSize}&sort=-created_at`, {
        method: 'GET',
        headers: {'xc-auth': token}
      })
      const res2 = await fetch(`${url}/count`, {
        method: 'GET',
        headers: {'xc-auth': token}
      })
      if (res1.status !== 200 || res2.status !== 200) {
        throw new Error('请求发生错误')
      }
      const movies = await res1.json()
      const {count: total} = await res2.json()
      // let arr = []
      // arr = await movies.slice((pageNum-1)*pageSize, (pageNum-1)*pageSize+pageSize)
      // console.log('movies', movies)
      // console.log('total', total)
      this.setState(() => {
        return {
          movies,
          total
        }
      })
    } catch (error) {
      console.log('error-->', error)
    }
  }

  buildTable() {
    function buildTags(item) {
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
          this.state.movies.map(item => (
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

        {/*<table style={{textAlign: 'center'}}>*/}
        {/*  <tbody>*/}
        {/*  <tr>*/}
        {/*    <th>封面</th>*/}
        {/*    <th>影片名称</th>*/}
        {/*    <th>演员</th>*/}
        {/*    <th>年代</th>*/}
        {/*    <th>观影日期</th>*/}
        {/*  </tr>*/}
        {/*  {*/}
        {/*    this.state.movieList.map(item => {*/}
        {/*      return (*/}
        {/*        <tr key={item.id}>*/}
        {/*          <td><Image src={item.img} sx={{width: ['120px'], borderRadius: 8}}/></td>*/}
        {/*          <td style={{fontWeight: 'bolder'}}>{item.name}</td>*/}
        {/*          <td>{item.stars}</td>*/}
        {/*          <td>{item.years}</td>*/}
        {/*          <td>{item.date}</td>*/}
        {/*        </tr>*/}
        {/*      )*/}
        {/*    })*/}
        {/*  }*/}
        {/*  </tbody>*/}
        {/*</table>*/}
      </div>
    )
  }

  pageOnChange = (pageNum) => {
    this.setState(() => {
      return {
        pageNum
      }
    })
  }

  render() {
    const {pageNum, pageSize, total} = this.state
    return (
      <Layout title='观影记录'>
        <div className='underline'></div>
        <div className='containerBox1'>
          {/*大字标题*/}
          <Heading
            fontSize={[5, 6, 7]}
            color='#CA228D'>
            观影记录
          </Heading>
          {/*表格*/}
          <div className='tableBox'>
            {/*表格*/}
            {this.buildTable()}
            {/*分页组件*/}
            <Pagination currentPage={pageNum} pageSize={pageSize} total={total} onChange={this.pageOnChange}/>
          </div>
        </div>
      </Layout>
    )
  }
}

export default MoviesRecord