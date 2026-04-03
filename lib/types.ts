export interface Job {
  slug: string
  title: string
  category: string
  type: string
  location: string
  salary: string
  date: string
  description: string
  tags: string[]
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
}
