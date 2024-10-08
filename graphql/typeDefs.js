const { gql } = require("apollo-server");
const {model, Schema} = require('mongoose')
const { ObjectId, Decimal128, Array } = require('mongodb')
//type definitions (one for each 'type' and then include any use cases for each inside each type definition)
module.exports = gql`
  type Tag {
    color: String
    name: String
  }

  type User {
    id: ID!
    token: String!
    username: String!
    email: String!
    bio: String
    brandLink: String!
    createdAt: String!
    pfp: String!
  }
  type Post {
    id: ID!
    username: String!
    title: String!
    caption: String!
    price: Float!
    image: String!
    productLink: String!
    createdAt: String!
    sex: String!
    tags: [Tag]
    category: String!
    user: ID!
  }

  type Auto {
    id: ID!
    counter: Int!
    post1: ID!
    post2: ID!
    post3: ID!
    post4: ID!
  }

  type Query {
    getPosts: [Post]
    getUsers: [User]
    getRandomUser: [User]
    loadUsers(limit: Int!, offset: Int!): [User]
    getPostsByUser(userId: ID!, limit: Int!): [Post]
    getPost(postId: ID!): Post
    getUser(userId: ID!): User
    getUserByName(username: String!): User
    searchUser(username: String!): User
    loadPosts(limit: Int!, offset: Int!, category: String, sex: String, price: String, tags: String): [Post]
    loadBySex(limit: Int!, sex: String!): [Post]
    loadByCategory(limit: Int!, category: String!): [Post]
    getDailyPosts(post1: ID!, post2:ID!, post3:ID!, post4: ID!) : [Post]
    getAuto(counter: Int!): [Post]
    countPosts(userId: ID!): Int!
    priceFilter(min: Int!, max: Int!): [Post]
    filterTags(tags: [String]!): [Post]
    getTags: [Tag]
    getTag(name: String!): Tag
  }
  input RegisterInput {
    username: String! 
    password: String!
    pfp: String!
    confirmPassword: String!
    bio: String!
    brandLink: String!
    email: String!
  }
  input TagInput{
    color: String
    name: String
  }
  type Mutation {
    editProfile(bio: String, email: String, pfp: String, brandLink: String, username: String): User!
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(
      caption: String!
      image: String!
      price: Float!
      title: String!
      productLink: String!
      sex: String!
      tags: [TagInput]
      category: String!
    ): Post!
    deletePost(postId: ID!): String!
    createAuto(counter:Int!, post1: ID!, post2:ID!, post3:ID!, post4:ID!) : Auto
    addTag(tag: TagInput!): Tag
  }
`;
