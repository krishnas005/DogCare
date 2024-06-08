"use client";
import Link from 'next/link';

const articles = [
    { id: 1, title: 'The Importance of Regular Vet Visits', summary: 'Learn why regular veterinary checkups are crucial for your dog’s health and wellbeing.', link: '/articles/vet-visits', image: '/vet-visits.jpg' },
    { id: 2, title: 'Top 10 Dog Training Tips', summary: 'Discover effective dog training tips to ensure a well-behaved furry friend.', link: '/articles/dog-training-tips', image: '/dog-training.jpg' },
    { id: 3, title: 'Healthy Diet for Dogs', summary: 'Understand the components of a healthy diet and how to provide balanced nutrition for your dog.', link: '/articles/healthy-diet', image: '/healthy-diet.jpg' },
];

export default function ArticleSection() {
    return (
        <div className="bg-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-white mb-6 text-center">Latest Articles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                                <p className="mt-2 text-gray-600">{article.summary}</p>
                                <div className="mt-4">
                                    <Link href={article.link} className="text-indigo-600 hover:text-indigo-900 font-medium">
                                        Read more
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <Link href="/articles" className="text-lg font-medium text-indigo-600 hover:text-indigo-900">
                        View All Articles
                    </Link>
                </div>
            </div>
        </div>
    );
}
