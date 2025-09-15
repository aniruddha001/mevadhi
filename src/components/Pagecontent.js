import React from 'react'
import useFetch from '../hooks/useFetch'

const Pagecontent = () => {

    const { data: pages, loading, error } = useFetch('/api/pages', 'pages');

    return (
        <>
            <div className='bg-gray-100 py-8'>
                <div className="max-w-7xl mx-auto px-4">
                    <section className="md:col-span-3">
                        {
                            pages.map((page) => (
                                <div key={page.id}>
                                    <h2>{page.title.rendered}</h2>
                                    <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
                                </div>
                            ))
                        }
                    </section>
                </div>
            </div>
        </>
    )
}

export default Pagecontent