import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { HomeContainer, NoPostsContainer } from './styles';
import messageIcon from '../../img/message.svg';
import deleteIcon from '../../img/delete.svg';

import Card from '../../components/Card';
import PostsList from '../../components/PostsList';
import FAB from '../../components/FAB';
import Modal from '../../components/Modal';
import PostFormBubble from '../../components/PostFormBubble';
import Navbar from '../../components/Navbar';
import IconButton from '../../components/IconButton';
import LoadingModal from '../../components/LoadingModal';

import { AppState } from '../../store';
import { getPosts } from '../../store/posts/actions';

const CloseMessageButton = styled(IconButton)`
  opacity: 0;
`;




function Home() {
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const dispatch = useDispatch();

  const posts = useSelector((state: AppState) => state.posts.items);
  const currentUser = useSelector((state: AppState) => state.user.data);
  const creatingPost = useSelector((state: AppState) => state.posts.create);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const closeMessage = () => setIsMessageOpen(false);
  const openMessage = () => setIsMessageOpen(true);

  const navLinks = [
    { link: '/', title: 'Feed' },
    { link: '/words', title: 'Palavras' }
  ];

  
  return (
    <React.Fragment>
      <Navbar links={navLinks} />
      <HomeContainer>
        <Card>
          {posts.length ? 
            <PostsList posts={posts} /> 
          : 
            <NoPostsContainer>
              Nenhum post
            </NoPostsContainer> 
          }
        </Card>
        
        <FAB 
          icon={messageIcon} 
          text='Enviar mensagem' 
          onClickHandler={openMessage}
          size={1.2} 
          active={!!(currentUser.username)}
        />

        { isMessageOpen ? 
        <Modal 
          children={
            <div style={{ padding: '1rem' }}>
              <CloseMessageButton
                onClickHandler={closeMessage}
                iconPath={deleteIcon}
                text='Close message window.'
              />
              <PostFormBubble onSubmit={(e) => setIsMessageOpen(false)} />
            </div>
          } 
        /> : ''}

        { creatingPost.isFetching ? <LoadingModal text='Criando post...' /> : ''}
      </HomeContainer>
    </React.Fragment>
  );
}

export default Home;
