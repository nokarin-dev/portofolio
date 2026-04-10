export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-i-switched-to-nextjs",
    title: "Why I switched from CRA to Next.js",
    excerpt:
      "After years of Create React App, Next.js finally clicked for me. Here's what changed my mind.",
    date: "2026-03-10",
    readTime: "~2 min read",
    tags: ["Next~.js", "React", "Web Dev"],
    content: `
# Why I switched from CRA to Next.js
Create React App served me well for years. It's simple, familiar, and gets you off the ground fast. But as my projects grew, I kept running into the same walls: no SSR, slow builds, and bundle sizes that made me cringe.

## The tipping point
The tipping point was SEO. A client project needed proper meta tags, Open Graph images, and fast first-paint. CRA's SPA model just doesn't cut it out of the box.

## What Next.js gave me
- **File-based routing** - no more giant router configs
- **Server components** - ship less JavaScript by default
- **Image optimization** - automatic WebP, lazy loading, blurhash placeholders
- **Edge functions** - run code close to the user

## The learning curve
It wasn't painless. The App Router (introduced in Next 13) was a paradigm shift. Understanding when to use \`"use client"\` vs server components took time. But once it clicked, the mental model made total sense.

## Would I go back?
    Not a chance. Next.js is my default now for any serious project.
    `,
  },
  {
    slug: "tailwind-tips-i-wish-i-knew-earlier",
    title: "Tailwind tips I wish I knew earlier",
    excerpt: "After building dozens of projects with Tailwind CSS, these are the patterns that saved me the most time.",
    date: "2026-03-10",
    readTime: "~3 min read",
    tags: ["Tailwind CSS", "CSS", "Tips"],
    content: `
# Tailwind tips I wish I knew earlier

I've used Tailwind CSS on almost every project for the last three years. Here are patterns that leveled up my workflow.

## 1. \`group\` and \`peer\` utilities
These let you style children based on parent state, or siblings based on sibling state - without JavaScript.

\`\`\`html
<div class="group hover:bg-zinc-800">
  <p class="text-zinc-400 group-hover:text-white">Hover the parent</p>
</div>
\`\`\`

## 2. Arbitrary values
Sometimes design specs don't align with the default scale. Use \`[]\` syntax:

\`\`\`html
<div class="w-85.5 mt-3.25">...</div>
\`\`\`

## 3. \`@apply\` is a trap (mostly)
I used to use \`@apply\` everywhere. Now I avoid it - it defeats the purpose of utility classes and makes code harder to scan.

## 4. \`clsx\` + \`twMerge\`
For conditional classes, use \`clsx\` and \`tailwind-merge\` together:

\`\`\`ts
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...inputs) => twMerge(clsx(inputs))
\`\`\`

This prevents class conflicts when extending components.
    `,
  },
  {
    slug: "building-a-rest-api-with-fastapi",
    title: "Building a REST API with FastAPI",
    excerpt:
      "FastAPI's automatic OpenAPI docs and type safety make it one of the best Python web frameworks available today.",
    date: "2026-03-10",
    readTime: "~4 min read",
    tags: ["FastAPI", "Python", "Backend"],
    content: `
# Building a REST API with FastAPI
FastAPI is one of the fastest Python web frameworks, and its developer experience is outstanding. Here's how I approach building APIs with it.

## Why FastAPI?
- **Automatic OpenAPI docs** - Swagger UI out of the box
- **Type hints** - native Python typing for validation
- **Async support** - built for async/await from the start
- **Pydantic** - powerful data validation

## Basic setup
\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

@app.post("/items/")
async def create_item(item: Item):
    return {"name": item.name, "price": item.price}
\`\`\`

## Dependency injection
FastAPI's dependency injection system is elegant for things like auth:

\`\`\`python
from fastapi import Depends, HTTPException

async def get_current_user(token: str):
    user = verify_token(token)
    if not user:
        raise HTTPException(status_code=401)
    return user

@app.get("/me")
async def read_me(user = Depends(get_current_user)):
    return user
\`\`\`

FastAPI has become my go-to for any Python backend work.
    `,
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
