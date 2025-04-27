// pages/articles.js
import Link from 'next/link';
import articles from '../../assets/article.json';

const ArticlesPage = () => {
    return (
        <div className="bg-gray-800 min-h-screen p-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-blue-300 mb-8 my-6 text-center tracking-tighter">Explore latest articles</h1>
                <div className="grid grid-cols-1 gap-6">
                    {articles.map((article, index) => (
                        <div key={index} className="bg-white p-4 shadow-md rounded-lg flex">
                            <img src={article.image} alt={article.title} className="w-32 h-32 md:block object-cover hidden rounded-lg mr-4" />
                            <div>
                                <Link href={article.image}>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-2 mt-2">{article.title}</h2>
                                </Link>
                                <p className="text-gray-700">{article.summary}</p>
                                <Link href={`articles/${article.id}`} className="text-indigo-600 hover:text-indigo-900 font-medium mt-2 block">
                                  Read more
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArticlesPage;
