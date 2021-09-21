import DataLoader = require('dataloader');
import { Arg, Args, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { BookRepository } from '../persistence/BookRepository';
import { BookSchema } from './Book.schema';
import { PaginationAguments } from './PaginationArguments';

@Service()
@Resolver(BookSchema)
export default class BookResolver {
    private readonly dataLoader: DataLoader<string, BookSchema>;

    constructor(private readonly bookRepository: BookRepository) {
        this.dataLoader = new DataLoader((ids: string[]) => this.batchLoader(ids), { cache: false });
    }

    @Query((returns) => BookSchema)
    public async book(@Arg('id') id: string): Promise<BookSchema> {
        return this.dataLoader.load(id);
    }

    private async batchLoader(ids: string[]): Promise<BookSchema[]> {
        const authors = await this.bookRepository.getBookByIds(ids);
        return authors.filter((a) => ids.includes(a.id)).map((a) => new BookSchema(a));
    }

    @Query((returns) => [BookSchema])
    public async books(@Args() paginationAguments: PaginationAguments): Promise<BookSchema[]> {
        const to = paginationAguments.take ? paginationAguments.skip + paginationAguments.take : undefined;
        const books = await this.bookRepository.getAllBooks(paginationAguments.skip, to);
        return books.map((a) => new BookSchema(a));
    }
}
