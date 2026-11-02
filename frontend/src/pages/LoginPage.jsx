import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Info } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Seo from '../components/seo/Seo';
import { Button } from '../components/ui/button';

// Client portal sign-in: MOCKUP. Nothing is sent anywhere - the form only
// shows a "portal not open yet" notice. Replace handleSubmit with the real
// auth call when the portal exists.
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPassword('');
    setNotice(true);
  };

  return (
    <Layout>
      <Seo
        title="Client Portal Sign In | Lanos Logic"
        description="Sign in to the Lanos Logic client portal."
        path="/login"
        noindex
      />
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a12]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/favicon.ico" alt="" className="w-12 h-12 mx-auto mb-4 rounded-xl" />
            <h1 className="text-3xl font-bold text-white">Client Portal</h1>
            <p className="text-gray-400 mt-2">Sign in to see your projects, reports, and invoices.</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-3xl p-7 sm:p-8 space-y-5 shadow-2xl shadow-black/40"
          >
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="login-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#0f0f1e] border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-300">Password</label>
                <button
                  type="button"
                  onClick={() => setNotice(true)}
                  className="text-xs text-amber-400 hover:text-amber-300"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="login-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#0f0f1e] border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 transition"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full gap-2"
            >
              Sign in
              <ArrowRight className="w-4 h-4" />
            </Button>

            {notice && (
              <div role="status" className="flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-gray-200">
                <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p>
                  The client portal is not open yet. For project updates, email{' '}
                  <a href="mailto:hello@lanos-logic.com" className="text-amber-400 hover:text-amber-300">hello@lanos-logic.com</a>{' '}
                  or <Link to="/contact" className="text-amber-400 hover:text-amber-300">contact us</Link>.
                </p>
              </div>
            )}
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Not a client yet?{' '}
            <Link to="/contact" className="text-amber-400 hover:text-amber-300 font-medium">Book a free consultation</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
