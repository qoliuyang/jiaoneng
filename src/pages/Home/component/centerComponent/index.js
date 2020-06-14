import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';

import ScrollNumber from '@/components/ScrollNumber';
import Radar from '@/components/Charts/Radar';
import Pie from '@/components/Charts/Pie';
import Bar from '@/components/Charts/Bar';
import Line from '@/components/Charts/Line';

import LabelItem from '../LabelItem/index';

import styles from './index.scss';
import { genIndustryRadar, genBerthPie, genDrainBar,genPassengerLine,genHotlinePie} from '@/utils/genChartData';
// @connect(({ map }) => ({
//   map,
// }))
export default class index extends PureComponent {
  constructor(p) {
    super(p)
    this.state={
      sum:1234567,
    }
  }

  componentDidMount() {
    setInterval(()=>{
      const {sum} = this.state
      this.setState({
        sum:sum+1,
      })
    },5000)
  }

  render() {
    const {sum} = this.state
    const industrydata=genIndustryRadar()
    const BerthData=genBerthPie()
    const drainData=genDrainBar()
    const passengerData=genPassengerLine()
    const hotlineData=genHotlinePie()
    const dataList=[{
      label:'今日客流量',
      img:'passenger',
      num:'13480',
    },
    {
      label:'今日客流量',
      img:'drain',
      num:'180',
    },
    {
      label:'今日客流量',
      img:'parking',
      num:'5680',
    },
    {
      label:'今日客流量',
      img:'vehicle',
      num:'680',
    },
    {
      label:'今日客流量',
      img:'runningLine',
      num:'1680',
    },
  ]
    return (
      <div className={styles.leftContent}>
        <div className={styles.title}>今日运营概况</div>
        <div className={styles.maincontent}>
          <div className={styles.item}>
            <div className={styles.name}>
                    供水量
              <span>（立方米）</span>
            </div>
            <div className={styles.scrollWrap}>
              <ScrollNumber numbers={sum} style={{ color: 'rgba(255,255,255,0.90)', fontSize: 24 }} />
            </div>
            <div className={styles.name}>公交行业指标</div>
            <div className={styles.radar}>
              <Radar data={industrydata} style={{ height: 155 }} />
            </div>
            <div className={styles.name}>
                    排水量
              <span>（立方米）</span>
            </div>
            <div className={styles.radar}>
              <Bar data={drainData} style={{ height: 155 }} />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.name}>
                    供气量
              <span>（立方米）</span>
            </div>
            <div className={styles.scrollWrap}>
              <ScrollNumber numbers={sum} style={{ color: 'rgba(255,255,255,0.90)', fontSize: 24 }} />
            </div>
            <div className={styles.name}>泊位占用率</div>
            <div className={styles.radar}>
              <Pie data={BerthData} style={{ height: 155 }} />
            </div>
            <div className={styles.name}>
                  客流量
              <span>（人数）</span>
            </div>
            <div className={styles.radar}>
              <Line data={passengerData} style={{ height: 155 }} />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.name}>
                    热线工单
              <span>（件）</span>
            </div>
            <Pie data={hotlineData} style={{ height: 140}} />
            <LabelItem data={dataList} />
          </div>
        </div>
      </div>
    );
  }
}
