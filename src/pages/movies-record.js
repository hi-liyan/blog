import React, {Component} from "react";
import Layout from '@theme/Layout'
import {Image} from "rebass";

const movies =
  [
    {
      id: 15,
      img: 'https://images.shiguangping.com/imgs/20210604204219.webp',
      name: 'The Family Man',
      stars: '尼古拉斯·凯奇 / 蒂娅·里欧妮 / 唐·钱德尔',
      years: '2000',
      date: '2021年6月4日'
    },
    {
      id: 14,
      img: 'https://images.shiguangping.com/imgs/20210604203945.webp',
      name: 'お義父さんと呼ばせて',
      stars: '远藤宪一 / 渡部笃郎 / 莲佛美沙子 / 新川优爱 / 中村伦也',
      years: '2016',
      date: '2021年6月3日'
    },
    {
      id: 13,
      img: 'https://images.shiguangping.com/imgs/20210527131935.webp',
      name: '奈緒子',
      stars: '上野树里/三浦春马',
      years: '2008',
      date: '2021年5月27日'
    },
    {
      id: 12,
      img: 'https://images.shiguangping.com/imgs/20210527132156.webp',
      name: 'ぼくは明日、昨日のきみとデートする',
      stars: '福士苍汰/小松菜奈',
      years: '2016',
      date: '2021年5月27日'
    },
    {
      id: 11,
      img: 'https://images.shiguangping.com/imgs/20210527132320.webp',
      name: '橘色奇迹 オレンジ',
      stars: '土屋太凤/山崎贤人',
      years: '2015',
      date: '2021年5月27日'
    },
    {
      id: 10,
      img: 'https://images.shiguangping.com/imgs/20210527132445.webp',
      name: '百瀬、こっちを向いて。',
      stars: '早见明里/竹内太郎/向井理',
      years: '2014',
      date: '2021年5月27日'
    },
    {
      id: 9,
      img: 'https://images.shiguangping.com/imgs/20210527132726.webp',
      name: 'Tom and Jerry（真人版）',
      stars: '科洛·莫瑞兹/迈克尔·佩纳/',
      years: '2021',
      date: '2021年5月26日'
    },
    {
      id: 8,
      img: 'https://images.shiguangping.com/imgs/20210521232151.webp',
      name: '大鱼 Big Fish',
      stars: '伊万·麦克格雷格 / 阿尔伯特·芬尼 / 比利·克鲁德普 / 杰西卡·兰格 / 海伦娜·伯翰·卡特 / 艾莉森·洛曼',
      years: '2003',
      date: '2021年5月21日'
    },
    {
      id: 7,
      img: 'https://images.shiguangping.com/imgs/20210221015329.webp',
      name: '旺达幻视 WandaVision',
      stars: '伊丽莎白·奥尔森 / 保罗·贝坦尼',
      years: '2021',
      date: '2021年2月20日'
    },
    {
      id: 6,
      img: 'https://images.shiguangping.com/imgs/20210131135526.webp',
      name: '通缉令 Wanted',
      stars: '詹姆斯·麦卡沃伊 / 摩根·弗里曼 / 安吉丽娜·朱莉',
      years: '2008',
      date: '2021年1月31日'
    },
    {
      id: 5,
      img: 'https://images.shiguangping.com//imgs/20210201093756.webp',
      name: '傲慢与偏见 Pride & Prejudice',
      stars: '凯拉·奈特莉 / 马修·麦克费登',
      years: '2005',
      date: '2021年1月31日'
    },
    {
      id: 4,
      img: 'https://images.shiguangping.com//imgs/20210126114425.webp',
      name: '我是大哥大 电影版 今日から俺は！！劇場版',
      stars: '贺来贤人 / 伊藤健太郎 / 清野菜名 / 桥本环奈',
      years: '2020',
      date: '2021年1月'
    },
    {
      id: 3,
      img: 'https://images.shiguangping.com//imgs/20210125132732.webp',
      name: '康斯坦丁 Constantine',
      stars: '马特·瑞安/ Lucy Griffiths',
      years: '2014',
      date: '2021年1月'
    },
    {
      id: 2,
      img: 'https://images.shiguangping.com//imgs/20210125112337.webp',
      name: 'A Discovery of Witches Season 2',
      stars: '马修·古迪 / 泰莉莎·帕尔墨',
      years: '2021',
      date: '2021年1月'
    },
    {
      id: 1,
      img: 'https://images.shiguangping.com//imgs/20210125112201.webp',
      name: 'A Discovery of Witches Season 1',
      stars: '马修·古迪 / 泰莉莎·帕尔墨',
      years: '2018',
      date: '更早'
    },
  ]

class MoviesRecord extends Component {

  buildTable() {
    return (
      <div style={{width: '100%', padding: '30px 15px'}}>
        <table style={{textAlign: 'center'}}>
          <tbody>
          <tr>
            <th scope='col' width='20%'>封面</th>
            <th scope='col' width='20%'>影片名称</th>
            <th scope='col' width='20%'>演员</th>
            <th scope='col' width='20%'>年代</th>
            <th scope='col' width='20%'>观影日期</th>
          </tr>
          {
            movies.map(item => {
              return (
                <tr key={item.id}>
                  <td><Image src={item.img} sx={{width: ['120px'], borderRadius: 8}}/></td>
                  <td style={{fontWeight: 'bolder'}}>{item.name}</td>
                  <td>{item.stars}</td>
                  <td>{item.years}</td>
                  <td>{item.date}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <Layout title='观影记录'>
        {this.buildTable()}
      </Layout>
    )
  }
}

export default MoviesRecord