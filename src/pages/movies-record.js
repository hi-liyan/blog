import React, {Component} from "react";
import Layout from '@theme/Layout'
import {Heading, Image} from "rebass";
import './movies-record.scss'
import Pagination from "../components/Pagination";
import movies from "../../json/movies.json"
class MoviesRecord extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pageNum: 1,
      pageSize: 3,
      total: movies.length,
      movieList: []

    }
  }

  componentDidMount() {
    this.getList()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.pageNum != prevState.pageNum) {
      this.getList()
    }
  }

  getList(){
    const {pageNum, pageSize, total} = this.state
    let arr = []
    arr = movies.slice((pageNum-1)*pageSize, (pageNum-1)*pageSize+pageSize)
    this.setState(()=>{
      return {
        movieList: arr
      }
    })
  }

  buildTable() {
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
          this.state.movieList.map(item => (
            <ol key={item.id} className='movieItemOl'>
              <li><Image src={item.img} sx={{width: ['120px'], borderRadius: 8}}/></li>
              <li>{item.name}</li>
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
    console.log(`pageNum=${pageNum}`)
    this.setState(()=>{
      return {
        pageNum: pageNum
      }
    })
  }

  render() {
    return (
      <Layout title='观影记录'>
        <div className='underline'></div>
        <div className='containerBox'>
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
            <Pagination currentPage={this.state.pageNum} pageSize={3} total={this.state.total} onChange={this.pageOnChange}/>
          </div>
        </div>
      </Layout>
    )
  }
}

export default MoviesRecord