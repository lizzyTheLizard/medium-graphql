import { Service } from 'typedi';
import { Book } from '../domain/book/Book';

const books: Book[] = [
    { id: '1', title: 'First', authorId: '1' },
    { id: '2', title: 'Second', authorId: '2' },
];

@Service()
export class BookRepository {
    public async getBookById(id: string): Promise<Book> {
        console.log('Load book from DB', id);
        return books.filter((a) => a.id === id)[0];
    }

    public async getBookByIds(ids: string[]): Promise<Book[]> {
        console.log('Load books from DB', ids);
        return books.filter((a) => ids.includes(a.id));
    }

    public async getAllBooks(from: number, to?: number): Promise<Book[]> {
        console.log('Load all books from DB');
        return books.slice(from, to);
    }

    public async getBooksByAuthors(authorIds: string[]): Promise<Book[][]> {
        console.log('Load books for authors from DB', authorIds);
        return authorIds.map((id) => books.filter((b) => b.authorId === id));
    }
}
