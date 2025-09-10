import React from 'react'
import Image from 'next/image'

const Sitelogo = () => {
    return (
        <div className="flex-shrink-0 text-2xl font-bold">
            <a href='/'>
                <img src='Logo.png' alt='Mevadhi' width={150} height={40} />
            </a>
        </div>
    )
}

export default Sitelogo