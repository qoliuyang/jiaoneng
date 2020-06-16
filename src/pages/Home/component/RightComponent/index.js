import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';
import Funnel from '@/components/Charts/Funnel';

import { genRelationshipLine } from '@/utils/genChartData';

import styles from './index.scss';

// @connect(({ loan }) => ({
//   loan,
// }))
export default class index extends PureComponent {
  render() {
  
    return (
      <div className={styles.rightContent}>
        <div className={styles.title}>智慧运营分析</div>
        <div className={styles.maincontent}>
          <div className={styles.row}>
            <div className={styles.itemBig}>
              <div className={styles.name}>泊位占用率</div>
            </div>
            <div className={styles.itemSmall}>2</div>
          </div>
        </div>
      </div>
    );
  }
}
