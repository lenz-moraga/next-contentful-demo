import { GET_ALL_POSTS, GET_POST_BY_SLUG } from "./queries";

export interface Post {
  title: string;
  slug: string;
  content: {
    json: any;
  };
  coverImage?: {
    url: string;
    title?: string;
    description?: string;
  };
}

export interface BlogPostData {
  blogPostCollection: {
    items: Post[];
  };
}

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const graphqlUrl = process.env.CONTENTFUL_GRAPHQL_URL;

export async function fetchContent<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const missingVars = [];
  if (!spaceId) missingVars.push("CONTENTFUL_SPACE_ID");
  if (!accessToken) missingVars.push("CONTENTFUL_ACCESS_TOKEN");
  if (!graphqlUrl) missingVars.push("CONTENTFUL_GRAPHQL_URL");

  if (missingVars.length > 0) {
    throw new Error(`Missing env vars: ${missingVars.join(", ")}`);
  }

  const response = await fetch(graphqlUrl!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: 60, // ISR: 60 secs
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Contentful GraphQL fetch failed:", errorText);
    throw new Error("Failed to fetch from Contentful");
  }

  const json = await response.json();
  return json.data;
}

export const getAllPosts = async (): Promise<Post[]> => {
  const data = await fetchContent<BlogPostData>(GET_ALL_POSTS);

  const safePosts: Post[] = data.blogPostCollection.items.filter(
    (post: Post) => post.slug && post.title
  );

  return safePosts;
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const data = await fetchContent<BlogPostData>(GET_POST_BY_SLUG, { slug });

  const post = data.blogPostCollection.items[0];

  return post ?? null;
};
