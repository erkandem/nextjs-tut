import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
