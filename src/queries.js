import { gql } from "@apollo/client";

const posts = count => gql`{
  posts: allPosts(count: ${count}) {
  	id
  	title
  	createdAt
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


export { posts }