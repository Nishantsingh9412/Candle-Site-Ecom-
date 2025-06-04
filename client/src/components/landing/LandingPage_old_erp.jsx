import React, { useState, useEffect } from 'react';
import { Star, Users, BookOpen, GraduationCap, BarChart3, Calendar, UserCheck, Award, Sparkles, Zap, ArrowRight, Globe, Shield, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  
  const navigate = useNavigate();
  

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login')
  };

  const handleStartTrial = () => {
    navigate("/free-trial")
  };

  const FloatingElement = ({ children, delay = 0, className = "" }) => (
    <div 
      className={`animate-pulse ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '3s',
        animationIterationCount: 'infinite'
      }}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-pink-300 rounded-full animate-ping opacity-35" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Header */}
      <header className={`backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-50 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                College ERP
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {['Home', 'Features', 'Solutions', 'Pricing', 'Resources', 'Support'].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="text-white/80 hover:text-white transition-all duration-300 relative group font-medium"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogin}
                className="hidden sm:block text-white/80 hover:text-white transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-white/10"
              >
                Login
              </button>
              <button
                onClick={handleSignup}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 lg:py-32 relative">
        <div className={`text-center max-w-6xl mx-auto transition-all duration-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          {/* Floating Badge */}
          <div className="flex items-center justify-center mb-8">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-6 py-3 flex items-center space-x-3 hover:bg-white/15 transition-all duration-300 group">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" />
                <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: '0.5s' }} />
                <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: '1s' }} />
                <span className="text-white/90 text-sm font-medium ml-2">Trusted by 500+ Institutions</span>
              </div>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white/20 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-white/20 group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: '0.1s' }}></div>
                <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-2 border-white/20 group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: '0.2s' }}></div>
                <div className="w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-2 border-white/20 group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: '0.3s' }}></div>
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Streamline Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Institution with
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent relative">
              College ERP SaaS
              <FloatingElement className="absolute -top-4 -right-8 text-purple-400" delay={0}>
                <Sparkles className="w-8 h-8" />
              </FloatingElement>
              <FloatingElement className="absolute -bottom-2 -left-6 text-pink-400" delay={1}>
                <Zap className="w-6 h-6" />
              </FloatingElement>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            Experience the{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
              future of education management
            </span>
            {' '}with our AI-powered platform. Streamline operations, enhance collaboration, 
            and unlock real-time insights that drive institutional excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button
              onClick={handleStartTrial}
              className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 flex items-center space-x-3"
            >
              <span>Start Your Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="group backdrop-blur-xl bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-3">
              <span>Watch Demo</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </button>
          </div>

          {/* Dashboard Preview */}
          <div className="relative max-w-7xl mx-auto perspective-1000">
            <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-700 group">
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-white text-lg">College ERP Dashboard</span>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-white/80">Welcome, Dean Julia</span>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full border-2 border-white/20"></div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {[
                    { label: 'Total Students', value: '2,450', icon: Users, color: 'from-blue-400 to-blue-600', trend: '+12%' },
                    { label: 'Faculty Members', value: '180', icon: UserCheck, color: 'from-green-400 to-green-600', trend: '+5%' },
                    { label: 'Active Courses', value: '45', icon: BookOpen, color: 'from-purple-400 to-purple-600', trend: '+8%' },
                    { label: 'Departments', value: '12', icon: Award, color: 'from-pink-400 to-pink-600', trend: '+2%' }
                  ].map((stat, index) => (
                    <div key={index} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 group hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex items-center space-x-1 text-green-400 text-sm">
                          <TrendingUp className="w-3 h-3" />
                          <span>{stat.trend}</span>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-white/60 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Dashboard Tables with Glassmorphism */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-bold text-white text-lg mb-4 flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                      <span>Recent Enrollments</span>
                    </h3>
                    <div className="space-y-3">
                      {[
                        { dept: 'Computer Science', count: '+23', color: 'bg-blue-500' },
                        { dept: 'Business Admin', count: '+18', color: 'bg-green-500' },
                        { dept: 'Engineering', count: '+15', color: 'bg-purple-500' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 backdrop-blur-xl bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                            <span className="text-white/90">{item.dept}</span>
                          </div>
                          <span className="text-green-400 font-semibold group-hover:scale-110 transition-transform duration-300">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-bold text-white text-lg mb-4 flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span>Quick Actions</span>
                    </h3>
                    <div className="space-y-3">
                      {[
                        { action: 'Student Registration', status: 'Active', color: 'bg-green-500' },
                        { action: 'Grade Submission', status: 'Open', color: 'bg-blue-500' },
                        { action: 'Course Scheduling', status: 'Available', color: 'bg-purple-500' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 backdrop-blur-xl bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 ${item.color} rounded-full animate-pulse`}></div>
                            <span className="text-white/90">{item.action}</span>
                          </div>
                          <span className="text-white/60 group-hover:text-white transition-colors duration-300">{item.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements Around Dashboard */}
            <FloatingElement className="absolute -top-6 -left-6 text-purple-400" delay={0}>
              <div className="w-12 h-12 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
            </FloatingElement>
            <FloatingElement className="absolute -top-6 -right-6 text-pink-400" delay={1}>
              <div className="w-12 h-12 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
            </FloatingElement>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="backdrop-blur-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-y border-white/10 py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-white text-2xl font-bold mb-12 flex items-center justify-center space-x-3">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span>More than 500+ institutions use College ERP</span>
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              { name: 'Harvard University', icon: BookOpen },
              { name: 'MIT', icon: GraduationCap },
              { name: 'Stanford', icon: Award },
              { name: 'Berkeley', icon: BarChart3 },
              { name: 'Yale', icon: Users }
            ].map((institution, index) => (
              <div key={index} className="flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-300 group">
                <div className="w-10 h-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <institution.icon className="w-5 h-5" />
                </div>
                <span className="font-semibold">{institution.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="backdrop-blur-xl bg-black/20 border-t border-white/10 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                College ERP
              </span>
            </div>
            <p className="text-white/60 mb-8 text-lg">
              Empowering educational institutions with next-generation ERP solutions
            </p>
            <div className="flex justify-center space-x-8 mb-8">
              {['Privacy Policy', 'Terms of Service', 'Contact Us', 'Documentation'].map((link) => (
                <a key={link} href="#" className="text-white/60 hover:text-white transition-colors duration-300">
                  {link}
                </a>
              ))}
            </div>
            <p className="text-white/40">
              &copy; {new Date().getFullYear()} College ERP. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;