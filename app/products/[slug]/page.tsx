import { notFound } from "next/navigation";
import Link from "next/link";
import { Download, MessageCircle, ArrowRight } from "lucide-react";
import { getLabels } from "@/lib/labels";
import { getProductBySlug, getProducts } from "@/lib/catalog";
import { getVerticalBySlug } from "@/lib/content";
import PageHero from "@/components/layout/PageHero";
import EnquiryForm from "@/components/products/EnquiryForm";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Zigma Technologies`,
    description: product.short_desc,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [labels, product] = await Promise.all([getLabels(), getProductBySlug(slug)]);

  if (!product) notFound();

  const [vertical, allProducts] = await Promise.all([
    getVerticalBySlug(product.vertical_slug),
    getProducts(product.vertical_slug),
  ]);

  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 3);
  const accent = vertical?.color_theme ?? "#0A2A4A";

  return (
    <>
      <PageHero
        eyebrow={vertical ? labels[vertical.tag_key ?? ""] ?? "" : ""}
        title={product.name}
        subtitle={product.short_desc}
        accentColor={accent}
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-display text-xl font-bold text-navy mb-3">
                  {labels["common.overview"] ?? "Overview"}
                </h2>
                <p className="text-ink/65 leading-relaxed">{product.overview}</p>
              </div>

              {product.specs?.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-bold text-navy mb-4">
                    {labels["common.specifications"] ?? "Technical Specifications"}
                  </h2>
                  <div className="rounded-lg border border-line overflow-hidden">
                    {product.specs.map((spec, i) => (
                      <div
                        key={spec.label}
                        className={`grid grid-cols-2 px-5 py-3 text-sm ${
                          i % 2 === 0 ? "bg-mist" : "bg-white"
                        }`}
                      >
                        <span className="font-semibold text-navy">{spec.label}</span>
                        <span className="text-ink/65">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.applications && (
                <div>
                  <h2 className="font-display text-xl font-bold text-navy mb-3">
                    {labels["common.applications"] ?? "Applications"}
                  </h2>
                  <p className="text-ink/65 leading-relaxed">{product.applications}</p>
                </div>
              )}

              {product.faqs?.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-bold text-navy mb-4">
                    {labels["common.faqs"] ?? "Frequently Asked Questions"}
                  </h2>
                  <div className="space-y-4">
                    {product.faqs.map((faq) => (
                      <div key={faq.q} className="rounded-lg border border-line p-5">
                        <p className="font-semibold text-navy mb-1.5">{faq.q}</p>
                        <p className="text-sm text-ink/60 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {related.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-bold text-navy mb-4">
                    {labels["common.related_products"] ?? "Related Products"}
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {related.map((r) => (
                      <Link
                        key={r.id}
                        href={`/products/${r.slug}`}
                        className="group rounded-lg border border-line p-4 hover:shadow-md transition-all"
                      >
                        <h3 className="font-display font-bold text-sm text-navy mb-2 group-hover:text-steel transition-colors">
                          {r.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-navy">
                          {labels["common.learn_more"] ?? "Learn more"}
                          <ArrowRight size={12} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="rounded-xl border border-line p-6 bg-mist">
                  <EnquiryForm
                    enquiryType="product"
                    productId={product.id}
                    verticalId={vertical?.id}
                    sourcePage={`/products/${product.slug}`}
                    title={labels["common.request_quote"] ?? "Request a Quote"}
                    subtitle={product.name}
                    accentColor={accent}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`https://wa.me/919000000000?text=${encodeURIComponent(
                      `Hi, I'm interested in ${product.name}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded border border-line py-2.5 text-sm font-semibold text-navy hover:bg-mist transition-colors"
                  >
                    <MessageCircle size={16} />
                    {labels["common.whatsapp"] ?? "WhatsApp"}
                  </a>
                  <button className="flex items-center justify-center gap-2 rounded border border-line py-2.5 text-sm font-semibold text-navy hover:bg-mist transition-colors">
                    <Download size={16} />
                    {labels["common.download_brochure"] ?? "Brochure"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
