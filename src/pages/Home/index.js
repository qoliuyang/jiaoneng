import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
// import ReactParticleLine from 'react-particle-line';
// import animate from 'animate.css';
import Header from '@/pages/Header';
// import Equipment from '@/pages/Equipment';
import Map from '@/pages/Map';
// import Loan from '@/pages/Loan';
// import Customer from '@/pages/Customer';
// import Product from '@/pages/Product';
// import Trading from '@/pages/Trading';
import ScrollNumber from '@/components/ScrollNumber';
import styles from './index.scss';
@connect(({ map }) => ({
  map,
}))
export default class index extends PureComponent {
  constructor(p) {
    super(p)
    this.state={
      scale: this.getScale(),
      sum:123456789,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.setScale)
    setInterval(()=>{
      const {sum} = this.state
      this.setState({
        sum:sum+1,
      })
    },5000)
  }

  getScale=() => {
    const {width=1920, height=540} = this.props
    const ww=window.innerWidth/width
    const wh=window.innerHeight/height
    return ww<wh?ww: wh
  }

  setScale = _.debounce(() => {
    const scale=this.getScale()
    // eslint-disable-next-line react/no-unused-state
    this.setState({ scale })
  }, 500)
  
  render() {
    const {width=1920, height=540} = this.props
    const {scale,sum} = this.state
    return (
      <div
        className={styles.homeWrap}
        style={{
        transform: `scale(${scale}) translate(0, 0)`,
        WebkitTransform: `scale(${scale}) translate(0, 0)`,
        width,
        height,
      }}
      >
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.wrap}>
          <div className={styles.left}>
            <div className={styles.topBg} />
            <div className={styles.bottomBg} />
            <div className={styles.content}>
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
                </div>
                <div className={styles.item}>
                  <div className={styles.name}>
                    供气量
                    <span>（立方米）</span>
                  </div>
                  <div className={styles.scrollWrap}>
                    <ScrollNumber numbers={sum} style={{ color: 'rgba(255,255,255,0.90)', fontSize: 24 }} />
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.name}>
                    热线工单
                    <span>（件）</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.center}>2</div>
          <div className={styles.right}>3</div>
        </div>
        {/* <div className={styles.topLeft}>
          <Equipment />
        </div>
        <div className={`${styles.topCenter} ${animate.animated} ${animate.zoomIn}`}>
          <Map />
        </div>
        <div className={styles.topRight}>
          <Loan />
        </div>
        <div className={styles.bottomLeft}>
          <Customer />
        </div>
        <div className={styles.bottomCenter}>
          <Product />
        </div>
        <div className={styles.bottomRight}>
          <Trading />
        </div> */}
      </div>
    );
  }
}
