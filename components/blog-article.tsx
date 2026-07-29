import Reveal from "@/components/reveal";
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
      <Reveal>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          {content.title}
        </h1>
        {content.intro ? (
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">{content.intro}</p>
        ) : null}
      </Reveal>

      {content.sections.map((section, index) => (
        <Reveal key={section.heading} delay={Math.min(index * 60, 240)}>
          <section className="mb-8">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-3">
              {section.heading}
            </h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-gray-600 mb-3 leading-relaxed">
                {paragraph}
              </p>
            ))}
            {section.list ? (
              section.ordered ? (
                <ol className="list-decimal pl-6 text-gray-600 space-y-2 leading-relaxed">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              ) : (
                <ul className="list-disc pl-6 text-gray-600 space-y-2 leading-relaxed">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )
            ) : null}
          </section>
        </Reveal>
      ))}

      {content.closing ? (
        <Reveal>
          <p className="text-gray-800 font-medium mt-10 border-t border-gray-100 pt-6 leading-relaxed">
            {content.closing}
          </p>
        </Reveal>
      ) : null}
    </article>
  );
}
