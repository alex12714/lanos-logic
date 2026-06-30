import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, MapPin, Clock, Layers } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Seo from '../components/seo/Seo';
import FaqSection from '../components/common/FaqSection';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { allCaseStudies } from '../data/caseStudiesData';
import { SITE, ORG, breadcrumb, youTubeVideoObject, SPEAKABLE } from '../lib/seo';
import { getCaseStudyFaqs } from '../data/faqData';

const CaseStudyDetailPage = () => {
  const { caseStudyId } = useParams();
  const caseStudy = allCaseStudies.find((cs) => cs.id === caseStudyId);

  if (!caseStudy) {
    return (
      <Layout>
        <Seo
          title="Case Study Not Found | Lanos Logic"
          description="The case study you are looking for doesn't exist or has been removed."
          path={`/case-studies/${caseStudyId || ''}`}
          noindex
        />
        <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Case Study Not Found</h1>
            <p className="text-gray-400 mb-8">
              The case study you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/case-studies">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const relatedStudies = allCaseStudies
    .filter((cs) => cs.id !== caseStudy.id && cs.category === caseStudy.category)
    .slice(0, 3);

  if (relatedStudies.length < 3) {
    const remaining = allCaseStudies
      .filter((cs) => cs.id !== caseStudy.id && !relatedStudies.some((r) => r.id === cs.id))
      .slice(0, 3 - relatedStudies.length);
    relatedStudies.push(...remaining);
  }

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling?.classList.remove('hidden');
  };

  const metaDescription =
    caseStudy.description.length > 160
      ? `${caseStudy.description.slice(0, 157)}...`
      : caseStudy.description;

  const faqs = getCaseStudyFaqs(caseStudy);

  // VideoObject schema for any embedded YouTube videos in the case study body.
  // Only YouTube videos are included (thumbnail can be sourced honestly from
  // YouTube); Loom embeds are skipped. uploadDate is omitted (not sourceable).
  const videoObjects = Array.isArray(caseStudy.fullContent)
    ? caseStudy.fullContent
        .filter((section) => section.type === 'video' && section.url)
        .map((section) =>
          youTubeVideoObject(section.url, {
            name: `${caseStudy.title} — project walkthrough`,
            description: caseStudy.description,
          })
        )
        .filter(Boolean)
    : [];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: caseStudy.title,
      description: caseStudy.description,
      ...(caseStudy.id ? { image: `${SITE}/case-studies/${caseStudy.id}.jpg` } : {}),
      articleSection: caseStudy.category,
      author: {
        '@type': 'Person',
        name: 'Alex Podbrezsky',
        jobTitle: 'Founder & AI Solutions Architect',
        worksFor: { '@type': 'Organization', name: 'Lanos Logic' },
      },
      publisher: ORG,
      ...(caseStudy.year ? { datePublished: String(caseStudy.year) } : {}),
      mainEntityOfPage: `${SITE}/case-studies/${caseStudy.id}`,
      url: `${SITE}/case-studies/${caseStudy.id}`,
      speakable: SPEAKABLE,
    },
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Case Studies', path: '/case-studies' },
      { name: caseStudy.title, path: `/case-studies/${caseStudy.id}` },
    ]),
    ...videoObjects,
  ];

  return (
    <Layout>
      <Seo
        title={`${caseStudy.title} | Lanos Logic Case Study`}
        description={metaDescription}
        path={`/case-studies/${caseStudy.id}`}
        type="article"
        jsonLd={jsonLd}
      />
      <div className="min-h-screen bg-[#0a0a12]">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/case-studies"
              className="inline-flex items-center text-gray-400 hover:text-amber-400 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Case Studies
            </Link>

            <Badge className="bg-amber-400/10 text-amber-400 border-amber-400/20 hover:bg-amber-400/20 mb-4">
              {caseStudy.category}
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {caseStudy.title}
            </h1>

            <p className="page-intro text-gray-400 text-lg max-w-3xl mb-10">
              {caseStudy.description}
            </p>

            {/* Stats Row */}
            {caseStudy.stats && caseStudy.stats.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {caseStudy.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-[#1a1a2e] border border-white/5 rounded-xl p-6 text-center"
                  >
                    <div className="text-3xl font-bold text-amber-400 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Meta Info Row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              {caseStudy.country && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>
                    {caseStudy.countryFlag && `${caseStudy.countryFlag} `}
                    {caseStudy.country}
                  </span>
                </div>
              )}
              {caseStudy.year && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{caseStudy.year}</span>
                </div>
              )}
              {caseStudy.daysToComplete && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{caseStudy.daysToComplete} days</span>
                </div>
              )}
              {caseStudy.type && (
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <Badge
                    variant="outline"
                    className="border-amber-400/30 text-amber-400 text-xs"
                  >
                    {caseStudy.type}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Hero cover — photo used as a subtle textured hint behind brand
            gradients, so it reads as an intentional cover, not a stock photo. */}
        <section className="pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative w-full h-[260px] sm:h-[380px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1a1a2e] to-[#16162a]">
              <img
                src={`/case-studies/${caseStudy.id}.jpg`}
                alt={caseStudy.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Gradient hints — darken toward the page + a soft brand tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/40 to-[#0a0a12]/10" />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-transparent to-purple-600/20" />
              {/* Category chip in the corner */}
              {caseStudy.category && (
                <div className="absolute bottom-6 left-6">
                  <span className="inline-flex items-center rounded-full bg-[#0a0a12]/70 backdrop-blur-md border border-amber-500/30 px-4 py-1.5 text-sm font-medium text-amber-300">
                    {caseStudy.category}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column - Rich Content */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-white mb-8">Project Overview</h2>

                {/* Rich content from Notion export */}
                {caseStudy.fullContent && caseStudy.fullContent.length > 0 ? (
                  <div className="space-y-4">
                    {caseStudy.fullContent.map((section, idx) => {
                      if (section.type === 'heading') {
                        const HeadingTag = section.level === 'h1' ? 'h2' : section.level === 'h2' ? 'h3' : 'h4';
                        const sizes = { h2: 'text-2xl', h3: 'text-xl', h4: 'text-lg' };
                        return (
                          <HeadingTag
                            key={idx}
                            className={`${sizes[HeadingTag] || 'text-lg'} font-bold text-white mt-8 mb-3`}
                          >
                            {section.content}
                          </HeadingTag>
                        );
                      }
                      if (section.type === 'text') {
                        return (
                          <p key={idx} className="text-gray-400 leading-relaxed">
                            {section.content}
                          </p>
                        );
                      }
                      if (section.type === 'list_item') {
                        return (
                          <div key={idx} className="flex items-start gap-3 pl-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2.5 flex-shrink-0" />
                            <p className="text-gray-400 leading-relaxed">{section.content}</p>
                          </div>
                        );
                      }
                      if (section.type === 'image') {
                        return (
                          <div key={idx} className="my-6">
                            <a href={section.src} target="_blank" rel="noopener noreferrer" className="block group">
                              <img
                                src={section.src}
                                alt={`${caseStudy.title} screenshot`}
                                className="w-full rounded-xl border border-white/5 transition-transform duration-300 group-hover:scale-[1.01]"
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            </a>
                          </div>
                        );
                      }
                      if (section.type === 'video') {
                        const youtubeMatch = section.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
                        const loomMatch = section.url.match(/loom\.com\/(?:share|embed)\/([a-f0-9]+)/);
                        if (youtubeMatch) {
                          return (
                            <div key={idx} className="my-6 aspect-video rounded-xl overflow-hidden border border-white/5">
                              <iframe
                                src={`https://www.youtube.com/embed/${youtubeMatch[1]}`}
                                title="Project Video"
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          );
                        }
                        if (loomMatch) {
                          return (
                            <div key={idx} className="my-6 aspect-video rounded-xl overflow-hidden border border-white/5">
                              <iframe
                                src={`https://www.loom.com/embed/${loomMatch[1]}`}
                                title="Project Video"
                                className="w-full h-full"
                                allowFullScreen
                              />
                            </div>
                          );
                        }
                        return (
                          <a
                            key={idx}
                            href={section.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block my-4 text-amber-400 hover:text-amber-300 underline"
                          >
                            Watch project video
                          </a>
                        );
                      }
                      return null;
                    })}
                  </div>
                ) : (
                  <p className="text-gray-400 leading-relaxed text-base">
                    {caseStudy.description}
                  </p>
                )}

                {/* Image Gallery */}
                {caseStudy.gallery && caseStudy.gallery.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-xl font-bold text-white mb-6">Project Screenshots</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {caseStudy.gallery.map((img, index) => (
                        <a
                          key={index}
                          href={img}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative group rounded-xl overflow-hidden border border-white/5"
                        >
                          <img
                            src={img}
                            alt={`Screenshot ${index + 1}`}
                            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                            <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {caseStudy.projectUrl && (
                  <a
                    href={caseStudy.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-8"
                  >
                    <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                      Visit Project
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                )}
              </div>

              {/* Right Column */}
              <div className="lg:col-span-1 space-y-6">
                {/* Project Details Card */}
                <div className="bg-[#1a1a2e] border border-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Project Details</h3>
                  <div className="space-y-4">
                    {caseStudy.country && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Client Location</span>
                        <span className="text-white text-sm">
                          {caseStudy.countryFlag && `${caseStudy.countryFlag} `}
                          {caseStudy.country}
                        </span>
                      </div>
                    )}
                    {caseStudy.daysToComplete && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Duration</span>
                        <span className="text-white text-sm">{caseStudy.daysToComplete} days</span>
                      </div>
                    )}
                    {caseStudy.year && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Year</span>
                        <span className="text-white text-sm">{caseStudy.year}</span>
                      </div>
                    )}
                    {caseStudy.monthlyHoursSaved && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Hours Saved</span>
                        <span className="text-amber-400 text-sm font-medium">
                          {caseStudy.monthlyHoursSaved}/month
                        </span>
                      </div>
                    )}
                    {caseStudy.type && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Type</span>
                        <Badge className="bg-amber-400/10 text-amber-400 border-amber-400/20 text-xs">
                          {caseStudy.type}
                        </Badge>
                      </div>
                    )}
                    {caseStudy.methodologies && (
                      <div>
                        <span className="text-gray-400 text-sm block mb-2">Methodologies</span>
                        <div className="flex flex-wrap gap-2">
                          {(Array.isArray(caseStudy.methodologies) ? caseStudy.methodologies : caseStudy.methodologies.split(', ')).map((method, index) => (
                            <span
                              key={index}
                              className="text-xs text-gray-300 bg-white/5 rounded-md px-2 py-1"
                            >
                              {method}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Technology Stack Card */}
                {caseStudy.platforms && caseStudy.platforms.length > 0 && (
                  <div className="bg-[#1a1a2e] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Technology Stack</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {caseStudy.platforms.map((platform, index) => (
                        <div
                          key={index}
                          className="bg-white/5 rounded-lg px-3 py-2 text-center text-sm text-gray-300"
                        >
                          {platform}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Processes Card */}
                {caseStudy.process && caseStudy.process.length > 0 && (
                  <div className="bg-[#1a1a2e] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Processes</h3>
                    <ul className="space-y-2">
                      {caseStudy.process.map((process, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-gray-300 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                          {process}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FaqSection
          faqs={faqs}
          subheading={`Common questions about the ${caseStudy.title} project.`}
        />

        {/* Related Case Studies */}
        {relatedStudies.length > 0 && (
          <section className="py-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white mb-10">More Case Studies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedStudies.map((study) => (
                  <Link
                    key={study.id}
                    to={`/case-studies/${study.id}`}
                    className="group bg-[#1a1a2e] border border-white/5 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {study.image ? (
                        <>
                          <img
                            src={`/case-studies/${study.id}.jpg`}
                            alt={study.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={handleImageError}
                          />
                          <div className="hidden w-full h-full bg-gradient-to-br from-amber-400/20 via-[#1a1a2e] to-[#0a0a12]" />
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-amber-400/20 via-[#1a1a2e] to-[#0a0a12]" />
                      )}
                    </div>
                    <div className="p-6">
                      <Badge className="bg-amber-400/10 text-amber-400 border-amber-400/20 hover:bg-amber-400/20 text-xs mb-3">
                        {study.category}
                      </Badge>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                        {study.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {study.description}
                      </p>
                      <div className="flex items-center text-amber-400 text-sm font-medium mt-4">
                        View Case Study
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Let's discuss how we can help you achieve similar results for your organization.
            </p>
            <Link to="/contact">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-3 text-lg">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CaseStudyDetailPage;
