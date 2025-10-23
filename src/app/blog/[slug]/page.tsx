import { getPostBySlug } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

interface Props {
    params: {
        slug: string;
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) return <p className="text-center text-red-500 mt-10">Post not found.</p>;

    const { title, content, coverImage } = post;

    return (
        <article className="max-w-2xl mx-auto px-4 py-12">
            {coverImage?.url && (
                <img
                    src={coverImage.url}
                    alt={coverImage.title || "Cover image"}
                    className="w-full h-auto rounded-xl mb-6"
                />
            )}

            <h1 className="text-3xl font-bold mb-4">{title}</h1>

            <section className="space-y-4 text-lg leading-relaxed">
                {documentToReactComponents(content.json, {
                    renderNode: {
                        [BLOCKS.PARAGRAPH]: (_, children) => (
                            <p className="mb-4">{children}</p>
                        ),
                        [BLOCKS.HEADING_2]: (_, children) => (
                            <h2 className="text-2xl font-semibold mt-6 mb-2">{children}</h2>
                        ),
                    },
                })}
            </section>
        </article>
    );
}