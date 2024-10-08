import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Headerbar from "../components/Headerbar";
import Post from "../components/Post";
import { LOAD_POSTS_QUERY } from "../util/graphql";
import "../Misc.css";
import {
  useQuery,
  useLazyQuery,
  ApolloClient,
  InMemoryCache,
  makeVar,
} from "@apollo/client";

import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../util/graphql";
//YOU NEED TO CHANGE CREATE POST TO LOAD POST QUERY
function Men() {

  const [page, setPage] = useState(0)
  const limit = 10;

  var posts = [];
  console.log(limit*page);
  const { loading, data, refetch } = useQuery(LOAD_POSTS_QUERY, {
    variables: {
      limit: limit,
      offset: (page * limit)
    },
    fetchPolicy: "network-only", // Used for first execution
    nextFetchPolicy: "cache-first",
  });
  console.log(data);
  if (!loading && data && data.loadPosts) {
    data.loadPosts.forEach((element) => {
      posts.push(element);
    });

    console.log(posts);
    console.log("pressed");
  }
  //----
  return (
    <div>
      <Headerbar />
      <div className="home">
        <div className="posts-holder">
          {loading ? (
            <div className="loader-holder">
              <div className="loader"></div>
            </div>
          ) : (
            posts && posts.map((post) => <Post post={post} />)
          )}
        </div>
      </div>
      <div>
        {!loading ? (
          <button
            className="create-button"
            onClick={() => refetch({ limit: posts.length + limit })}
          >
            Load More
          </button>
        ) : (
          <></>
        )}
      </div>

      <div>
        <button disabled = {!page} onClick={()=>setPage((prev) => prev-1)}>Previous</button>
        <button onClick={()=>setPage((prev) => prev+1)}>Next</button>
      </div>
    </div>
  );
}

export default Men;
