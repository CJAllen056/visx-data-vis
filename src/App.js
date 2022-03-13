import { request } from 'graphql-request';

const query = `{
  posts: allPosts(count: 100) {
    id
    title
    author {
      id
      firstName
      lastName
      email
      avatar
    }
    likelyTopics {
      label
      likelihood
    }
  }
}`;

const App = () => {
  request('https://fakerql.nplan.io/graphql', query).then(data => console.log(data));

  return (
    <div>test</div>
  );
}

export default App;
