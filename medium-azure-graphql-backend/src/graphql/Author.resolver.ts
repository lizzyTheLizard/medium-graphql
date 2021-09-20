import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { Author } from '../Author';
import { AuthorService } from '../AuthorService';
import { AuthorSchema } from './Author.schema';
import { NewAuthorInput } from './NewAuthorInput';
import { PaginationAguments } from './PaginationArguments';

@Service()
@Resolver(AuthorSchema)
export class AuthorResolver {
    constructor(private readonly authorService: AuthorService) {}

    @Query((returns) => AuthorSchema)
    async author(@Arg('id') id: string): Promise<AuthorSchema> {
        const author = await this.authorService.getAuthorById(id);
        return new AuthorSchema(author);
    }

    @Query((returns) => [AuthorSchema])
    public async authors(@Args() paginationAguments: PaginationAguments): Promise<AuthorSchema[]> {
        const to = paginationAguments.take ? paginationAguments.skip + paginationAguments.take : undefined;
        const authors = await this.authorService.getAllAuthors(paginationAguments.skip, to);
        return authors.map((author) => new AuthorSchema(author));
    }
    
    @Mutation(returns => AuthorSchema)
    public async addAuthor(@Arg("newAuthor") newAuthor: NewAuthorInput): Promise<AuthorSchema> {
      const author = await this.authorService.createAuthor(newAuthor);
      return new AuthorSchema(author);
    }
}