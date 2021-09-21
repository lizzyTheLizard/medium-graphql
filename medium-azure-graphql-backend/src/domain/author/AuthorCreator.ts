import { Service } from 'typedi';
import { AuthorRepository } from '../../persistence/AuthorRepository';
import { Author } from './Author';

@Service()
export class AuthorCreator {
    constructor(private readonly authorRepository: AuthorRepository) {}

    public async createAuthor({ firstName, lastName }): Promise<Author> {
        const author = {
            firstName: firstName,
            lastName: lastName,
            id: Math.ceil(Math.random() * 10000).toString(),
        };
        return this.authorRepository.save(author);
    }
}
