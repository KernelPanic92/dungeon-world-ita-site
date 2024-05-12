import { Link} from 'nextra-theme-docs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FC, PropsWithChildren } from 'react';
import { HomebrewClazz } from '@/services/homebrew-class-service';
import { DownloadLink } from './download-link';



const ClassDownloads = ({clazz}: {clazz: HomebrewClazz}) => {
  return <ul className='list-disc list-outside'>
    {Object.entries(clazz.downloads).map(([label, url]) => <li className='pt-2' key={url}><DownloadLink href={url}>{label}</DownloadLink></li>)}
  </ul>;
};
export interface DownloadHomebrewProps {
  classes: Record<string, Record<string, Array<HomebrewClazz>>>
}

export const DownloadHombrewClasses: FC<PropsWithChildren<DownloadHomebrewProps>> = ({classes}) => {
  return <ul className="list-disc list-outside pl-5 pt-2">
    {Object.entries(classes).map(([author, collections]) => {
    return <li className='pt-2' key={author}> {author}
        <ul className="list-disc list-outside pl-5"> { Object.entries(collections).map(([collection, collectionClasses]) => {
        return <li className='pt-2' key={collection}>{collection}
          <ul className="list-disc list-outside pl-5">
            {collectionClasses.map((clazz) => <ClassDownloads key={clazz.path} clazz={clazz}/>)}
          </ul>
        </li>;
    })}</ul>
    </li>;
  })}
  </ul>;
}
