import React, { memo, useState, useEffect } from 'react';
import axios from 'axios';
import { moment } from '@/utils/util';
import SvgIcon from '@/components/SvgIcon';
import styles from './index.scss';

SvgIcon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_624956_br6r8nb9msp.js',
});

const FORMAT = 'HH:mm:SS';

const Header = memo(() => {
  const [time, setTime] = useState(+new Date());
  const [weather, setData] = useState({});
  useEffect(() => {
    const apiUrl = 'https://www.tianqiapi.com/api/?version=v1&appid=72948273&appsecret=ZXfB1t5v';
    async function fetchData() {
      const response = await axios(apiUrl);
      console.log(response.data)
      setData(response.data);
    }
    fetchData();
    
  },[]);

  useEffect(() => {
    const t = setInterval(() => {
      setTime(+new Date());
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const getWeek = () =>{
    const date=new Date(); 
    const day=date.getDay();
    // eslint-disable-next-line no-array-constructor
    const weeks=new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    const week=weeks[day];
        return week
  }
  return (
    <div className={styles.header}>
      <div className={styles.desc}>
        {weather.data&&weather.data[0].tem}
      </div>
      <div className={styles.title}>今日交能</div>

      <div className={styles.time}>
        <p className={styles.time1}>{moment(time).format(FORMAT)}</p>
        <p className={styles.time2}>{`${getWeek()} ${moment(time).format('YYYY.MM.DD')}`}</p>
      </div>
    </div>
  );
});

export default Header;
