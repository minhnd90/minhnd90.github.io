import { META } from '@/lib/constants';
import { getAllPosts } from '@/lib/markdown';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const BlogList = dynamic(() => import('@/components/blog/blog-list'));

export const metadata: Metadata = META.blog;

/**
 * Blog page component rendering a list of blog posts.
 *
 * @returns {Promise<JSX.Element>} Rendered blog page.
 */
export default async function BlogPage() {
  const posts = await getAllPosts();

  return <BlogList posts={posts} />;
}
