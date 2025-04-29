import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const cruisesDirectory = path.join(process.cwd(), 'src/content/cruises');
const pagesDirectory = path.join(process.cwd(), 'src/content/pages');

export function getAllCruiseSlugs() {
  const fileNames = fs.readdirSync(cruisesDirectory);
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    };
  });
}

export function getCruiseData(slug) {
  const fullPath = path.join(cruisesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Use gray-matter to parse the cruise metadata section
  const matterResult = matter(fileContents);
  
  // Convert markdown into HTML string
  const processedContent = remark()
    .use(html)
    .processSync(matterResult.content)
    .toString();
    
  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml: processedContent,
    ...matterResult.data
  };
}

export function getAllCruises() {
  // Get file names under /cruises
  const fileNames = fs.readdirSync(cruisesDirectory);
  const allCruisesData = fileNames.map(fileName => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '');
    
    // Read markdown file as string
    const fullPath = path.join(cruisesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Use gray-matter to parse the cruise metadata section
    const matterResult = matter(fileContents);
    
    // Combine the data with the slug
    return {
      slug,
      ...matterResult.data
    };
  });
  
  // Sort cruises by date
  return allCruisesData.sort((a, b) => {
    if (a.startDate < b.startDate) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPageData(slug) {
  const fullPath = path.join(pagesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Use gray-matter to parse the page metadata section
  const matterResult = matter(fileContents);
  
  // Convert markdown into HTML string
  const processedContent = remark()
    .use(html)
    .processSync(matterResult.content)
    .toString();
    
  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml: processedContent,
    ...matterResult.data
  };
}
