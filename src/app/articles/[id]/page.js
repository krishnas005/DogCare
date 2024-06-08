// pages/articles/[id].js
"use client";

import { useRouter } from 'next/navigation';
import articles from '../../../assets/article.json';

const ArticlePage = () => {
    
    const router = useRouter();
    const id = router.query.id;
    const article = articles.find(article => article.id === parseInt(id));

    if (!article) {
        return <p>Article not found</p>;
    }

    return (
        <div className="bg-gray-800 min-h-screen p-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
                    <div className="md:w-3/5">
                        <h1 className="text-3xl font-bold text-white mb-8">{article.title}</h1>
                        <img src={article.image} alt={article.title} className="w-full h-auto mb-6 rounded-lg" />
                        <p className="text-gray-300 mb-4">{article.content}</p>
                    </div>
                    <div className="md:w-2/5 md:ml-8">
                        {/* Optional: Add additional content or related articles section */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticlePage;
