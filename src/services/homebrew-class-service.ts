import fs from 'fs';
import grayMatter from 'gray-matter';

export interface HomebrewClazz {
    path: string;
    title: string;
    description: string;
    author: string;
    collection: string;
    image: {name: string, url: string};
    base: boolean;
    downloads: Record<string, string>;
}

export class HomebrewClassService {
    private classes = fs.readdirSync('pages/homebrew/classi', {recursive: true, withFileTypes: true})
    .filter((dirent) => dirent.isFile)
    .filter((dirent) => dirent.name.endsWith('.mdx'))
    .filter((dirent) => dirent.name !== 'index.mdx')
    .map((dirent) => {
        const content = fs.readFileSync(`${dirent.path}/${dirent.name}`, {encoding: 'utf8'});
        const metadata = grayMatter(content);
        return {
            path: `${dirent.path}/${dirent.name}`.replace('.mdx', '').replace('pages/', '/'),
            title: metadata.data['title'] ?? null,
            description: metadata.data['description'] ?? null,
            author: metadata.data['author'] ?? '',
            collection: metadata.data['collection'] ?? '',
            base: metadata.data['base'] ?? false,
            image: metadata.data['image'] ?? {url: '/images/classi/classi-base/adrian-paladino.jpg', name: 'Adrian il Paladino'},
            downloads: metadata.data['downloads'] ?? {},
        };
    });

    public findAll(): Array<HomebrewClazz> {
        return [...this.classes];
    }

    public findAuthors(): Array<string> {
        const authors = this.classes.map(clazz => clazz.author);
        return Array.from(new Set(authors))
    }

    public findAuthorCollections(author: string): Array<string> {
        const collections = this.classes.filter(clazz => clazz.author === author).map(clazz => clazz.collection.trim());
        
        return Array.from(new Set(collections));
    }

    public findByAuthorAndCollection(author: string, collection: string = ''): Array<HomebrewClazz> {
        return this.classes.filter(clazz => clazz.author === author)
            .filter(clazz => clazz.collection === collection);
    }

    public findGroupedByAuthorAndCollection(): Record<string, Record<string, Array<HomebrewClazz>>> {
        const authors = this.findAuthors();
        const result: Record<string, Record<string, Array<HomebrewClazz>>> = {};
        
        for (const author of authors) {
            result[author] = {};
            const collections = this.findAuthorCollections(author);
            
            for (const collection of collections) {
                result[author][collection] = this.findByAuthorAndCollection(author, collection);
            }
        }

        return result;
    }
}

const homebrewClassService = new HomebrewClassService();

export default homebrewClassService;