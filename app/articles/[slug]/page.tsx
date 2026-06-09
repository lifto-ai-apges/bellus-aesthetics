import Link from "next/link";
import { notFound } from "next/navigation";
import { articlesData } from "../../../data/articles";
import { getArticleSchema, getBreadcrumbSchema } from "../../../lib/schema";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static routes for build time pre-rendering
export async function generateStaticParams() {
  return articlesData.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = articlesData.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  // Generate SEO schema schemas
  const articleSchema = getArticleSchema(article);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Articles", item: "/articles" },
    { name: article.title, item: `/articles/${article.slug}` }
  ]);

  // Clean raw markdown to simple HTML paragraphs for display
  const renderContent = (content: string) => {
    return content
      .split("\n\n")
      .map((block, idx) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("# ")) {
          return null; // Skip main title as we render it in the header
        }
        if (trimmed.startsWith("## ")) {
          return <h2 key={idx} className="content-h2">{trimmed.replace("## ", "")}</h2>;
        }
        if (trimmed.startsWith("### ")) {
          return <h3 key={idx} className="content-h3">{trimmed.replace("### ", "")}</h3>;
        }
        if (trimmed.startsWith("* ")) {
          const listItems = trimmed.split("\n* ").map(item => item.replace("* ", ""));
          return (
            <ul key={idx} className="content-ul">
              {listItems.map((item, itemIdx) => (
                <li key={itemIdx}>{item}</li>
              ))}
            </ul>
          );
        }
        if (trimmed.startsWith("|")) {
          // Render a clean comparison table
          const lines = trimmed.split("\n");
          const headers = lines[0].split("|").map(h => h.trim()).filter(Boolean);
          const rows = lines.slice(2).map(line => line.split("|").map(c => c.trim()).filter(Boolean));
          return (
            <div key={idx} className="table-responsive">
              <table className="content-table">
                <thead>
                  <tr>
                    {headers.map((h, i) => <th key={i}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => <td key={ci}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (trimmed === "---") {
          return <hr key={idx} className="content-hr" />;
        }
        // Standard paragraph
        // Parse basic markdown bolding **text**
        const parts = trimmed.split(/\*\*([^*]+)\*\*/g);
        const elements = parts.map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part);
        
        return <p key={idx} className="content-p">{elements}</p>;
      })
      .filter(Boolean);
  };

  return (
    <div className="article-detail-page">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Article Header */}
      <section className="section article-header section-dark">
        <div className="container">
          <div className="header-content">
            <div className="article-meta">
              <span className="tag-box">{article.tags[0]}</span>
              <span className="read-time">{article.readTime}</span>
            </div>
            <h1 className="article-title-text">{article.title}</h1>
            <div className="author-details">
              <span className="author-name">By {article.author}</span>
              <span className="divider">|</span>
              <span className="publish-date">Published on {article.date}</span>
            </div>
            <div className="header-actions" style={{ marginTop: "24px" }}>
              <Link href="/articles" className="btn btn-outline-white back-btn">
                &larr; Back to Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="section article-body-section">
        <div className="container body-container">
          <article className="article-content-wrapper">
            {renderContent(article.content)}
          </article>
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="section consult-section section-dark">
        <div className="container">
          <div className="consult-box">
            <h2 className="consult-title">Schedule a Doctor Consultation</h2>
            <p className="consult-desc">
              Have questions about {article.tags[0]} or any other aesthetic procedure? Our board-certified plastic surgeons and specialists are ready to guide you.
            </p>
            <Link href="/book" className="btn btn-accent consult-btn">
              Book Doctor Consultation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

