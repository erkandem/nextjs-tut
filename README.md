# NextJS Official Tutorial
This is a starter template for [Learn Next.js](https://nextjs.org/learn).

## C1 - Create a Next.js App - Setup


    nvm use 18
    
    npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"

## C2 - Navigate Between Pages

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
