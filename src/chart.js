import { useState } from 'react';
import { XYChart, AnimatedAxis, AnimatedGrid, AnimatedLineSeries } from "@visx/xychart";

const formatData = (data) => {
  const dates = [
    { x: 'January', y: 0},
    { x: 'February', y: 0},
    { x: 'March', y: 0},
    { x: 'April', y: 0},
    { x: 'May', y: 0},
    { x: 'June', y: 0},
    { x: 'July', y: 0},
    { x: 'August', y: 0},
    { x: 'September', y: 0},
    { x: 'October', y: 0},
    { x: 'November', y: 0},
    { x: 'December', y: 0},
  ]

  data.posts.forEach(post => {
    let date = new Date();
    date.setTime(post.createdAt);    
    dates[date.getMonth()].y++
  });

  return dates;
}

const Chart = props => {
  const { data } = props;
  const [graphData, setGraphData] = useState(formatData(data));

  const accessors = {
    xAccessor: (d) => new Date(`${d.x} 2019`),
    yAccessor: (d) => d.y,
  };

  return (
    <XYChart height={300} xScale={{ type: "time" }} yScale={{ type: "linear" }}>
      <AnimatedAxis orientation="bottom" />
      <AnimatedAxis orientation="left" />
      <AnimatedGrid columns={false} />
      <AnimatedLineSeries dataKey="line_01" data={graphData} {...accessors} />
    </XYChart>
  );
}

export default Chart;