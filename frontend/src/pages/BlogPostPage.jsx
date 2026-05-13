import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, CheckCircle2 } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { blogPosts } from '../data/mock';

const categoryColors = {
  Security: 'bg-red-500/20 text-red-400 border-red-500/30',
  AI: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Automation: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
            <Link to="/blog" className="text-amber-400 hover:text-amber-300">Back to Blog</Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-b ${post.heroGradient || 'from-[#0a0a12]'} to-[#0a0a12]`}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
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

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-black font-bold">
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-white font-medium">{post.author}</p>
              <p className="text-gray-500 text-sm">{post.authorRole}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="relative py-8 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-3xl p-8 sm:p-12 space-y-8">
            {post.content.map((block, i) => {
              if (block.type === 'intro') {
                return (
                  <p key={i} className="text-lg text-gray-300 leading-relaxed border-l-4 border-amber-500 pl-6 py-1">
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'heading') {
                return (
                  <h2 key={i} className="text-2xl font-bold text-white pt-4">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'paragraph') {
                return (
                  <p key={i} className="text-gray-400 leading-relaxed">
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'list') {
                return (
                  <div key={i}>
                    {block.heading && (
                      <p className="text-gray-300 font-semibold mb-3">{block.heading}</p>
                    )}
                    <ul className="space-y-2">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-gray-400">
                          <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              if (block.type === 'cta') {
                return (
                  <div key={i} className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-8 text-center mt-8">
                    <p className="text-gray-300 text-lg mb-6">{block.text}</p>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full px-8 h-12 gap-2 shadow-lg shadow-amber-500/25"
                      asChild
                    >
                      <Link to={block.buttonHref}>
                        {block.buttonText}
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {post.tags.map((tag) => (
              <span key={tag} className="text-sm px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPostPage;
