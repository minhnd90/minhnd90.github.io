import { getPageMap } from 'nextra/page-map'

async function test() {
  try {
    const pageMap = await getPageMap('/blog')
    console.table('Page Map for /blog:', JSON.stringify(pageMap, null, 2))
  } catch (e) {
    console.error('Error getting page map:', e)
  }
}

test()
