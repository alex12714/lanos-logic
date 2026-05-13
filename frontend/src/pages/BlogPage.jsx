import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { blogPosts } from '../data/mock';

const categoryColors = {
  Security: 'bg-red-500/20 text-red-400 border-red-500/30',
  AI: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Automation: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const BlogPage = () => {
  return (
    <Layout>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a12]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Lanos Logic <span className="text-amber-400">Blog</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Insights on AI automation, enterprise security, and the technology
            shaping modern business operations.
          </p>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group block bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-3xl p-8 hover:border-amber-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/5"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${categoryColors[post.category] || 'bg-amber-500/20 text-amber-400 border-amber-500/30'}`}>
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6">{post.summary}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-black font-bold text-sm">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{post.author}</p>
                      <p className="text-gray-500 text-xs">{post.authorRole}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium group-hover:text-amber-300 transition-colors">
                    Read article
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
