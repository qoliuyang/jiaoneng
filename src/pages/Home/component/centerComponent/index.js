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
  
    const RelationshipData = genRelationshipLine();
    return (
      <div className={styles.centerContent}>
        <Funnel data={RelationshipData} style={{ height: '100%' }} />
      </div>
    );
  }
}
