import fs from 'fs';
import grayMatter from 'gray-matter';

export interface Clazz {
    path: string;
    title: string;
    description: string;
    image: string;
    downloads: Array<{name: string, url: string}>;
}

export class ClassService {
    public findAll(): Array<Clazz> {
        return fs.readdirSync('pages/classi', {recursive: true, withFileTypes: true})
            .filter((dirent) => dirent.isFile)
            .filter((dirent) => dirent.name.endsWith('.mdx'))
            .filter((dirent) => dirent.name !== 'index.mdx')
            .filter((dirent) => dirent.name !== 'community.mdx')
            .map((dirent) => {
                const content = fs.readFileSync(`${dirent.path}/${dirent.name}`, {encoding: 'utf8'});
                const metadata = grayMatter(content);
                return {
                    path: `${dirent.path}/${dirent.name}`.replace('.mdx', '').replace('pages/', '/'),
                    title: metadata.data['title'] ?? null,
                    description: metadata.data['description'] ?? null,
                    image: metadata.data['image'] ?? null,
                    downloads: metadata.data['image'] ?? [],
                };
            });
    }

    public findAllFromCommunity() {
        return this.findAll().filter((clazz) => clazz.path.startsWith('/classi/community'));
    }
}

const classService = new ClassService();

export default classService;