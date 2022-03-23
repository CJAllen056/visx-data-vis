import { useState } from 'react';
import { XYChart, AnimatedAxis, AnimatedGrid, AnimatedLineSeries } from "@visx/xychart";

const formatData = (data, filter) => {
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
    if (filter === "All" || filter == post.likelyTopics[0].label) {
      let date = new Date();
      date.setTime(post.createdAt);    
      dates[date.getMonth()].y++;
    }
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
    <div>
      <label for="topics-selection">Filter by topic: </label>
      <select id="topics-selection" onChange={e => setGraphData(formatData(data, e.target.value))}>
        <option value="All">Show All</option>
        {data.posts[0].likelyTopics.map(topic => {
          return <option value={topic.label}>{topic.label}</option>
        })}
      </select>
      <XYChart height={300} xScale={{ type: "time" }} yScale={{ type: "linear" }}>
        <AnimatedAxis orientation="bottom" />
        <AnimatedAxis orientation="left" />
        <AnimatedGrid columns={false} />
        <AnimatedLineSeries dataKey="line_01" data={graphData} {...accessors} />
      </XYChart>
    </div>
  );
}

export default Chart;