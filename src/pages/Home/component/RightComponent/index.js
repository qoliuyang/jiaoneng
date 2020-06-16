import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';
import SvgIcon from "@/components/SvgIcon";
import Liquidfill from '@/components/Charts/Liquidfill';

import { genHealthLiquidfill } from '@/utils/genChartData';

import styles from './index.scss';

// @connect(({ loan }) => ({
//   loan,
// }))
export default class index extends PureComponent {
  render() {
    const genHealthData=genHealthLiquidfill()
    return (
      <div className={styles.rightContent}>
        <div className={styles.title}>智慧运营分析</div>
        <div className={styles.maincontent}>
          <div className={styles.row}>
            <div className={styles.itemBig}>
              <div className={styles.name}>运行健康指数</div>
              <Liquidfill data={genHealthData} style={{ height: 180 }} />
            </div>
            <div className={styles.itemSmall}>
              <div className={styles.list}>
                <div className={styles.water}>
                  <SvgIcon iconClass="water" />
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>自来水用户数</p>
                  <p className={styles.redNum}>10,232</p>
                </div>
              </div>
              <div className={styles.list}>
                <div className={styles.gas}>
                  <SvgIcon iconClass="gas" />
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>自来水用户数</p>
                  <p className={styles.greenNum}>10,232</p>
                </div>
              </div>
              <div className={styles.list}>
                <div className={styles.parking}>
                  <SvgIcon iconClass="parking2" />
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>自来水用户数</p>
                  <p className={styles.bluNum}>10,232</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
