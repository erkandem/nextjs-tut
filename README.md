# NextJS Official Tutorial
This is a starter template for [Learn Next.js](https://nextjs.org/learn).

## C1 - Create a Next.js App - Setup

Chapter Link: https://nextjs.org/learn/basics/create-nextjs-app

    nvm use 18
    
    npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"

## C2 - Navigate Between Pages

Chapter Link: https://nextjs.org/learn/basics/navigate-between-pages
### Creating New Pages

 - depends on file system
 - root of pages in `./pages` folder of project
 - folders and file name represent the routing

### Navigation

 - `Link` component of `next/link` to navigate 
   - acts like `a` element, but route needs to be set manually
   - difference being that it's fully client side (i.e. not fetching from server)
   - see `pageurl` in wagtail templates
   - or `url` in django templates


Refs: 
 - https://nextjs.org/docs/pages/building-your-application/routing
 - https://nextjs.org/docs/pages/api-reference/components/link


## C3 - Assets, Metadata, and CSS

Chapter Link: https://nextjs.org/learn/basics/assets-metadata-css
### Assets

 - `public` folder for assets
 - sample route would be `/images/profile.jpg` for `public/images/profile.jpg`
 - for images, leverage `Image` component of `next/image`
   - handles optimization (e.g. size, format)


Refs.: 
 - Usage: https://nextjs.org/docs/pages/building-your-application/optimizing/images
 - API: https://nextjs.org/docs/pages/api-reference/components/image

### Metadata

 - `Head` component available from `next/head` e.g. to modify page title

Refs.: 
 - https://nextjs.org/docs/pages/api-reference/components/head

### Third Party JS

 - risk of render blocking avoided with `Script` component of `next/script`
 - `strategy` to define how important the script is:
   - `beforeInteractive`
   - `afterInteractive`
   - `lazyOnload`
 - `onLoad` prop to execute extra JS after loading
 - 
Refs.:
 - usage: https://nextjs.org/docs/pages/building-your-application/optimizing/scripts
 - API: https://nextjs.org/docs/pages/api-reference/components/script

### Styling

#### component level styling

 - with extra file matching component name
 - `components/Button.module.css`
 - `components/Button.js`
 - `import styles from './Button.module.css'` within `components/Button.js`
 - _Regular <link> stylesheets and global CSS files are still supported_


#### External Stylesheets

 - in case of installation via node
 - e.g. global import: `import 'bootstrap/dist/css/bootstrap.css'` within `pages/_app.js`
 - e.g. component level: `import '@reach/dialog/styles.css'`

Refs:
 - Tailwind: https://nextjs.org/docs/pages/building-your-application/styling/tailwind-css
 - Tailwind example: https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss

### Layout Component

Motivation: example for component-level styles and creating a container component


 - layout component to carry styling to serve as container for
   children components
  - `components/layout.js`
  - `components/layout.module.css`
  - connect CSS via `import styles from './layout.module.css';` in JS file
  - and mount to JSX HTML element via `className={styles.container}`
  - `container` being defined in the CSS  file
  - next creates unique class names on app level

### Global Styles

 - global styles can only be imported in `_app.js`

### Polishing up the Layout

Motivation: Remove more of the boilerplate example code


 - usage of constant to render sth
 - `meta` tags inside of `<Header>` layout which will be included in children
   (if used in/as children)
 - ternary JSX fragment pattern depending on `home` flag

### Styling Tips

1. clsx to toggle classes https://www.npmjs.com/package/clsx

```css
.success {
  color: green;
}
.error {
  color: red;
}
```

```js
import styles from './alert.module.css';
import { clsx } from 'clsx';

export default function Alert({ children, type }) {
  return (
    <div
      className={clsx({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error',
      })}
    >
      {children}
    </div>
  );
}
```

2. Customizing PostCSS Config and 3. tailwind

 - manipulation of the CSS shipped to the client such that
 - vendor prefixes are set (distinguish whose CSS it actually is)
 - collisions are voided

```sh
npm install -D tailwindcss autoprefixer postcss
```

`-D` for --save-dev (separate from prod package)

4. SASS

```sh
npm install -D sass
```

Ref.: 
 - postcss https://www.youtube.com/watch?v=WhCXiEwdU1A
 - styling tech in general https://www.youtube.com/watch?v=ouncVBiye_M

## C4 - Pre-rendering and Data Fetching

Lesson goals:

 - pre-rendering feature
 - static and server side rendering
 - static generation with data and without
 - getStaticProps
Step: https://nextjs.org/learn/basics/data-fetching/setup

### pre-rendering overview

a) static rendering

> Complete static HTML can be hosted by e.g. nginx

typical: Marketing pages

b) server side rendering

> creates the HTML for each request

 - run some of the js in the background and return some of the app as html
 - each way, saves time on client side to render vs pure react app
 - use static if not much dynamic elements are present (i.e. data is updated)
 - static/server side can be configured on page level

### static
 - example to get data from the filesystem and include it into our component


```js
export async function getStaticProps() {
    const allPostsData = getSortedPostsData(); // external calls 
    return {
        props: {
            allPostsData,
        },
    };
}
```
 - Within the component module, above the functional component:
 - convention name `getStaticProps`
 - returns  `{props: { <prop name>: <prop value>}}` or short `{props: {variableName}}` (Object Property Shorthand)
 - runs only on the server side (that's why we were able to use nodes API)
 - runs on every request in `dev` mode
 - runs __once__ at build time
 - can only be exported from a [page](https://nextjs.org/docs/basic-features/pages)

We could just as well do an external API call instead of reading
files from the local file system
```js
export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..');
  return res.json();
}
```

or DB calls

```js
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```
Ref.: 
 - [getstaticprops](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)

### Fetching Data at Request Time

 - to fetch non-static data
> You should use getServerSideProps only if you need to pre-render a page whose data must be fetched at request time.

```js
export async function getServerSideProps(context) {
    // magic
  return {
    props: {
      // props for your component
    },
  };
}
```
Ref.:
- [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)

#### Client-side Rendering

 - use case: dashboard, it's private, we will need creds before we can render anything
 - `SWR` Next.js way of what we could do with `useEffect`
Ref.:
- [Client-side data fetching with SWR] (https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side#client-side-data-fetching-with-swr)



Node specific details:
 - fs is a Node.js module that let's you read files from the file system.
 - path is a Node.js module that let's you manipulate file paths.
 - matter is a library that let's you parse the metadata in each markdown file.

## C5 - Dynamic Routes

Chapter Link: https://nextjs.org/learn/basics/dynamic-routes

 - dynamic paths need a `[id].js` within a subfolder
 - it contains
   - the React component on how to render the data
   - `getStaticPaths` to tell next.js what paths do exists
   - and `getStaticProps` to tell next.js what to render on each dynamic route


### getStaticPaths

 - runs with every request in `dev`
 - runs __once__ at build time in `prod`
 - expects `paths` to be of `[{params: {id: 'theActualId'},...]` format

```js 
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
```

Ref.:
 - [getStaticPaths](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths)

### get static props

```js
export async function getStaticProps({params}) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        }
    };
}
```
#### In case of external data

 - ... the utility function could do a DB query or an API query:
```js 
export async function getAllPostIds() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..');
  const posts = await res.json();
  return posts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}

```
### Dynamic Page Layout

 - in the case of markdown, `dangerouslySetInnerHTML` can be used
 - in combo with [`remark`](https://github.com/remarkjs/remark) library
 - and [`remark-html`](https://github.com/remarkjs/remark-html)
 - additionally [`date-fns`](https://date-fns.org/) was introduced for date formatting

### Index Route
 - since we already have posts metadata (including the ide)
 - `<Link href={`/posts/${id}`}>{title}</Link>`

### Error Pages

 - custom 404 page can be created within `pages`: `pages/404`
 - same for 500

Ref.: 
 - [Error Pages](https://nextjs.org/docs/pages/building-your-application/routing/custom-error)

## C6 - API Routes

Chapter link: https://nextjs.org/learn/basics/api-routes

 - offers independent API routes
 - can be [dynamic](https://nextjs.org/docs/pages/building-your-application/routing/api-routes#dynamic-api-routes)
   as well just like pages
 - use cases
   - can be used to save form input directly to the database
   - preview route
 - not to be used within `getStaticProps`, `getStaticPaths`
   since we can avoid the HTTP traffic altogether with 
   a utility function (i.e. which could be called by both `getStatic*` and the API route handler)


```js
// pages/api/hello.js
// accessable at http://localhost:3000/api/hello
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' });
}
```

 - [Api Routes Docs](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
   - ["Serverless" example](https://github.com/vercel/next.js/tree/canary/examples/api-routes)
   - [REST example](https://github.com/vercel/next.js/tree/canary/examples/api-routes-rest)
   - [GraphQL example](https://github.com/vercel/next.js/blob/canary/examples/api-routes-graphql)
   - [CORS](https://github.com/vercel/next.js/tree/canary/examples/api-routes-cors)
   - [CORS Reacap](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
 - [req](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
 - [res](https://nodejs.org/api/http.html#http_class_http_serverresponse)




https://tailwindcss.com/
https://github.com/unicodeveloper/awesome-nextjs?search=1
https://nextjs.org/docs
