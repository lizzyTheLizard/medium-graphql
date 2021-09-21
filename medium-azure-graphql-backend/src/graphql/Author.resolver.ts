import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { AuthorSchema } from './Author.schema';
import { NewAuthorInput } from './NewAuthorInput';
import { AuthorCreator } from '../domain/author/AuthorCreator';
import DataLoader = require('dataloader');
import { PaginationAguments } from './PaginationArguments';
import { AuthorRepository } from '../persistence/AuthorRepository';

@Service()
@Resolver(AuthorSchema)
export class AuthorResolver {
    private readonly dataLoader: DataLoader<string, AuthorSchema>;

    constructor(private readonly authorRepository: AuthorRepository, private readonly authorCreator: AuthorCreator) {
        this.dataLoader = new DataLoader((ids: string[]) => this.batchLoader(ids), { cache: false });
    }

    @Query((returns) => AuthorSchema)
    async author(@Arg('id') id: string): Promise<AuthorSchema> {
        return this.dataLoader.load(id);
    }

    private async batchLoader(ids: string[]): Promise<AuthorSchema[]> {
        const authors = await this.authorRepository.getAuthorByIds(ids);
        return authors.filter((a) => ids.includes(a.id));
    }

    @Query((returns) => [AuthorSchema])
    public async authors(@Args() paginationAguments: PaginationAguments): Promise<AuthorSchema[]> {
        const to = paginationAguments.take ? paginationAguments.skip + paginationAguments.take : undefined;
        const authors = await this.authorRepository.getAllAuthors(paginationAguments.skip, to);
        return authors.map((author) => new AuthorSchema(author));
    }

    @Mutation((returns) => AuthorSchema)
    public async addAuthor(@Args() newAuthor: NewAuthorInput): Promise<AuthorSchema> {
        const author = await this.authorCreator.createAuthor(newAuthor);
        return new AuthorSchema(author);
    }
}
