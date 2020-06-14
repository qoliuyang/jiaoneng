import React, { memo } from 'react';
import SvgIcon from "@/components/SvgIcon";
import styles from './index.scss';

function addComma(num){
  if (Number(num).toString() === "NaN") return 0
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Labels = memo(props => {
  const { data } = props;
  return (
    <div className={styles.labelContent}>
      {data.map(t => {
        return (
          <div key={t.key} className={styles.item}>
            <SvgIcon iconClass={t.img} />
            <div className={styles.info}>
              <div className={styles.name}>{t.label}</div>
              <div className={styles.num}>{addComma(t.num)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default Labels;
