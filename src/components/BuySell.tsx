import Image from 'next/image';
import Link from 'next/link';

export default function BuySell() {
    return (
        <div>
            <div className="relative bg-gray-800 overflow-hidden min-h-[300px] max-h-[600px]">
                <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block">
                    <Image
                        className="ml-[120px] mt-[130px] border rounded-md"
                        src="/dogPic.jpg"
                        alt="Pet background"
                        width={400}
                        height={300}
                        quality={100}
                    />
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="relative pb-8 bg-gray-800 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 min-h-screen flex items-center">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Find Your Perfect Pet</span>{' '}
                                    <span className="block text-indigo-600 xl:inline">Buy or Sell</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Whether you are looking to adopt a new pet or find a new home for your furry friend, we have got you covered.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link href="/services/adoption/buy" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-2 md:text-lg md:px-7">
                                            Buy Pets
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <Link href="/services/adoption/sell" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-100 md:py-2 md:text-lg md:px-7">
                                            Sell Pets
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}
