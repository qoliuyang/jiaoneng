/* eslint-disable no-useless-concat */
import echarts from 'echarts';

const styles = 'display:inline-block;width:8px;height:8px;border-radius:4px;margin-right:6px;';

export function genLoanStatistical(loan, labels) {
  return {
    title: {
      text: '2019年贷款金额分布（万元）',
      textStyle: {
        color: '#eee',
        fontSize: 14,
      },
      top: 0,
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: params => {
        return `
          <p style="text-align:left;font-size:12px;line-height:18px">${params[0].name}</p>
          ${params
            .map(({ color, seriesName, value }) => {
              return value !== '-'
                ? `
                <p style="text-align:left;line-height:18px">
                  <i class="chart-circle" style="${styles}background-color:${color.colorStops[0].color}"></i>
                  ${seriesName}：${value}
                </p>
              `
                : null;
            })
            .join('')}
        `;
      },
    },
    xAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          fontSize: 10,
          color: '#666',
        },
      },
      type: 'category',
      boundaryGap: true,
      data: loan.balance && loan.balance.map(t => `${t.date}月`),
    },
    yAxis: {
      inverse: false,
      splitNumber: 5,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          fontSize: 10,
          color: '#666',
        },
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(168, 178, 185, .1)',
        },
      },
      type: 'value',
    },
    legend: {
      show: false,
    },
    grid: {
      top: '50px',
      left: '0',
      right: '0',
      bottom: '20px',
      containLabel: true,
    },
    series: Object.keys(loan).map(k => ({
      name: labels.loan[k],
      barWidth: '10px',
      stack: k.indexOf('balance') === -1 ? 'one' : 'two',
      data: loan[k].map(t => t.value),
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: k.indexOf('balance') === -1 ? '#8bd46e' : '#248ff7',
            },
            {
              offset: 1,
              color: k.indexOf('balance') === -1 ? '#09bcb7' : '#6851f1',
            },
          ]),
          barBorderRadius: 10,
          borderType: k.indexOf('pre') > -1 ? 'dashed' : 'solid',
          // borderColor: k.indexOf('pre') === -1 && '#4F97F2',
          opacity: k.indexOf('pre') > -1 ? '0.2' : '1',
        },
      },
      // itemStyle: {
      //   normal: {
      //     color:
      //       k.indexOf('balance') === -1
      //         ? k.indexOf('pre') === -1
      //           ? '#4F97F2'
      //           : 'rgba(79,151,242,0.50)'
      //         : k.indexOf('pre') === -1
      //           ? '#76AB59'
      //           : 'rgba(118,171,89,0.50)',
      //     borderType: k.indexOf('pre') > -1 ? 'dashed' : 'solid',
      //     borderColor: k.indexOf('balance') === -1 ? '#4F97F2' : '#76AB59',
      //   },
      // },
    })),
  };
}

export function genAgeStatistical(ages) {
  return {
    title: {
      text: '贷款金额性别比例（万元）',
      textStyle: {
        color: '#eee',
        fontSize: 14,
      },
      top: 0,
      left: 'center',
    },
    tooltip: {
      formatter: params => {
        return `
          <p style="text-align:left;font-size:12px;line-height:18px">${params[0].name}</p>
          ${params
            .map(({ color, seriesName, value }) => {
              return value !== '-'
                ? `
                <p style="text-align:left;line-height:18px">
                  <i class="chart-circle" style="${styles}background-color:${color}"></i>
                  ${seriesName}：${value}
                </p>
              `
                : null;
            })
            .join('')}
        `;
      },
    },
    grid: {
      top: '50px',
      left: '20px',
      right: '0',
      bottom: '0',
      containLabel: true,
    },
    xAxis: {
      data: ages.man && ages.man.map(t => `${t.date}后`),
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          color: 'rgba(168, 178, 185, .1)',
        },
      },
    },
    legend: {
      icon: 'rect',
      itemWidth: 14,
      itemHeight: 5,
      itemGap: 13,
      data: ['男性', '女性'],
      right: '4%',
      top: 25,
      textStyle: {
        fontSize: 12,
        color: '#ccc',
      },
    },
    series: Object.keys(ages).map(k => ({
      name: k === 'man' ? '男性' : '女性',
      data: ages[k].map(t => t.value),
      showSymbol: false,
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: k === 'man' ? 'rgba(16,97,204, 0.4)' : 'rgba(205,52,42, 0.5)',
              },
              {
                offset: 0.8,
                color: k === 'man' ? 'rgba(17,235,210, 0)' : 'rgba(235,235,21, 0)',
              },
            ],
            false
          ),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10,
          lineStyle: {
            // 系列级个性化折线样式
            width: 1.5,
          },
        },
      },
      itemStyle: {
        normal: {
          color: k === 'man' ? '#5597e6' : '#77fbe3',
        },
      },
    })),
  };
}

export function genAgeAverage(data) {
  return {
    title: {
      text: '年龄与人均贷款金额（元）',
      textStyle: {
        color: '#eee',
        fontSize: 14,
      },
      top: 0,
      left: 'center',
    },
    grid: {
      top: '50px',
      left: '0',
      right: '0',
      bottom: '0',
      containLabel: true,
    },
    xAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          fontSize: 10,
          color: '#666',
        },
      },
      type: 'category',
      boundaryGap: true,
      data: data.age && data.age.map(t => `${t.date}后`),
    },
    yAxis: {
      inverse: false,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          fontSize: 10,
          color: '#666',
        },
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(168, 178, 185, .1)',
        },
      },
      type: 'value',
    },
    series: [
      {
        name: '人均贷款金额',
        type: 'line',
        // smooth: true, //是否平滑曲线显示
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 6,
        lineStyle: {
          normal: {
            color: '#28ffb3', // 线条颜色
          },
          borderColor: '#f0f',
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#fff',
          },
        },
        itemStyle: {
          normal: {
            color: '#28ffb3',
          },
        },
        tooltip: {
          show: false,
        },
        areaStyle: {
          // 区域填充样式
          normal: {
            // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0,154,120,1)',
                },
                {
                  offset: 1,
                  color: 'rgba(0,0,0, 0)',
                },
              ],
              false
            ),
            shadowColor: 'rgba(53,142,215, 0.9)', // 阴影颜色
            shadowBlur: 20, // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          },
        },
        data: data.average && data.average.map(t => t.value),
      },
      {
        name: '人数',
        type: 'bar',
        barWidth: 20,
        // tooltip: {
        //   show: false
        // },
        // label: {
        //   show: true,
        //   position: 'top',
        //   textStyle: {
        //     color: '#fff',
        //   }
        // },
        itemStyle: {
          normal: {
            color(params) {
              const colorList = [
                '#0ec1ff',
                '#10cdff',
                '#12daff',
                '#15ebff',
                '#17f8ff',
                '#1cfffb',
                '#1dfff1',
              ];
              return colorList[params.dataIndex];
            },
          },
        },
        data: data.age && data.age.map(t => t.value),
      },
    ],
  };
}

export function genLoanProduct(data) {
  const sortArr = data.sort((a, b) => b.loanCount - a.loanCount);
  const remainSum = sortArr.slice(5, sortArr.length).reduce((prev, cur) => cur.loanCount + prev, 0);
  const sum = sortArr.slice(0, 5).reduce((prev, cur) => cur.loanCount + prev, remainSum);
  const newData = [
    ...sortArr.slice(0, 5),
    {
      name: '其它',
      value: remainSum,
    },
  ];
  return {
    title: {
      text: sum,
      subtext: '贷款笔数',
      left: 'center',
      top: '30%',
      padding: [10, 0],
      textStyle: {
        color: '#ffc72b',
        fontSize: 26,
        align: 'center',
      },
      subtextStyle: {
        color: '#fff',
        fontSize: 12,
        align: 'center',
      },
    },
    tooltip: {
      formatter: params => {
        return `
          <p style="text-align:left;line-height:18px">
            <i class="chart-circle" style="${styles}background-color:${params.color}"></i>
            ${params.name}
          </p>
          <p style="text-align:left;line-height:18px">
            数量：${params.data.value}
          </p>
          <p style="text-align:left;line-height:18px">
            占比：${params.percent}%
          </p>
        `;
      },
    },
    legend: {
      bottom: 0,
      textStyle: {
        color: '#fff',
      },
    },
    series: [
      {
        name: '标题',
        type: 'pie',
        center: ['50%', '40%'],
        radius: ['40%', '60%'],
        minAngle: 10,
        // clockwise: false, //饼图的扇区是否是顺时针排布
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'outter',
            formatter(parms) {
              return parms.data.legendname;
            },
          },
        },
        labelLine: {
          normal: {
            length: 5,
            length2: 8,
            smooth: true,
          },
        },
        data: newData.map(k => ({
          name: k.product || k.coopCust || k.name,
          value: k.loanCount || k.value,
        })),
      },
    ],
  };
}

export function genUserConver(data, legends) {
  let sum = 0;
  const newData = Object.keys(data).map(item => {
    const sumItem = data[item].reduce(
      (prev, cur) => (cur.value !== '-' ? cur.value + prev : prev),
      0
    );
    if (item === 'regist') {
      sum = sumItem;
    }
    return {
      name: legends[item].label,
      value: sumItem,
    };
  });
  // 富文本配置
  const rich = {
    yellow: {
      color: '#ffc72b',
      fontSize: 18,
    },
    white: {
      color: '#fff',
      fontSize: 12,
    },
  };
  return {
    calculable: true,
    color: ['#8874a5', '#64609b', '#465192'],
    series: [
      {
        name: '用户转化',
        type: 'funnel',
        left: 'center',
        top: '10%',
        bottom: '5%',
        width: '70%',
        minSize: '50%',
        gap: 14,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: params => {
              let percent = 0;
              newData.forEach(value => {
                if (params.name === value.name) {
                  percent = (value.value / sum).toFixed(2) * 100;
                }
              });
              return `{yellow| ${percent}}{white|%}\n{circle|}{white| ${params.name} }`;
            },
            rich,
          },
        },
        itemStyle: {
          normal: {
            borderColor: '#fff',
            borderWidth: 0,
          },
        },
        data: [
          {
            value: 20,
            name: newData[2].name,
          },
          {
            value: 40,
            name: newData[1].name,
          },
          {
            value: 60,
            name: newData[0].name,
          },
        ],
      },
    ],
  };
}

export function genUserConverLine(data, legends) {
  return {
    color: ['#8874a5', '#64609b', '#465192'],
    tooltip: {
      formatter: params => {
        return `
          <p style="text-align:left;font-size:12px;line-height:18px">${params[0].name}</p>
          ${params
            .map(({ color, seriesName, value }) => {
              return value !== '-'
                ? `
                <p style="text-align:left;line-height:18px">
                  <i class="chart-circle" style="${styles}background-color:${color}"></i>
                  ${seriesName}：${value}
                </p>
              `
                : null;
            })
            .join('')}
        `;
      },
    },
    grid: {
      top: '20px',
      left: '0',
      right: '0',
      bottom: '0',
      containLabel: true,
    },
    xAxis: {
      data: data.regist && data.regist.map(t => `${t.date}月`),
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          color: 'rgba(168, 178, 185, .1)',
        },
      },
    },
    // legend: {
    //   icon: 'rect',
    //   itemWidth: 14,
    //   itemHeight: 5,
    //   itemGap: 13,
    //   data: ['男性', '女性'],
    //   right: '4%',
    //   top: 25,
    //   textStyle: {
    //     fontSize: 12,
    //     color: '#ccc',
    //   },
    // },
    series: Object.keys(data).map(k => ({
      name: legends[k].label,
      data: data[k].map(t => t.value),
      smooth: false,
    })),
  };
}

export function genEquipment(data) {
  const yCategory = [];
  const series = [];
  const sum = data.reduce((prev, cur) => cur.value + prev, 0);
  data.forEach((item, i) => {
    series.push({
      name: '设置分布',
      type: 'pie',
      clockWise: false, // 顺时加载
      hoverAnimation: false, // 鼠标移入变大
      radius: [`${75 - i * 15}%`, `${66 - i * 15}%`],
      center: ['35%', '55%'],
      label: {
        show: false,
      },
      itemStyle: {
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        borderWidth: 5,
      },
      data: [
        {
          value: item.value,
          name: item.name,
        },
        {
          value: (sum * 4) / 3 - item.value,
          name: '',
          itemStyle: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          hoverAnimation: false,
        },
      ],
    });
    series.push({
      name: '',
      type: 'pie',
      silent: true,
      z: 1,
      clockWise: false, // 顺时加载
      hoverAnimation: false, // 鼠标移入变大
      radius: [`${75 - i * 15}%`, `${66 - i * 15}%`],
      center: ['35%', '55%'],
      label: {
        show: false,
      },
      itemStyle: {
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        borderWidth: 5,
      },
      data: [
        {
          value: 7.5,
          itemStyle: {
            color: 'rgba(151, 136, 136, .4)',
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          hoverAnimation: false,
        },
        {
          value: 2.5,
          name: '',
          itemStyle: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          hoverAnimation: false,
        },
      ],
    });
    yCategory.push(`${((item.value / sum) * 100).toFixed(2)}%`);
  });
  return {
    color: ['#FF8700', '#ffc300', '#00e473', '#009DFF'],
    tooltip: {
      formatter: params => {
        return `
          <p style="text-align:left;line-height:18px">
            <i class="chart-circle" style="${styles}background-color:${params.color}"></i>
            ${params.name}
          </p>
          <p style="text-align:left;line-height:18px">
            数量：${params.data.value}
          </p>
          <p style="text-align:left;line-height:18px">
            占比：${params.percent}%
          </p>
        `;
      },
    },
    grid: {
      top: '15%',
      bottom: '53%',
      left: '35%',
      containLabel: false,
    },
    legend: {
      show: true,
      top: '20%',
      left: '65%',
      data: data.map(k => k.name),
      itemWidth: 22,
      itemHeight: 12,
      itemGap: 10,
      formatter: name => {
        const item = data.find(k => k.name === name);
        return `{title| ${name}}\n{value| ${item.value} 人}`;
      },
      textStyle: {
        rich: {
          title: {
            fontSize: 10,
            lineHeight: 10,
            color: '#ccc',
            // color: "rgba(0,0,0,.45)"
          },
          value: {
            fontSize: 14,
            lineHeight: 18,
            color: '#fff',
            // color: "rgba(0,0,0,.85)"
          },
        },
      },
    },
    yAxis: [
      {
        type: 'category',
        inverse: true,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          inside: true,
          textStyle: {
            color: '#eee',
            fontSize: 10,
          },
          show: true,
        },
        data: yCategory,
      },
    ],
    xAxis: [
      {
        show: false,
      },
    ],
    series,
  };
}
// new add 
export function genIndustryRadar(){
  const indicator = [{
    text: '首末班车准点率（辆次）',
    max: 5000,
},
{
    text: '出车率',
    max: 5000,
},
{
    text: '起迄站准点率',
    max: 5000,
},
{
    text: '实际/计划\n运营里程占比',
    max: 5000,
},
{
    text: '实际/计划\n班次执行率',
    max: 5000,
},
];
const dataArr = [
    {
        value: [3200, 3000, 3400, 2000, 3900],
        name:'สิ่งที่เกิดขึ้นจริง',
        itemStyle: {
            normal: {
                lineStyle: {
                    color: '#ff0000',
                },
            },
        },
         areaStyle: {
                normal: { // 单项区域填充样式
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#3272FA',
                        }, {
                            offset: 1,
                            color: '#32AAFA ',
                        }],
                        globalCoord: false,
                    },
                    opacity: 1 ,
                },
            },
    },
     
];
const colorArr = ['#3272FA','#D31145'];
return {
  color: colorArr,
  legend: {
      show: false,
  },
  radar: {
      name: {
          textStyle: {
              color: 'rgba(255,255,255,0.90)',
              fontSize: 10,
              padding: [1, 0],
          },
      },
      nameGap: 6,
      radius:'50%',
      indicator,
      splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
          show: true,
          areaStyle: { // 分隔区域的样式设置。
              color: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
          },
      },
      axisLine: {
          show: true,
          lineStyle: {
              color: '#326AD6',
          },
      },
      splitLine: {
          lineStyle: {
              color: '#326AD6', // 分隔线颜色
              width: 1, // 分隔线线宽
          },
      },
  },
  series: [{
      type: 'radar',
      symbolSize: 0,
      data: dataArr,
  }],
    }
}
export function genBerthPie(){
 const data = 240; // 数值大小
 const max = 500; // 满刻度大小
return {
  // "color": ["#fff", 'rgba(255,255,255,.5)', 'rgba(255,255,255,.2)'],
  tooltip:{
    show:false,
  },
  "series": [{
      "type": "pie",
      "center": ["40%", "50%"],
      "radius": ["49%", "50%"],
      "hoverAnimation": false,

      "data": [{
              "name": "",
              "value": data,
              "itemStyle": {
                  // shadowColor: '#103B84',
                  // shadowBlur: 20,
                 
                  borderWidth: 4,
                  borderColor: {
                      colorStops: [{
                          offset: 0,
                          color: '#7D87FF', // 0% 处的颜色
                      }, {
                          offset: 1,
                          color: '#F8EBCB', // 100% 处的颜色
                      }],
                  },
              },
              "label": {
                  "show": true,
                  "position": "center",
                  "color": "#fff",
                  "fontSize": 24,
                  "fontWeight": "bold",
                  "formatter": function(o) {
                      return data
                  }
              },
              labelLine: {
                  show: false,
                  emphasis: {
                      show: false,
                  },
              },
          },
          // { // 画中间的图标
          //     "name": "",
          //     "value": 0,
          //     "label": {
          //         position: 'inner',
          //         backgroundColor: '#ffff',
          //         width: 0,
          //         height: 0,
          //         borderRadius: 4,
          //         padding:4,
          //         align:'right',
          //     },
          // },
           { // 画剩余的刻度圆环
              "name": "",
              "value": max - data,
              "label": {
                  show: false,
              },
              labelLine: {
                  show: false,
                  emphasis: {
                      show: false,
                  },
              },
              
              "itemStyle": {
                  shadowColor: '#103B84',
                  shadowBlur: 20,
                 
                  borderWidth: 2,
                  borderColor:'#103B84',
                  
              },
          },
      ],
  },
  // 刻度尺
      {
          // name: "白色圈刻度",
          type: "gauge",
          "center": ["40%", "50%"],
          radius: "70%",
          startAngle: 225, // 刻度起始
          endAngle: -134.8, // 刻度结束
          z: 4,
          axisTick: {
              show: true,
               lineStyle: {
                  width: 2,
                  color: '#405594',
              },
          },
          splitLine: {
              length: 2, // 刻度节点线长度
              lineStyle: {
                  width: 2,
                  color: '#405594',
              }, // 刻度节点线
          },
          axisLabel: {
              color: 'rgba(255,255,255,0)',
              fontSize: 12,
          }, // 刻度节点文字颜色
          pointer: {
              show: false,
          },
          axisLine: {
              lineStyle: {
                  opacity: 0,
              },
          },
          detail: {
              show: false,
          },
          data: [{
              value: 0,
              name: "",
          }],
      }],
}
}
export function genDrainBar(){
  return {
    grid: {
        top: '15%',
        right: '10%',
        left: '13%',
        bottom: '15%',
    },
    xAxis: [{
        type: 'category',
        boundaryGap : false,
        data: ['1', '2', '3', '4','5', '6', '7', '8','9', '10', '11', '12'],
        offset:0,
        axisLabel: {
            margin: 2,
            color: '#fff',
            textStyle: {
                fontSize: 10,
            },
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(107,107,107,0.37)',
            },
        },
        axisTick:{
          length:1,
          lineStyle:{
              color:'rgba(255,255,255,0.9)',
          },
      },
    }],
    yAxis: [{
        axisLabel: {
            formatter: '{value}',
            color: '#fff',
            textStyle: {
                fontSize: 10,
            },
        },
        axisLine: {
            show: false,
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(61,107,153,0.16)',
            },
        },
    }],
    series: [{
        type: 'bar',
        data: [40, 80, 20, 10,90, 80, 120, 10,40, 80, 20, 50],
        barWidth: '4px',
        itemStyle: {
            normal: {
                color(){
                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#7541FB', // 0% 处的颜色
                    }, {
                        offset: 1,
                        color:  '#62ADFE',// 100% 处的颜色
                    }], false)
                },
                barBorderRadius: [30, 30, 0, 0],
            },
        },
    },
],
}
}
export function genPassengerLine(){
  return {
    grid: {
      top: '15%',
      right: '10%',
      left: '13%',
      bottom: '15%',
    },
    xAxis: [{
        type: 'category',
        boundaryGap : false,
        data: ['1','2','3','4','5','6'],
        nameLocation:'center',
        axisLabel: {
          margin: 2,
          color: 'rgba(255,255,255,0.9)',
          textStyle: {
              fontSize: 10,
          },
        },
        axisLine: {
            show: false,
            lineStyle: {
                color: "rgba(255,255,255,0.9)",
            },
        },
        axisTick:{
          length:1,
          lineStyle:{
              color:'rgba(255,255,255,0.9)',
          },
      },
    }],
    yAxis: [{
        type: 'value',
        splitNumber: 4,
        splitLine: {
            lineStyle: {
                color: 'rgba(61,107,153,0.16)',
            },
        },
        axisLine: {
            show: false,
            lineStyle: {
                color: "rgba(255,255,255,0.9)",
            },
        },
        axisTick:{
          show:false,
        },
    }],
    series: [{
        name: '',
        type: 'line',
        data: [23,60,20,36,23,85],
        symbol: 'none',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2,
                color: {
                    type: 'linear',

                    colorStops: [{
                        offset: 0,
                        color: '#13AFFF', // 0% 处的颜色
                    },
                    {
                        offset: 0.8,
                        color: '#0989FB', // 100% 处的颜色
                    },{
                        offset: 1,
                        color: '#F803C6', // 100% 处的颜色
                    }],
                    globalCoord: false, // 缺省为 false
                },
            },
        },
        areaStyle: {
          normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(19,175,255,0.3)',
                  },
                  {
                      offset: 1,
                      color: 'rgba(19,175,255,0)',
                  },
              ], false),
              shadowColor: 'rgba(19,175,255, 0.9)',
              shadowBlur: 20,
          },
      },
    }],
}
}
export function genHotlinePie(){
  return {
    tooltip: {
        trigger: 'item',
    },
    series: [{
        type: 'pie',
        center: ['45%', '50%'],
        radius: ['35%', '55%'],
        // clockwise: true,
        // avoidLabelOverlap: true,
        hoverOffset: 0,
        labelLine: {
            normal: {
                length: 10,
                length2: 50,
                lineStyle: {
                    width: 1,
                },
            },
        },
        label: {
            normal: {
                formatter(params) {
                    if (params.name !== '') {
                        if(params.dataIndex === 0){
                          return `{white|${  params.name  }}` + `\n` + `\n` + `{value1|${  params.value  }}`;
                        }else{
                          return `{white|${  params.name  }}` + `\n` + `\n` + `{value2|${  params.value  }}`;
                        }
                        
                    } else {
                        return '';
                    }
                },
                padding: [0, -55, 0, -55],
                rich: {
                    value1: {
                        fontSize: 10,
                        color: 'rgba(230,103,156,1)',
                    },
                    value2: {
                      fontSize: 10,
                      color: 'rgba(14,141,230,1)',
                  },
                    white: {
                        fontSize: 10,
                        color: 'rgba(255,255,255,0.90)',
                    },
                },

            },
        },
        data: [{
            'name': '热线工单办结',
            'value': 900,
            itemStyle: {
                normal: {
                    color: { // 完成的圆环的颜色
                        colorStops: [{
                            offset: 0,
                            color: '#F5C8C4', // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#DF84C0', // 100% 处的颜色
                        }],
                    },
                }, 
            },
        }, {
            'name': '热线工单',
            'value': 1200,
            itemStyle: {
                normal: {
                    color: { // 完成的圆环的颜色
                        colorStops: [{
                            offset: 0,
                            color: '#4196E3', // 0% 处的颜色
                        }, {
                            offset: 0.5,
                            color: '#533FE9', // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#439BE3', // 100% 处的颜色
                        }],
                    },
                }, 
            },
        }],
    }],
}
}