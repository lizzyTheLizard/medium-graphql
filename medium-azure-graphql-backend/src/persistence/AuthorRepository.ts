import 'reflect-metadata';
import { Service } from 'typedi';
import { Author } from '../domain/author/Author';

const authors: Author[] = [
    { id: '1', firstName: 'One', lastName: 'Person' },
    { id: '2', firstName: 'Two', lastName: 'Person' },
];

@Service()
export class AuthorRepository {
    async getAuthorById(id: string): Promise<Author> {
        console.log('Load author from DB', id);
        return authors.filter((a) => a.id === id)[0];
    }

    async getAuthorByIds(ids: string[]): Promise<Author[]> {
        console.log('Load authors from DB', ids);
        return authors.filter((a) => ids.includes(a.id));
    }

    public async getAllAuthors(from: number, to?: number): Promise<Author[]> {
        console.log('Load all authors from DB');
        return authors.slice(from, to);
    }

    public async save(author: Author): Promise<Author> {
        authors.push(author);
        return author;
    }
}
