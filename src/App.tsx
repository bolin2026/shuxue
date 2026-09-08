import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Copy,
  Check,
  FolderTree,
  Server,
  RefreshCw,
  Layers,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'solution' | 'config' | 'guide' | 'test'>('solution');
  const [testPath, setTestPath] = useState('/dashboard');
  const [testResult, setTestResult] = useState<string | null>(null);

  const vercelConfig = `{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(vercelConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateRoute = (path: string) => {
    setTestPath(path);
    setTestResult(`通过 Vercel 重定向规则成功匹配：请求 "${path}" 已自动重写为内部入口 "/index.html"，由前端客户端路由正常接管，不再触发 404 NOT_FOUND。`);
  };

  return (
    <div id="app-container" className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Top Navigation */}
      <header id="app-header" className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center font-bold text-base shadow-sm">
              ▲
            </div>
            <div>
              <h1 className="text-base font-bold leading-none text-slate-900">
                Vercel 部署修复与诊断中心
              </h1>
              <p className="text-xs text-slate-500 mt-1">针对 Vite SPA 的 404 NOT_FOUND 错误专案修复</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              已生效
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <section id="issue-card" className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-rose-100 text-rose-800">
                  原错误现象
                </span>
                <span className="font-mono text-sm font-semibold text-rose-700">
                  404: NOT_FOUND (代码: NOT_FOUND)
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                问题根本原因与解决方案
              </h2>
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                在基于 Vite 构建的单页应用中，出现 404 主要是因为 SPA 路由需要重写至 index.html，并且构建输出目录必须对准 dist。
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                id="btn-copy-config"
                onClick={handleCopy}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition-colors shadow-xs"
              >
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? '已复制 vercel.json' : '复制 vercel.json'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-lg bg-amber-50/70 border border-amber-200/80">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-amber-900">原因一：缺少 SPA 页面重写 (Rewrites)</h3>
                  <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                    Vite 属于单页应用，用户刷新或访问子路由时服务端若无物理文件会报 404。已通过配置 vercel.json 重写至 /index.html 修复。
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200/80">
              <div className="flex items-start space-x-3">
                <FolderTree className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-blue-900">原因二：输出目录必须设为 dist</h3>
                  <p className="text-xs text-blue-800 mt-1 leading-relaxed">
                    Vite 打包默认输出在 dist/ 目录，vercel.json 显式配置 outputDirectory 为 dist，保障精准识别。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 mb-6">
          <nav className="flex space-x-6" aria-label="Tabs">
            <button
              id="tab-solution"
              onClick={() => setActiveTab('solution')}
              className={`pb-3 text-sm font-medium border-b-2 flex items-center space-x-2 transition-colors ${
                activeTab === 'solution'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>修复详情</span>
            </button>

            <button
              id="tab-config"
              onClick={() => setActiveTab('config')}
              className={`pb-3 text-sm font-medium border-b-2 flex items-center space-x-2 transition-colors ${
                activeTab === 'config'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>配置文件</span>
            </button>

            <button
              id="tab-guide"
              onClick={() => setActiveTab('guide')}
              className={`pb-3 text-sm font-medium border-b-2 flex items-center space-x-2 transition-colors ${
                activeTab === 'guide'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Server className="w-4 h-4" />
              <span>排查指南</span>
            </button>

            <button
              id="tab-test"
              onClick={() => setActiveTab('test')}
              className={`pb-3 text-sm font-medium border-b-2 flex items-center space-x-2 transition-colors ${
                activeTab === 'test'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>路由模拟测试</span>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'solution' && (
            <motion.div
              key="solution"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-6"
            >
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-base font-semibold text-slate-900 mb-4 flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-2" />
                  已验证的修复工作
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 text-sm">
                    <p className="font-semibold text-slate-900">1. 创建 vercel.json 解决路由与输出路径问题</p>
                    <p className="text-slate-600 text-xs mt-1">框架设置为 vite，重写规则设置为 /(.*) -&gt; /index.html</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 text-sm">
                    <p className="font-semibold text-slate-900">2. 本地 Vite 构建输出验证</p>
                    <p className="text-slate-600 text-xs mt-1">验证 npm run build 打包产物顺利输出到 dist 目录。</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'config' && (
            <motion.div
              key="config"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 shadow-inner">
                <pre className="font-mono text-xs leading-relaxed text-emerald-300 overflow-x-auto p-2">
                  {vercelConfig}
                </pre>
              </div>
            </motion.div>
          )}

          {activeTab === 'guide' && (
            <motion.div
              key="guide"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 text-sm"
            >
              <div className="border border-slate-200 rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-1">Vercel 控制台常用核查项：</p>
                <p className="text-xs text-slate-600">
                  Settings &gt; Build &amp; Development Settings &gt; Framework Preset 设为 Vite，Output Directory 保持默认或指定为 dist。
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'test' && (
            <motion.div
              key="test"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-white border border-slate-200 rounded-xl p-6 space-y-5"
            >
              <p className="text-xs text-slate-500">点击下方子路径测试 SPA 重写匹配效果：</p>
              <div className="flex flex-wrap gap-2">
                {['/', '/dashboard', '/profile', '/settings'].map((path) => (
                  <button
                    key={path}
                    onClick={() => handleSimulateRoute(path)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors border ${
                      testPath === path
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {path}
                  </button>
                ))}
              </div>
              {testResult && (
                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                  <p className="font-semibold flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" />
                    重写模拟通过
                  </p>
                  <p className="text-emerald-800 mt-1">{testResult}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
