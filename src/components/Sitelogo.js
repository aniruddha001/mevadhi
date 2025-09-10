import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

const Sitelogo = () => {
    return (
        <div className="flex-shrink-0 text-2xl font-bold">
            <Link href='/'>
                <Image src='/Logo.png' alt='Mevadhi' width={150} height={40} />
            </Link>
        </div>
    )
}

export default Sitelogo