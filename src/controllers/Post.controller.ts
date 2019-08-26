import differenceInDays from 'date-fns/differenceInDays';
import { Schema } from 'mongoose';
import Post, { PostModel } from '../models/Post.model';
import ClientError, { ClientErrors } from '../errors/ClientError';
import ValidationError, { ValidationErrors } from '../errors/ValidationError';

export function createPost(
  content: string,
  publisher: { username: string, lastPost: Date | null }
): Promise<PostModel> {
  const newPost = new Post({ content, publisher: publisher.username });

  // Os posts de um usuário devem ser publicados em um intervalo maior de 1 dia.
  if (publisher.lastPost) {
    if (differenceInDays(publisher.lastPost, publisher.lastPost) === 0) {
      throw new ClientError(
        ClientErrors.AlreadyPosted,
        'Você tem um post de menos de 24hrs atrás. Tente novamente mais tarde.'
      );
    }
  }

  return newPost.save().then((post): PostModel => post);
};

export function deletePost(postId: string, username: string): Promise<any> {
  return Post.findById(postId)
    .then((post): Promise<PostModel> => {
      if (!post) throw new ClientError(ClientErrors.NotFound, 'Post não encontrado.');

      // O username é oriundo do token gerado e decodificado pelo servidor.
      if (username !== post.publisher) {
        throw new ClientError(
          ClientErrors.NotThePostOwner,
          'Você não está autorizado a remover esse post. Ele não pertence a você.'
        );
      }

      return post.remove();
    });
};

export function likePost(postId: string, username: string): Promise<any> {
  return Post.findById(postId)
    .then((post): any => {
      if (!post) throw new ClientError(ClientErrors.NotFound, 'Post não encontrado.');

      /*
        O username (gerado por token) será removido ou adicionado
        dependente da sua existência na lista de curtidas do post.
      */
      const { likes } = post;
      if (likes.includes(username)) {
        return post.update({ $pull: { likes: username } });
      }

      return post.update({ $push: { likes: username } });
    });
};

export function getPostsByUser(username: string): Promise<PostModel[]> {
  return Post.find({ publisher: username }).then((posts): PostModel[] => {
    return posts;
  });
};

export function getPosts(ammount: number, startPosition: number): Promise<PostModel[]> {
  const maxAmmount = 15;
  if (ammount > maxAmmount) {
    throw new ValidationError(
      ValidationErrors.OutOfRange,
      `Excedeu a quantidade máxima de posts (máx: ${maxAmmount})`
    );
  }

  return Post
    .find()
    .sort({ pubDate: -1 })
    .limit(ammount)
    .skip(startPosition)
    .then((posts): PostModel[] => posts.map((post): any => ({
      id: post._id,
      content: post.content,
      publisher: post.publisher,
      pubDate: post.pubDate,
      likes: post.likes.length // ao invés das referências, será um contador de curtidas
    })));
}

export function getPost(postId: Schema.Types.ObjectId): Promise<PostModel> {
  return Post.findById(postId)
    .then((post): PostModel => {
      if (!post) throw new ClientError(ClientErrors.NotFound, 'Post não encontrado');

      return post;
    });
}

export default {
  createPost,
  deletePost,
  likePost,
  getPosts,
  getPostsByUser,
  getPost
};
