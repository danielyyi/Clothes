import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import Headerbar from "../components/Headerbar";
import Navbar from "../components/Navbar";
import "./SinglePost.css";
function SinglePost() {
  const { postId } = useParams();
  //const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(postId);
  //if it works it works...
  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  let getPost;
  if (data) {
    getPost = data.getPost;
  }

  function deletePostCallback() {
    navigate("/");
    //props.history.push("/");
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = (
      <div className="loader-holder">
        <div className="loader"></div>
      </div>
    );
  } else {
    const {
      id,
      caption,
      image,
      username,
      title, 
      category, 
      sex,
      createdAt,
      price,
      productLink,
      brandLink,
    } = getPost;
    console.log(caption);

    postMarkup = (
      <>
      <Headerbar/>
      <button onClick={() => navigate(-1)}>Go back</button>
      <div class="container">
        <div class="item-image">
          <img src={image} alt={"post"} />
        </div>
        <div class="item-info">
          <h2>{title}</h2>
          <h3>${price}</h3>
          <div>{caption}</div>
          <div>{username}</div>        
          <a target="_blank" rel="noopener noreferrer" href={`${productLink}`}><button>Visit Product</button></a>
          <div> Posted on         {moment(createdAt).format("MMMM Do, YYYY")} (
        {moment(createdAt).fromNow()})</div>
        <div>{category}</div>
        <div>{sex}</div>

        {user && (user.username === username || user.username == "Admin") && (
          <DeleteButton postId={id} callback={deletePostCallback} />
        )}
        </div>
        </div>
        </>
      
    );
  }

  return postMarkup;
}
const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      image
      username
      title
      caption
      category
      sex
      createdAt
      price
      productLink
      username
      
    }
  }
`;
export default SinglePost;
