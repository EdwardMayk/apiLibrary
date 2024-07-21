// book-update-queue.ts
import Bull from 'bull';
import { Author } from '../../authors/models/author.model';
import { Book } from '../../books/models/book.model';

const bookUpdateQueue = new Bull('bookUpdateQueue', {
  redis: {
    host: 'localhost', 
    port: 6379,
  },
});

bookUpdateQueue.process(async (job) => {
  const { authorId } = job.data;

  try {
      if (authorId) {
          const author = await Author.findByPk(authorId);
          if (author) {
              const bookCount = await Book.count({ where: { authorId } });
              author.bookCount = bookCount;
              await author.save();
          }
      }
  } catch (error) {
      console.error('Error processing job:', error);
  }
});

export { bookUpdateQueue };