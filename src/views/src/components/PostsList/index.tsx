import React from 'react';
import { PostsListContainer } from './styles';
import Post from '../Post';
import IPost from '../../interfaces/Post.interface';

interface PostsListProps {
  posts: IPost[];
}

function PostsList({ posts }: PostsListProps) {
  const postItems = posts.map(post => (
    <Post {...post} key={post.postId} />
  ));

  return (
    <PostsListContainer>
      {posts.length ? postItems : <div>NÃO TEM MAIS NADA</div>}
    </PostsListContainer>
  );
}

export default PostsList;