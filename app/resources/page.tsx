import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { getLabels } from "@/lib/labels";
import { getBlogPosts } from "@/lib/catalog";
import PageHero from "@/components/layout/PageHero";

export const metadata = {
  title: "Resources & Insights | Zigma Technologies",
  description: "Blogs, industry insights, solar ROI articles, product updates and FAQs from Zigma Technologies.",
};

export default async function ResourcesPage() {
  const [labels, posts] = await Promise.all([getLabels(), getBlogPosts()]);

  return (
    <>
      <PageHero
        eyebrow={labels["nav.resources"]}
        title="Resources & Insights"
        subtitle="Blogs, industry insights, solar ROI articles and product updates from the Zigma Technologies team."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/resources/blog/${post.slug}`}
                className="group rounded-lg border border-line bg-white p-6 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded bg-mist mb-4">
                  <FileText size={16} className="text-steel" />
                </span>
                <span className="font-mono-tag text-[11px] font-semibold text-steel uppercase tracking-wider mb-2">
                  {post.category}
                </span>
                <h3 className="font-display font-bold text-navy mb-2 group-hover:text-steel transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-ink/55 leading-relaxed mb-4 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
                  {labels["common.read_more"] ?? "Read more"}
                  <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
