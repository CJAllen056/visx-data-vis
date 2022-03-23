import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { XYChart, Axis, Grid, LineSeries } from "@visx/xychart";

import { posts } from "./queries";

const getTopics = (topics, updateTopics) => {

}

const formatData = (data) => {
  const dates = []

  data.posts.forEach(post => {
    // const topic = post.likelyTopics[0].label;
    let date = new Date();
    date.setTime(post.createdAt);
    date = date.toLocaleDateString();

    const index = dates.findIndex(d => d.x === date);

    if (index >= 0) {
      dates[index].y++;
    } else {
      dates.push({ x: date, y: 1 });
    }

    // if (topics[topic]) {
    //   topics[topic]++;
    // } else {
    //   topics[topic] = 1;
    // }
  });

  return dates.sort((a, b) => new Date(b.x) - new Date(a.x));
}

const App = () => {
  const { loading, error, data } = useQuery(posts(5000));
  const [graphData, setGraphData] = useState([]);
  // const topics = {};

  const accessors = {
    xAccessor: (d) => new Date(`${d.x}`),
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
