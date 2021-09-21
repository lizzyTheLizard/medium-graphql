import DataLoader = require('dataloader');
import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import { BookRepository } from '../persistence/BookRepository';
import { AuthorSchema } from './Author.schema';
import { BookSchema } from './Book.schema';

@Service()
@Resolver((of) => AuthorSchema)
export class AuthorBooksResolver {
    private readonly dataLoader: DataLoader<AuthorSchema, BookSchema[]>;

    constructor(private readonly bookRepository: BookRepository) {
        this.dataLoader = new DataLoader((authors: AuthorSchema[]) => this.batchLoader(authors), { cache: false });
    }

    @FieldResolver((type) => BookSchema)
    async books(@Root() author: AuthorSchema): Promise<BookSchema[]> {
        return this.dataLoader.load(author);
    }

    private async batchLoader(authors: AuthorSchema[]): Promise<BookSchema[][]> {
        const authorIds = authors.map((a) => a.id);
        const books = await this.bookRepository.getBooksByAuthors(authorIds);
        return books.map((books2) => books2.map((book) => new BookSchema(book)));
    }
}
