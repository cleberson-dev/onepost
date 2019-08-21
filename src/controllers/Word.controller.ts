import voca from 'voca';
import { Schema } from 'mongoose';
import Word from '../models/Word.model';
import { PostModel } from '../models/Post.model';
import ClientError, { ClientErrors } from '../errors/ClientError';

async function addPostInAWordDocument(
  postId: Schema.Types.ObjectId,
  wordName: string
): Promise<void> {
  const wordDocument = await Word.findOne({ word: wordName });

  if (!wordDocument) {
    // Instancie um novo documento com a palavra
    let newWordDocument = new Word({ word: wordName, posts: [postId] });
    try {
      newWordDocument = await newWordDocument.save();
      console.log(`New document (${wordName}) created and saved:`);
    } catch (err) {
      console.log(`Document (${wordName}) not created`);
    }
  } else {
    // Adicione o ID do post no documento
    try {
      await wordDocument.update({ $push: { posts: postId } });
      console.log(`Document (${wordName}) updated and saved.`);
    } catch (err) {
      console.log(`Document (${wordName}) not updated`);
    };
  }
}

async function removePostReferenceOnAWord(
  postId: string,
  wordName: string
): Promise<void> {
  const wordDocument = await Word.findOne({ word: wordName });

  if (!wordDocument) return;

  // Remove o documento quando houver somente um post referenciado.
  if (wordDocument.posts.length === 1) {
    await wordDocument.remove();
    return;
  }

  await wordDocument.update({ $pull: { posts: postId } });
};

async function addPostReferences(post: PostModel): Promise<{ ok: boolean }> {
  // As palavras devem ser todas convertidas a um formato igual para que não haja duplicatas.
  let words: string[] = voca.words(post.content).map((word) => word.toLowerCase());
  words = words.filter((word, index): boolean => !words.includes(word, index + 1));

  for (const word of words) {
    await addPostInAWordDocument(post._id, word);
  }

  return { ok: true };
};

async function removePostReferences(
  post: PostModel
): Promise<void> {
  // As palavras devem ser todas convertidas a um formato igual para que não haja duplicatas.
  let words: string[] = voca.words(post.content).map((word) => word.toLowerCase());
  words = words.filter((word, index): boolean => !words.includes(word, index + 1));

  for (const word of words) {
    await removePostReferenceOnAWord(post._id, word);
  }
};

function getPostIdsByWord(word: string): Promise<{ word: string, posts: Schema.Types.ObjectId[]}> {
  return Word.findOne({ word })
    .then((wordDocument): { word: string, posts: Schema.Types.ObjectId[] } => {
      if (!wordDocument) throw new ClientError(ClientErrors.NotFound, 'Palavra não encontrada.')
      return {
        word: wordDocument.word,
        posts: wordDocument.posts
      }
    });
}

// As 10 palavras que são mais incluídas nos posts.
async function getTopTenWords(): Promise<object> {
  const words = await Word.find();
  return words
    .map(word => ({
      word: word.word,
      count: word.posts.length
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

export default {
  addPostReferences,
  removePostReferences,
  getPostIdsByWord,
  getTopTenWords
};
