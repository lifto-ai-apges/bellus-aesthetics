import { BranchItem } from "../data/branches";
import { ServiceItem } from "../data/services";
import { ProductItem } from "../data/products";
import { ArticleItem } from "../data/articles";

const MAIN_DOMAIN = "https://bellus.ph";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bellus Aesthetics",
    "url": MAIN_DOMAIN,
    "logo": `${MAIN_DOMAIN}/logo.png`,
    "sameAs": [
      "https://www.facebook.com/BellusIntlCorp/",
      "https://www.instagram.com/bellus.aesthetics/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+63 999 884 8873",
      "contactType": "customer service",
      "areaServed": "PH",
      "availableLanguage": ["English", "Tagalog"]
    }
  };
}

export function getLocalBusinessSchema(branch: BranchItem) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": branch.name,
    "image": `${MAIN_DOMAIN}/logo.png`,
    "@id": `${MAIN_DOMAIN}/contact#${branch.id}`,
    "url": `${MAIN_DOMAIN}/contact`,
    "telephone": branch.phone,
    "priceRange": "₱₱-₱₱₱₱",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": branch.address.split(",")[0],
      "addressLocality": branch.city,
      "addressCountry": "PH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": branch.lat,
      "longitude": branch.lng
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "10:00",
      "closes": "20:00"
    }
  };
}

export function getServiceSchema(service: ServiceItem, categoryName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "provider": {
      "@type": "MedicalBusiness",
      "name": "Bellus Aesthetics",
      "url": MAIN_DOMAIN
    },
    "name": service.name,
    "description": service.description,
    "category": categoryName,
    "offers": {
      "@type": "Offer",
      "price": service.priceNum,
      "priceCurrency": "PHP",
      "availability": "https://schema.org/InStock"
    }
  };
}

export function getProductSchema(product: ProductItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": `${MAIN_DOMAIN}/images/products/${product.id}.jpg`,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.category === "masks-scrubs" ? "Careline" : "SKINLAB by Bellus"
    },
    "offers": {
      "@type": "Offer",
      "url": `${MAIN_DOMAIN}/products`,
      "priceCurrency": "PHP",
      "price": product.priceNum,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function getArticleSchema(article: ArticleItem) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "image": `${MAIN_DOMAIN}${article.image}`,
    "datePublished": new Date(article.date).toISOString().split('T')[0],
    "author": {
      "@type": "Person",
      "name": article.author,
      "jobTitle": "Aesthetic Specialist"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bellus Aesthetics",
      "logo": {
        "@type": "ImageObject",
        "url": `${MAIN_DOMAIN}/logo.png`
      }
    },
    "description": article.summary
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((crumb, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": crumb.name,
      "item": `${MAIN_DOMAIN}${crumb.item}`
    }))
  };
}
