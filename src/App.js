import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { XYChart, Axis, Grid, LineSeries } from "@visx/xychart";

import { posts } from "./queries";

const getTopics = (topics, updateTopics) => {

}

const App = () => {
  const { loading, error, data } = useQuery(posts(5000));
  const { graphData, updateGraphData } = useState([]);
  // const topics = {};
  const times = {};

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  data.posts.forEach(post => {
    // const topic = post.likelyTopics[0].label;
    let time = new Date();
    time.setTime(post.createdAt);
    time = time.toLocaleDateString();

    if (times[time]) {
      times[time]++;
    } else {
      times[time] = 1;
    }

    // if (topics[topic]) {
    //   topics[topic]++;
    // } else {
    //   topics[topic] = 1;
    // }
  });

  console.log(times);

  return (
    <div>
      <XYChart height={300} xScale={{ type: "time" }} yScale={{ type: "linear" }}>
        <Axis orientation="bottom" />
        <Axis orientation="left" />
        {/*<LineSeries data={graphData} />*/}
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
