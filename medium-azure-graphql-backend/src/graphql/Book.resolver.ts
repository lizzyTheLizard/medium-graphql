import { Arg, Args, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { Book } from '../Book';
import { BookService } from '../BookService';
import { BookSchema } from './Book.schema';
import { PaginationAguments } from './PaginationArguments';

@Service()
@Resolver(BookSchema)
export default class BookResolver {
    constructor(private readonly bookService: BookService) {}

    @Query((returns) => BookSchema)
    public async book(@Arg('id') id: string): Promise<BookSchema> {
        const author = await this.bookService.getBookById(id);
        return this.convert(author);
    }

    @Query((returns) => [BookSchema])
    public async books(@Args() paginationAguments: PaginationAguments): Promise<BookSchema[]> {
        const to = paginationAguments.take ? paginationAguments.skip + paginationAguments.take : undefined;
        const books = await this.bookService.getAllBooks(paginationAguments.skip, to);
        return books.map((book) => this.convert(book));
    }

    convert(book: Book): BookSchema {
        return {
            id: book.id,
            title: book.title,
            authorId: book.authorId,
        };
    }
}
