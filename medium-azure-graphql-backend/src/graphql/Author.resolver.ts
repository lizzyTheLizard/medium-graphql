import { Arg, Args, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { Author } from '../Author';
import { AuthorService } from '../AuthorService';
import { AuthorSchema } from './Author.schema';
import { PaginationAguments } from './PaginationArguments';

@Service()
@Resolver(AuthorSchema)
export class AuthorResolver {
    constructor(private readonly authorService: AuthorService) {}

    @Query((returns) => AuthorSchema)
    async author(@Arg('id') id: string): Promise<AuthorSchema> {
        const author = await this.authorService.getAuthorById(id);
        return this.convert(author);
    }

    @Query((returns) => [AuthorSchema])
    public async authors(@Args() paginationAguments: PaginationAguments): Promise<AuthorSchema[]> {
        const to = paginationAguments.take ? paginationAguments.skip + paginationAguments.take : undefined;
        const authors = await this.authorService.getAllAuthors(paginationAguments.skip, to);
        return authors.map((author) => this.convert(author));
    }

    convert(author: Author): AuthorSchema {
        return {
            id: author.id,
            firstName: author.firstName,
            lastName: author.lastName,
        };
    }
}

/*
    @Mutation(returns => Recipe)
    @Authorized()
    addRecipe(
      @Arg("newRecipeData") newRecipeData: NewRecipeInput,
      @Ctx("user") user: User,
    ): Promise<Recipe> {
      return this.recipeService.addNew({ data: newRecipeData, user });
    }
  
    @Mutation(returns => Boolean)
    @Authorized(Roles.Admin)
    async removeRecipe(@Arg("id") id: string) {
      try {
        await this.recipeService.removeById(id);
        return true;
      } catch {
        return false;
      }
    }
  }
  */
