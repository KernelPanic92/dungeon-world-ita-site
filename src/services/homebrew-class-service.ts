import fs from 'fs';
import grayMatter from 'gray-matter';

export interface HomebrewClazz {
    path: string;
    title: string;
    description: string;
    authors: Array<string>;
    collection: string | undefined;
    image: {name: string, url: string};
    base: boolean;
    downloads: Array<{name: string, url: string}>;
}

export class HomebrewClassService {
    public findAll(): Array<HomebrewClazz> {
        return fs.readdirSync('pages/homebrew/classi', {recursive: true, withFileTypes: true})
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
                    authors: metadata.data['authors'] ?? [],
                    collection: metadata.data['collection'] ?? null,
                    base: metadata.data['base'] ?? false,
                    image: metadata.data['image'] ?? {url: '/images/classi/classi-base/adrian-paladino.jpg', name: 'Adrian il Paladino'},
                    downloads: metadata.data['image'] ?? [],
                };
            });
    }
}

const homebrewClassService = new HomebrewClassService();

export default homebrewClassService;