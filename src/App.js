import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { XYChart, Axis, Grid, LineSeries } from "@visx/xychart";

import { posts } from "./queries";

const getTopics = (topics, updateTopics) => {

}

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

  const accessors = {
    xAccessor: (d) => new Date(`${d.x} 2019`),
    yAccessor: (d) => d.y,
  };

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log(formatData(data));

  return (
    <div>
      <XYChart height={300} xScale={{ type: "time" }} yScale={{ type: "linear" }}>
        <Axis orientation="bottom" />
        <Axis orientation="left" />
        <LineSeries dataKey="line_01" data={formatData(data)} {...accessors} />
      </XYChart>
      <ul>
        {
          data.posts.map(post => {
            const date = new Date();
            date.setTime(post.createdAt)
  
            return(<li key={post.id}>{date.toLocaleString()}</li>)
          })
        }
      </ul>
    </div>
  );
}

export default App;
