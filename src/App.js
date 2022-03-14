import { gql, useQuery } from "@apollo/client";

import { posts } from "./queries";

const App = () => {
  const { loading, error, data } = useQuery(posts(500));

  console.log(data);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul>
      {
        data.posts.map((post) => {
          return(<li>{Date(post.createdAt)}</li>)
        })
      }
    </ul>
  );
}

export default App;
