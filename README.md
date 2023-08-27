# NextJS Official Tutorial
This is a starter template for [Learn Next.js](https://nextjs.org/learn).

## C1 - Create a Next.js App - Setup


    nvm use 18
    
    npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"

# C2 - Navigate Between Pages

## Creating New Pages

 - depends on file system
 - root of pages in `./pages` folder of project
 - folders and file name represent the routing
 - `Link` component of `next/link` to navigate 
   - acts like `a` element, but route needs to be set manually
   - difference being that it's fully client side (i.e. not fetching from server)
   - see `pageurl` in wagtail templates
   - or `url` in django templates


Refs: 
 - https://nextjs.org/docs/pages/building-your-application/routing
 - https://nextjs.org/docs/pages/api-reference/components/link
