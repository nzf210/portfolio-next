import React, { Suspense } from 'react';
import Image from 'next/image';
import client from '@/lib/sanity.client';

async function getProjects() {
    try {
        const query = `*[_type == "logo"] {
                "logos" : gallery[].asset->url
            }`;
        const data = await client.fetch(query);
        return data;
    } catch (error) {
        return [];
    }
}
async function TechStack({ data }: any) {
    return (
        <section className="bg-white dark:bg-gray-950">
            <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
                <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl">Tech stack</h2>
                <div className="grid grid-cols-4 gap-8 text-gray-500 sm:gap-6 md:grid-cols-6 lg:grid-cols-12 dark:text-gray-400">
                    <Suspense>
                        {
                            data.map((img: any, index: number) => (
                                <React.Fragment key={`${index.toString()}`}>
                                    <Image src={img} alt='img' width={50} height={50} />
                                </React.Fragment>
                            ))
                        }
                    </Suspense>
                </div>
            </div>
        </section>
    )
}

export default TechStack;
// className="flex justify-center items-center"