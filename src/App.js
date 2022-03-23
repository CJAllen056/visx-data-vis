import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import Chart from './chart';

import { posts } from "./queries";
import './app.css';

const App = () => {
  const { loading, error, data } = useQuery(posts(1000));
  const [graphData, setGraphData] = useState([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return <Chart data={data} />;
}

export default App;
