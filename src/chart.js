import { useState } from 'react';
import { XYChart, AnimatedAxis, AnimatedGrid, AnimatedLineSeries, Tooltip } from "@visx/xychart";

import ChartFilter from './filter';

const formatData = (data, filters) => {
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
    const topic = post.likelyTopics[0].label;
    const author = `${post.author.firstName} ${post.author.lastName}`

    if ((filters.topic === "All" || filters.topic === topic)
      && (filters.author === "All" || filters.author === author)) {
      console.log(topic, author);
      let date = new Date();
      date.setTime(post.createdAt);    
      dates[date.getMonth()].y++;
    }
  });

  return dates;
}

const getTopics = data => {
  return [... new Set(Array.from(data, d => d.likelyTopics[0].label))];
}

const getAuthors = data => {
  return [... new Set(Array.from(data, d => `${d.author.firstName} ${d.author.lastName}`))]
}

const Chart = props => {
  const { data } = props;
  const [topicFilter, setTopicFilter] = useState("All");
  const [authorFilter, setAuthorFilter] = useState("All");
  const [graphData, setGraphData] = useState(formatData(data, { topic: topicFilter, author: authorFilter }));

  const accessors = {
    xAccessor: (d) => new Date(`${d.x} 2019`),
    yAccessor: (d) => d.y,
  };

  const applyFilter = (setFilterFunc, value) => {
    setFilterFunc(value);
    setGraphData(formatData(data, { topic: topicFilter, author: authorFilter }));
  }

  return (
    <div>
      <div className="chart-filters">
        <ChartFilter
          filterLabel="topic"
          options={getTopics(data.posts)}
          handleChange={e => applyFilter(setTopicFilter, e.target.value)}
        />
        <ChartFilter
          filterLabel="author"
          options={getAuthors(data.posts)}
          handleChange={e => applyFilter(setAuthorFilter, e.target.value)}
        />
      </div>
      <XYChart height={300} xScale={{ type: "time" }} yScale={{ type: "linear" }}>
        <AnimatedAxis orientation="bottom" />
        <AnimatedAxis orientation="left" />
        <AnimatedGrid columns={false} />
        <AnimatedLineSeries dataKey="line_01" data={graphData} {...accessors} />
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          renderTooltip={({ tooltipData }) => {
            const { datum } = tooltipData.nearestDatum;            

            return <div>{`${datum.x}: ${datum.y} posts`}</div>;
          }}
        />
      </XYChart>
    </div>
  );
}

export default Chart;