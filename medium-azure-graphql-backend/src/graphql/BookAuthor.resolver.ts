import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import { AuthorService } from '../AuthorService';
import { AuthorSchema } from './Author.schema';
import { BookSchema } from './Book.schema';

@Service()
@Resolver((of) => BookSchema)
export default class BookAuthorResolver {
    constructor(private readonly authorService: AuthorService) {}

    @FieldResolver((type) => AuthorSchema)
    async author(@Root() book: BookSchema): Promise<AuthorSchema> {
        return this.authorService.getAuthorById(book.authorId);
    }
}
