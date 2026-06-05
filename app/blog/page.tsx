import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { META } from '../../lib/constants'
import { getAllPosts } from '../../lib/markdown'

const BlogList = dynamic(() => import('../../components/blog/blog-list'))

export const metadata: Metadata = META.blog

export default async function BlogPage() {
  const posts = await getAllPosts()

  return <BlogList posts={posts} />
}
