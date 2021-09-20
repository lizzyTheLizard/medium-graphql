import DataLoader = require('dataloader');
import { Service } from 'typedi';
import { Book } from './Book';

const books: Book[] = [
    { id: '1', title: 'First', authorId: '1' },
    { id: '2', title: 'Second', authorId: '2' },
];

@Service()
export class BookService {
    private readonly bookByIdDataLoader: DataLoader<string, Book>;
    private readonly booksByAuthorDataLoader: DataLoader<string, Book[]>;

    constructor() {
        this.bookByIdDataLoader = new DataLoader((ids: string[]) => this.getBookByIdBatch(ids), { cache: false });
        this.booksByAuthorDataLoader = new DataLoader((ids: string[]) => this.getBooksByAuthorBatch(ids), {
            cache: false,
        });
    }

    public async getBookById(id: string): Promise<Book> {
        return this.bookByIdDataLoader.load(id);
    }

    private async getBookByIdBatch(ids: string[]): Promise<Book[]> {
        console.log('Load books from DB', ids);
        return books.filter((a) => ids.includes(a.id));
    }

    public async getAllBooks(from: number, to?: number): Promise<Book[]> {
        console.log('Load all books from DB');
        return books.slice(from, to);
    }

    public async getBooksByAuthor(authorId: string): Promise<Book[]> {
        return this.booksByAuthorDataLoader.load(authorId);
    }

    private async getBooksByAuthorBatch(authorIds: string[]): Promise<Book[][]> {
        console.log('Load books for authors from DB', authorIds);
        return authorIds.map((id) => books.filter((b) => b.authorId === id));
    }
}
