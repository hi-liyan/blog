import React, {Component} from "react";

/**
 * <p>分页组件</p>
 * <pre>
 *   api：
 *    currentPage：第几页
 *    pageSize：每页多少天
 *    total：数据总数
 *    pagerCount：分页组件上显示多少个选择器
 *    onChange 回调函数，当页码改变时回调 (currentPage){}
 * </pre>
 */
class Pagination extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {}
  }

  // 省略号
  // buildEllipsis = () =>{
  //   return (
  //     <li className="pagination__item" key={Math.random()}>
  //       <span>...</span>
  //     </li>
  //   )
  // }

  // 页码
  buildPageIndex = (currentPage, pageSize, total) => {
    const pages = Math.ceil(total / pageSize);
    let pagerCount = this.props.pagerCount ? this.props.pagerCount : 5

    const ds = new DataStructure(pagerCount)

    for (let i = 1; i <= pages; i++) {
      if (currentPage > ds.arr[pagerCount-1]) {
        ds.goRight()
      }
      if (currentPage < ds.arr[0]) {
        ds.goLeft()
      }
    }

    const lis = []
    for (let i = 0; i < ds.arr.length; i++) {
      const li = (
        <li
          className={ds.arr[i] === currentPage ? 'pagination__item pagination__item--active' : 'pagination__item'}
          key={Math.random()}
        >
          <a
            className="pagination__link"
            href="#url"
            onClick={() => {this.props.onChange(ds.arr[i])}}
          >
            {ds.arr[i]}
          </a>
        </li>
      )
      lis.push(li)
    }
    return lis
  }


  render() {
    const {currentPage, pageSize, total} = this.props
    const pages = Math.ceil(total / pageSize);

    return (
      <React.Fragment>
        <ul className="pagination">
          <li className="pagination__item disabled">
            <a
              className="pagination__link"
              href="#url"
              onClick={() => {this.props.onChange(currentPage > 1 ? currentPage - 1 : 1)}}
            >
              «
            </a>
          </li>
          {this.buildPageIndex(currentPage, pageSize, total)}
          <li className="pagination__item">
            <a
              className="pagination__link"
              href="#url"
              onClick={() => {this.props.onChange(currentPage < pages ? currentPage + 1 : pages)}}
            >
              »
            </a>
          </li>
        </ul>
      </React.Fragment>
    )
  }

}

class DataStructure {

  arr = []
  size = 5

  constructor(size) {
    this.size = size

    for (let i = 1; i <= this.size; i++) {
      this.arr.push(i)
    }
  }

  // 向右
  goRight(){
    this.arr = this.arr.slice(1, this.size)
    this.arr = [...this.arr, this.arr[this.size - 2] + 1]
  }

  // 向左
  goLeft(){
    this.arr = this.arr.slice(1, this.arr[this.size - 2])
    this.arr = [this.arr[this.size - 2] + 1, ...this.arr]
  }

}

export default Pagination