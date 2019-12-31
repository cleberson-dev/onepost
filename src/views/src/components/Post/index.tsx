import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeContext } from 'styled-components';
import formatDistance from 'date-fns/formatDistance';
import ptBR from 'date-fns/locale/pt-BR';
import ReactLoading from 'react-loading';
import { PostContainer, PostContent, InfosContainer, PostUsernameInfo, PostLikesInfoContainer, PostLikesInfoIcon } from './styles';
import PostInfo from '../PostInfo';
import PostBottom, { PostBottomDetail } from '../PostBottom';
import IPost from '../../interfaces/Post.interface';
import { likePost, removePost } from '../../store/posts/actions';
import { AppState } from '../../store/';

import SVGIcon from '../SVGIcon';
import favoriteOutline from '../../img/favorite-outline.svg';
import favoriteRound from '../../img/favorite-round.svg';
import accessTime from '../../img/access-time.svg';
import remove from '../../img/remove.svg';

interface PostLikesInfoProps {
  likes: number | string;
  isLiked?: boolean;
  onClickHandler?: React.MouseEventHandler;
}

const PostLikesInfo = ({ likes, isLiked = false, onClickHandler }: PostLikesInfoProps) => {
  const themeContext = useContext(ThemeContext);

  const icon = isLiked ? favoriteRound : favoriteOutline;
  const color = isLiked ? themeContext.colors.primary : '#9C9C9C';

  return (
    <PostLikesInfoContainer>
      <PostLikesInfoIcon onClick={onClickHandler}>
        <SVGIcon src={icon} color={color} />
      </PostLikesInfoIcon>
      {likes}
    </PostLikesInfoContainer>
  );
}

const isAllowedToRemove = (currentUser: string | null, publisher: string) => (currentUser && currentUser === publisher);

interface IPost2 extends IPost { removeStatus?: boolean };

const Post = ({ postId, content, publisher, likes, pubDate, removeStatus = false }: IPost2) => {
  const dispatch = useDispatch();
  const formattedDate = `há ${formatDistance(pubDate, new Date(), { locale: ptBR })}`;

  const currentUser = useSelector((state: AppState) => state.user.data);

  return (
    <PostContainer>
      <PostContent>{content}</PostContent>
      <PostBottom>
        <PostBottomDetail icon={accessTime} text={formattedDate} />
        { isAllowedToRemove(currentUser.username, publisher) ? <PostBottomDetail 
          icon={remove} 
          text='Remover' 
          color='#FC8484' 
          onClickHandler={(e) => dispatch(removePost(postId))} 
        /> : ''}
        
      </PostBottom>
      <InfosContainer>
        <PostInfo 
          label='Usuário' 
          component={<PostUsernameInfo children={publisher} />}
          align='left'
        />
        <PostInfo 
          label='Curtidas' 
          component={
            <PostLikesInfo 
              likes={likes.length} 
              isLiked={likes.some((likeUser) => currentUser.username === likeUser)} 
              onClickHandler={(e) => dispatch(likePost(postId))}
            />
          }
          align='right'
        />
      </InfosContainer>
      { removeStatus ? <div style={{ 
        position: 'absolute', 
        top: 0, left: 0,
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)' 
      }}>
        <ReactLoading type='spin' />
      </div> : ''}
    </PostContainer>
  );
}

export default Post;
