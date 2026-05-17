import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPost, posts } from "@/lib/blog";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.post.title.en ?? "Article"} — Amirfazel Moshrefi` },
      { name: "description", content: loaderData?.post.excerpt.en ?? "" },
      { property: "og:image", content: loaderData?.post.image ?? "" },
    ],
  }),
  errorComponent: ({ error }) => <div className="p-10">{error.message}</div>,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <Link to="/blog" className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">Back</Link>
    </div>
  ),
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const { t, i18n } = useTranslation();
  const lng = (["en", "fa", "ar"] as const).includes(i18n.language as any)
    ? (i18n.language as "en" | "fa" | "ar")
    : "en";
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="bg-background">
      <Header />
      <article className="pt-28">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4 rtl:rotate-180" /> {t("blog.back")}
          </Link>
          <div className="mt-6 eyebrow">{post.category[lng]}</div>
          <h1 className="mt-3 font-serif text-3xl leading-tight md:text-5xl">{post.title[lng]}</h1>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="size-3.5" /> {post.readTime} {t("blog.min")}</span>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-5xl px-4 md:px-8">
          <div className="aspect-[16/9] overflow-hidden rounded-2xl">
            <img src={post.image} alt={post.title[lng]} className="size-full object-cover" />
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-3xl px-4 pb-20 md:px-8">
          <p className="text-lg leading-relaxed text-foreground/90">{post.excerpt[lng]}</p>
          <div className="my-6 h-px w-12 bg-gold" />
          <p className="leading-relaxed text-muted-foreground">{post.content[lng]}</p>
        </div>
      </article>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-serif text-2xl">{t("blog.related")}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group block overflow-hidden rounded-2xl bg-card shadow-sm hover:shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="eyebrow text-[0.6rem]">{p.category[lng]}</div>
                  <h3 className="mt-2 font-serif text-lg">{p.title[lng]}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
