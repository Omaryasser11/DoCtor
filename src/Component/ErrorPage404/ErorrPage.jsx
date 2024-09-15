import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
    return (
        <section className="bg-white dark:bg-gray-900 flex items-center justify-center" style={{ height: '100vh' }}>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 text-center">
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaEsWHLUV2d2JxGObDDe_009jxNjeTCGzISw&s' alt="Error" className="mx-auto mb-6" style={{ width: '200px', height: 'auto' }} />
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page.</p>
                <div className="flex justify-center space-x-4">
                    <a href="/" className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</a>
                    {/* Additional Button */}
                    <Link className='Btn' to={"/"}>Back To Home</Link>
 </div>
            </div>
        </section>
    );
}
