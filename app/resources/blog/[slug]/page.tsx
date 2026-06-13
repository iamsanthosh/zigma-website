import { notFound } from "next/navigation";
import { getLabels } from "@/lib/labels";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/catalog";
import PageHero from "@/components/layout/PageHero";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Zigma Technologies`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [labels, post] = await Promise.all([getLabels(), getBlogPostBySlug(slug)]);

  if (!post) notFound();

  return (
    <>
      <PageHero eyebrow={post.category} title={post.title} subtitle={post.excerpt} />

      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 text-ink/65 leading-relaxed space-y-5">
          <p>{post.excerpt}</p>
          <p>
            This article is part of Zigma Technologies&apos; ongoing content series covering{" "}
            {post.category.toLowerCase()}. Full article content can be managed from the admin
            panel, where editors can update the body text, cover image and publication status
            without developer involvement.
          </p>
          <p className="text-sm text-ink/45 pt-6 border-t border-line">
            {labels["site.name"] ?? "Zigma Technologies"} — {post.category}
          </p>
        </div>
      </section>
    </>
  );
}
