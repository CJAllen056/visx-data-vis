import { gql, useQuery } from "@apollo/client";

import { posts } from "./queries";

const App = () => {
  const { loading, error, data } = useQuery(posts(1000));

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul>
      {
        data.posts.map(post => {
          const date = new Date();
          date.setTime(post.createdAt)

          return(<li key={post.id}>{date.toLocaleString()}</li>)
        })
      }
    </ul>
  );
}

export default App;
