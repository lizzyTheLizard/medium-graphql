import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import { AuthorRepository } from '../persistence/AuthorRepository';
import { AuthorSchema } from './Author.schema';
import { BookSchema } from './Book.schema';

@Service()
@Resolver((of) => BookSchema)
export default class BookAuthorResolver {
    constructor(private readonly authorRepository: AuthorRepository) {}

    @FieldResolver((type) => AuthorSchema)
    async author(@Root() book: BookSchema): Promise<AuthorSchema> {
        return this.authorRepository.getAuthorById(book.authorId);
    }
}
