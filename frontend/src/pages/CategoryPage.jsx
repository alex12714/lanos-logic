import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Seo from '../components/seo/Seo';
import { Button } from '../components/ui/button';
import { services } from '../data/mock';
import { categories, getCategory } from '../data/categories';
import { SITE, breadcrumb, speakableWebPage } from '../lib/seo';
import { serviceIcon } from '../lib/serviceIcons';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const category = getCategory(categoryId);

  if (!category) {
    return (
      <Layout>
        <Seo
          title="Solutions Not Found | Lanos Logic"
          description="The solution category you are looking for could not be found."
          path={`/solutions/${categoryId || ''}`}
          noindex
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Category Not Found</h1>
            <Link to="/services" className="text-amber-400 hover:text-amber-300">
              Back to all services
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const items = category.services
    .map((ref) => ({ ref, service: services.find((s) => s.id === ref.id) }))
    .filter((x) => x.service);
  const others = categories.filter((c) => c.id !== category.id);
  const title = `${category.name} Solutions | Lanos Logic`;

  const jsonLd = [
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: category.name, path: category.href },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Lanos Logic ${category.name} services`,
      itemListElement: items.map(({ service }, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: service.name,
        url: `${SITE}${service.href}`,
      })),
    },
    speakableWebPage({ name: title, description: category.intro, url: category.href }),
  ];

  return (
    <Layout>
      <Seo title={title} description={category.intro} path={category.href} jsonLd={jsonLd} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a12]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All services
          </Link>
          <div className="grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${category.accent}`}>
                Solutions
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">{category.name}</h1>
              <p className="text-xl text-white/90 mb-4">{category.tagline}</p>
              <p className="page-intro text-gray-400 text-lg leading-relaxed mb-8">{category.intro}</p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full px-8 h-14 gap-2"
                asChild
              >
                <Link to="/contact">
                  Book a free consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="lg:col-span-2">
              <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
                <img
                  src={category.image}
                  alt=""
                  loading="eager"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services in this category */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">
            {category.name} services
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {items.map(({ ref, service }) => {
              const Icon = serviceIcon(ref.icon);
              return (
                <Link
                  key={service.id}
                  to={service.href}
                  className="group flex flex-col bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-3xl p-7 hover:border-amber-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {service.name}
                    </h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-5">{service.shortDescription}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-300 text-sm">
                        <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-2 text-amber-400 font-medium">
                    Learn more
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other categories */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a12]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">Explore other solutions</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {others.map((c) => (
              <Link
                key={c.id}
                to={c.href}
                className="group relative h-48 rounded-3xl overflow-hidden border border-white/10"
              >
                <img src={c.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${c.accent}`}>{c.services.length} services</p>
                  <p className="text-2xl font-bold text-white flex items-center gap-2">
                    {c.name}
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </p>
                  <p className="text-sm text-gray-300 mt-1">{c.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CategoryPage;
