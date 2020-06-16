import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';
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
              <div className={styles.name}>泊位占用率</div>
              <Liquidfill data={genHealthData} style={{ height: 180 }} />
            </div>
            <div className={styles.itemSmall}>2</div>
          </div>
        </div>
      </div>
    );
  }
}
