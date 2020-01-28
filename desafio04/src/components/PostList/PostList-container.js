import React, { Component } from 'react';
import './PostList.css';

import Post from './Post/';

import perfilPhotoDemo from '../../assets/profile-avatar.png';

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: 'Julio TETAAAAA',
          // avatar: 'http://url-da-imagem.com/imagem.jpg',
          avatar: perfilPhotoDemo,
        },
        date: '05 Jun 2019',
        content: 'Pessoal, alguém sabe se a Rocketseat está contratando?',
        comments: [
          {
            id: 1,
            author: {
              name: 'Diego Fernandes',
              // avatar: 'http://url-da-imagem.com/imagem.jpg',
              avatar: perfilPhotoDemo,
            },
            content: 'Conteúdo do comentário',
          },
          {
            id: 2,
            author: {
              name: 'Diego Fernandes',
              // avatar: 'http://url-da-imagem.com/imagem.jpg',
              avatar: perfilPhotoDemo,
            },
            content:
              'Lorem ekjfef iuufwieufi wienfiw neween iwen winfiwn wiwneffnweinfwe winfiwen iunweifnwe inwfeien winwneniwen winiewniwni iwneirnweniwe',
          },
          {
            id: 3,
            author: {
              name: 'Diego Fernandes',
              // avatar: 'http://url-da-imagem.com/imagem.jpg',
              avatar: perfilPhotoDemo,
            },
            content: 'Conteúdo do comentário',
          },
        ],
      },
      {
        id: 2,
        author: {
          name: 'Julio Alcantara',
          // avatar: 'http://url-da-imagem.com/imagem.jpg',
          avatar: perfilPhotoDemo,
        },
        date: '04 Jun 2019',
        content: 'FFFFUUUUUUUUUUU',
        comments: [
          {
            id: 1,
            author: {
              name: 'Diego Fernandes',
              // avatar: 'http://url-da-imagem.com/imagem.jpg',
              avatar: perfilPhotoDemo,
            },
            content: 'Conteúdo do comentário',
          },
        ],
      },
    ],
  };

  render() {
    return (
      <ul>
        {this.state.posts.map(post => (
          <Post key={post.id} data={post} />
        ))}
      </ul>
    );
  }
}

export default PostList;
