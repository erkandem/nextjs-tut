import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

/*
Sample Data Structure returned (JSONified):
[
  {
    "id": "ssg-ssr",
    "title": "When to Use Static Generation v.s. Server-side Rendering",
    "date": "2020-01-02"
  },
  {
    "id": "pre-rendering",
    "title": "Two Forms of Pre-rendering",
    "date": "2020-01-01"
  }
]
 */
export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        return {
            id,
            ...matterResult.data,
        };
    })
    return allPostsData.sort((a,b) => {
        if (a.data < b.date) {
            return 1
        } else {
            return -1
        }
    })
}
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
    // or a database call
    // or an API call
    // since it runs on the server side
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  // Combine the data with the id
  return {
      id,
      contentHtml,
    ...matterResult.data,
  };
}
