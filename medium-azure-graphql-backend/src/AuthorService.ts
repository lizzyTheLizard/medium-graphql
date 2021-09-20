import DataLoader = require('dataloader');
import { Service } from 'typedi';
import { Author } from './Author';
import { NewAuthorInput } from './graphql/NewAuthorInput';

const authors: Author[] = [
    { id: '1', firstName: 'One', lastName: 'Person' },
    { id: '2', firstName: 'Two', lastName: 'Person' },
];

@Service()
export class AuthorService {
    private readonly dataLoader: DataLoader<string, Author>;

    constructor() {
        this.dataLoader = new DataLoader((ids: string[]) => this.batchLoader(ids), { cache: false });
    }

    async getAuthorById(id: string): Promise<Author> {
        return this.dataLoader.load(id);
    }

    private async batchLoader(ids: string[]): Promise<Author[]> {
        console.log('Load author from DB', ids);
        return authors.filter((a) => ids.includes(a.id));
    }

    public async getAllAuthors(from: number, to?: number): Promise<Author[]> {
        console.log('Load all authors from DB');
        return authors.slice(from, to);
    }

    public async createAuthor({firstName, lastName}): Promise<Author> {
        const author = {
            firstName: firstName,
            lastName: lastName,
            id: Math.ceil(Math.random()*10000).toString()
      };
      authors.push(author);
      return author;
    }
}
