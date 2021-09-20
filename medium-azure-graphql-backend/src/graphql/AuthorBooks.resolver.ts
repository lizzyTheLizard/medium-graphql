import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import { BookService } from '../BookService';
import { AuthorSchema } from './Author.schema';
import { BookSchema } from './Book.schema';

@Service()
@Resolver((of) => AuthorSchema)
export class AuthorBooksResolver {
    constructor(private readonly bookService: BookService) {}

    @FieldResolver((type) => BookSchema)
    async books(@Root() author: AuthorSchema): Promise<BookSchema[]> {
        return this.bookService.getBooksByAuthor(author.id);
    }
}
