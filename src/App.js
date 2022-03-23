import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { XYChart, AnimatedAxis, AnimatedGrid, AnimatedLineSeries } from "@visx/xychart";

import { posts } from "./queries";

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

const App = () => {
  const { loading, error, data } = useQuery(posts(1000));
  const [graphData, setGraphData] = useState([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const accessors = {
    xAccessor: (d) => new Date(`${d.x} 2019`),
    yAccessor: (d) => d.y,
  };

  return (
    <div>
      <XYChart height={300} xScale={{ type: "time" }} yScale={{ type: "linear" }}>
        <AnimatedAxis orientation="bottom" />
        <AnimatedAxis orientation="left" />
        <AnimatedGrid columns={false} />
        <AnimatedLineSeries dataKey="line_01" data={formatData(data)} {...accessors} />
      </XYChart>
    </div>
  );
}

export default App;
