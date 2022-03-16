import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { XYChart, Axis, Grid, LineSeries } from "@visx/xychart";

import { posts } from "./queries";

const getTopics = (topics, updateTopics) => {

}

const App = () => {
  const { loading, error, data } = useQuery(posts(1000));
  const { graphData, updateData } = useState({});
  const topics = []

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  data.posts.forEach(d => {
    const topic = d.likelyTopics[0].label;

    if (!topics[topic]) {
      topics[topic] = 1;
    } else {
      topics[topic]++;
    }
  });

  console.log(topics);

  return (
    <div>
      <XYChart height={300} xScale={{ type: "time" }} yScale={{ type: "linear" }}>
        <Axis orientation="bottom" />
        <Axis orientation="left" />
        {/*<LineSeries data={} />*/}
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
