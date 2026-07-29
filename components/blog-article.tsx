import type { BlogLocaleContent } from "@/lib/blog/posts";
import type { ValidLocale } from "@/lib/i18n/config";

export default function BlogArticle({
  lang,
  content,
}: {
  lang: ValidLocale;
  content: BlogLocaleContent;
}) {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12" lang={lang}>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h1>
      {content.intro ? <p className="text-gray-600 text-lg mb-8">{content.intro}</p> : null}

      {content.sections.map((section) => (
        <section key={section.heading} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-gray-600 mb-3 leading-relaxed">
              {paragraph}
            </p>
          ))}
          {section.list ? (
            section.ordered ? (
              <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            ) : (
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )
          ) : null}
        </section>
      ))}

      {content.closing ? (
        <p className="text-gray-800 font-medium mt-10 border-t border-gray-100 pt-6">
          {content.closing}
        </p>
      ) : null}
    </article>
  );
}
