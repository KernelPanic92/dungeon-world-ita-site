import React from 'react';
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';
import { Metal_Mania } from 'next/font/google';
import clsx from 'clsx';

const metalMania = Metal_Mania({
  weight: '400',
  preload: true,
  subsets: ['latin']

});
const config: DocsThemeConfig = {
  logo: <span className={metalMania.className} style={{fontSize: '1.5rem', color: '#73C482'}}>Dungeon World</span>,
  project: {
    link: 'https://github.com/KernelPanic92/dungeon-world-ita-site',
  },
  docsRepositoryBase: 'https://github.com/KernelPanic92/dungeon-world-ita-site/tree/main',
  footer: {
    text: 'Dungeon World in italiano',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1
  },
  i18n: [{
    text: 'Italiano',
    locale: 'it',
    direction: 'ltr'
  }],
 direction: 'ltr',
 feedback: {
  content: () => <>{'Lascia un feedback o una segnalazione →'}</>
 },
 search: {
   placeholder: 'Cerca nel sito',
   loading: 'Ricerca...',
   error: 'Qualcosa è andato storto nella ricerca 😵',
 },
 editLink: {
  text: 'Modifica questa pagina',
 },
  useNextSeoProps: () => {
    return {
      titleTemplate: '%s – Dungeon World',
      head: () => {
        const { asPath, defaultLocale, locale } = useRouter()
        const { frontMatter } = useConfig()
        const url =
          'https://dungeon-world-ita-site.vercel.app/' +
          (defaultLocale === locale ? asPath : `/${locale}${asPath}`)
     
        return (
          <>
            <meta property="og:url" content={url} />
            <meta property="og:title" content={frontMatter.title || 'Dungeon World in italiano'} />
            <meta
              property="og:description"
              content={frontMatter.description || ''}
            />
          </>
        )
      },
    }
  }
}

export default config
