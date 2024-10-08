const {AuthenticationError, UserInputError} = require('apollo-server')

const Post = require("../../models/Post")
const checkAuth = require("../../graphql/util/check-auth");
//UPDATE THE GOOGLE SPREADSHEET: 9/18/2021, added comment creation and deletion. 45 min
module.exports = {
    Mutation: {
        createComment: async (_, { postId, body}, context) =>{
            const {username} = checkAuth(context)
            if(body.trim() ===''){
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not be empty'
                    }
                })
            }
            const post = await Post.findById(postId);

            if(post){
                post.comments.unshift({
                    body,   
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save()
                return post
            }else {
                throw new UserInputError('Post not found')
            }
        },
        async deleteComment(_, {postId, commentId}, context){
            const {username} = checkAuth(context)

            const post = await Post.findById(postId)

            if(post){
                const commentIndex = post.comments.findIndex(c => c.id === commentId)
                if(post.comments[commentIndex]){
                    if(post.comments[commentIndex].username === username){
                        post.comments.splice(commentIndex, 1)
                        await post.save();
                        return post;
                    }else{
                        throw new AuthenticationError('Action not allowed')
                    }
                }else{
                    throw new Error('Comment not found')
                }
                
            }else{
                throw new UserInputError('Post not found')
            }
        }
    }
}