export const GET_ALL_POSTS = `
    query {
        blogPostCollection {
            items {
                title
                slug
                content {
                    json
                }
                coverImage {
                    url
                    title
                    description
                }
            }
        }
    }
`;

export const GET_POST_BY_SLUG = `
    query GetPostBySlug($slug: String!) {
        blogPostCollection(where: { slug: $slug }, limit: 1) {
            items {
                title
                slug
                content {
                    json
                }
                coverImage {
                    url
                    title
                    description
                }
            }
        }
    }
`;