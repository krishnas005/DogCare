// app/articles/[id]/page.js
"use client";

import articles from '../../../assets/article.json';

const ArticlePage = ({ params }) => {
    const { id } = params;
    const article = articles.find(article => article.id === parseInt(id));

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h1>
                    <p className="text-gray-600">The article you&apos;re looking for doesn&apos;t exist or may have been moved.</p>
                </div>
            </div>
        );
    }

    // Enhanced content renderer with proper list formatting
    const renderContent = (content) => {
        const sections = content.split('\n\n');
        let inList = false;

        return sections.map((section, index) => {
            // Handle headings
            if (section.startsWith('**') && section.endsWith('**')) {
                inList = false;
                return (
                    <h2
                        key={index}
                        id={section.replace(/\*\*/g, '').toLowerCase().replace(/ /g, '-')}
                        className="text-2xl font-semibold text-white mt-12 mb-6 pb-2 border-b border-gray-700"
                    >
                        {section.replace(/\*\*/g, '')}
                    </h2>
                );
            }

            // Handle numbered lists
            if (/^\d+\.\s/.test(section)) {
                const listItems = section.split('\n').filter(item => item.trim().length > 0);

                return (
                    <div key={index} className="my-6">
                        {listItems.map((item, itemIndex) => {
                            const [number, ...contentParts] = item.split('. ');
                            const content = contentParts.join('. ');

                            // Check for sub-items (dash lists)
                            if (content.includes('- ')) {
                                const mainPoint = content.split('- ')[0];
                                const subPoints = content.split('- ').slice(1);

                                return (
                                    <div key={itemIndex} className="mb-4 pl-6">
                                        <div className="flex">
                                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-900 text-blue-200 font-medium mr-3 mt-0.5">
                                                {number}
                                            </span>
                                            <p className="text-gray-200 font-medium">{mainPoint}</p>
                                        </div>
                                        <ul className="mt-2 pl-9 space-y-2">
                                            {subPoints.map((subPoint, subIndex) => (
                                                <li key={subIndex} className="flex items-start">
                                                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-500 mt-2.5 mr-2"></span>
                                                    <span className="text-gray-300">{subPoint}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            }

                            return (
                                <div key={itemIndex} className="flex mb-3">
                                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-900 text-blue-200 font-medium mr-3 mt-0.5">
                                        {number}
                                    </span>
                                    <p className="text-gray-200">{content}</p>
                                </div>
                            );
                        })}
                    </div>
                );
            }

            // Handle tip boxes
            if (section.includes('**Pro Tip:**') || section.includes('**Warning:**')) {
                const isWarning = section.includes('**Warning:**');
                return (
                    <div
                        key={index}
                        className={`p-5 rounded-lg my-6 ${isWarning ? 'bg-yellow-900/20 border-l-4 border-yellow-500' : 'bg-blue-900/20 border-l-4 border-blue-500'}`}
                    >
                        <div className="flex items-start">
                            <div className={`flex-shrink-0 p-1 rounded-full ${isWarning ? 'bg-yellow-500/20' : 'bg-blue-500/20'}`}>
                                <svg
                                    className={`w-5 h-5 ${isWarning ? 'text-yellow-400' : 'text-blue-400'}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className={`text-sm font-medium ${isWarning ? 'text-yellow-200' : 'text-blue-200'}`}>
                                    {isWarning ? 'Warning' : 'Pro Tip'}
                                </h3>
                                <div className="mt-1 text-sm text-gray-200">
                                    {section.replace(/\*\*(Pro Tip:|Warning:)\*\*/g, '').trim()}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

            // Handle regular paragraphs
            return (
                <p key={index} className="text-gray-300 mb-6 leading-relaxed">
                    {section}
                </p>
            );
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Article Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 mb-4">
                        {article.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-900/50 text-blue-200 text-sm rounded-full">
                                {tag}
                            </span>
                        ))}
                        <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
                            {article.read_time} read
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {article.title}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">{article.summary}</p>
                </div>

                {/* Article Content */}
                <div className="flex flex-col lg:flex-row gap-12">
                    <main className="lg:w-2/3 min-h-screen pb-10">
                        {/* Featured Image */}
                        <div className="mb-10 rounded-xl overflow-hidden shadow-2xl">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Article Body */}
                        <article className="max-w-none px-4">
                            <div className="space-y-2 text-gray-300">
                                {article.content}
                            </div>
                        </article>
                    </main>

                    {/* Sidebar */}
                    <aside className="lg:w-1/3 space-y-8">
                        {/* Author Info */}
                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium text-white">Canine Care Team</h3>
                                    {/* <p className="text-sm text-gray-400">Published on {new Date().toLocaleDateString()}</p> */}
                                </div>
                            </div>
                            <p className="text-gray-300">Our team of veterinary experts and dog trainers brings you the most reliable pet care information.</p>
                        </div>

                        {/* Table of Contents */}
                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 sticky top-8">
                            <h3 className="font-bold text-white mb-4 text-lg">Table of Contents</h3>
                            <nav>
                                <ul className="space-y-2">
                                    {article.content.split('\n\n')
                                        .filter(p => p.startsWith('**') && p.endsWith('**'))
                                        .map((heading, index) => (
                                            <li key={index}>
                                                <a
                                                    href={`#${heading.replace(/\*\*/g, '').toLowerCase().replace(/ /g, '-')}`}
                                                    className="flex items-center text-blue-300 hover:text-blue-200 text-sm transition-colors group"
                                                >
                                                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                    {heading.replace(/\*\*/g, '')}
                                                </a>
                                            </li>
                                        ))}
                                </ul>
                            </nav>
                        </div>

                        {/* Related Articles */}
                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                            <h3 className="font-bold text-white mb-4 text-lg">You Might Also Like</h3>
                            <div className="space-y-4">
                                {articles
                                    .filter(a => a.id !== article.id)
                                    .slice(0, 3)
                                    .map(related => (
                                        <a
                                            key={related.id}
                                            href={`/articles/${related.id}`}
                                            className="block group transition-transform hover:-translate-y-0.5"
                                        >
                                            <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700/50">
                                                <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                                                    <img
                                                        src={related.image}
                                                        alt={related.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-white group-hover:text-blue-300 transition-colors">
                                                        {related.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-400">{related.read_time}</p>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ArticlePage;