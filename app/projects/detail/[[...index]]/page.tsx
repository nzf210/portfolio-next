"use client"
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import client from "../../../../lib/sanity.client";
import { Data } from '../../page';
import Image from 'next/image';
import back from '../../../../public/back-arrow.svg';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Detail = () => {
    const params = useParams();
    const { index } = params;
    const [project, setProject] = useState<Data>();
    const slug = index[0];
    const router = useRouter();
    useEffect(() => {
        async function getProjects() {
            const query = `
            *[_type == "project" && slug.current == $slug ]{
                title,
                description,
                link,
                _id,
                "slug" : slug.current,
                "imageUrl": image.asset->url,
                "category" : category[]->name,
                source,
                "galleryImage": gallery[].asset->url,
                _createdAt
            }`;
            const qparams = {
                slug
            }
            const data = await client.fetch(query, qparams);
            if (data.length === 0) {
                router.push('/projects');
            }

            let newData;
            if (data.length > 0) {
                newData = data.map((item: Data) => {
                    if (item.galleryImage) {
                        item.galleryImage.push(item.imageUrl);
                    } else {
                        item.galleryImage = [item.imageUrl];
                    }
                    return item;
                });
            }


            setProject(newData[0]);
        }

        let timeout = setTimeout(() => {
            getProjects();
        }, 50)

        return () => {
            if (timeout !== undefined) {
                clearTimeout(timeout);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project?.slug])

    if (project === undefined || project === null) {
        return <></>;
    }

    return (
        <div className='mt-5 mb-10'>
            <Link href={"/projects"} className='flex flex-row'>
                <Image src={back} width={30} height={30} alt='back' style={{ fill: 'teal' }} className='text-teal bg-teal-100 dark:bg-teal-400 rounded-md' />
                <p className='mt-0.5 ml-2 text-teal-950 dark:text-teal-50'>To projects</p>
            </Link>
            <div className='mt-5'>
                <h2 className='text-center font-semibold'>{project?.title}</h2>
                {(project?.galleryImage && project.galleryImage.length === 1) && <div className='w-96 h-96 mx-auto rounded-sm border border-teal-200 p-0 mt-5 shadow-xl dark:shadow-teal-100 flex items-center'>
                    <Image
                        src={project?.imageUrl}
                        alt={`Image of ${project?.slug}`}
                        className="w-80 h-80 mx-auto"
                        width={384}
                        height={384}
                    />
                </div>}
                {
                    (project?.galleryImage && project.galleryImage.length > 1) &&
                    <Swipe images={project.galleryImage} />
                }
                <div className='w-[320px] md:w-[480px] lg:w-[680px] mx-auto mt-5'>
                    <p>{project?.description}</p>
                </div>
                <div className='w-[320px] md:w-[480px] lg:w-[680px] mx-auto mt-5'>
                    <a href={project?.link} target='_blank'><h2 className='font-semibold text-sm'>{'Link : '}</h2>{project?.link ?? ''}</a>
                </div>
                <div className='w-[320px] md:w-[480px] lg:w-[680px] mx-auto mt-5'>
                    <a href={`${project?.source}`} target="_blank"><h2 className='font-semibold text-sm'>{'Source : '}</h2> {project?.source ?? ''}</a>
                </div>

                <div className='w-[320px] md:w-[480px] lg:w-[680px] mx-auto mt-5'>
                    <h2 className='font-semibold text-sm'>{'Technical stack : '}</h2>
                    <div className='flex flex-wrap'>
                        {
                            project?.category?.map((item, index) =>
                            (<p key={'tectstack-' + index.toString()} className="
                            text-xs bg-slate-200 text-black font-semibold p-1 
                            rounded-md mx-0.5 my-1 mt-1
                            shadow-sm hover:bg-slate-100
                            dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900                            
                            ">
                                {item}
                            </p>)
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Detail;


const Swipe: React.FC<{ images: string[] }> = ({ images }) => {
    return (
        <div
            className='w-[320px] md:w-[480px] lg:w-[680px] 
            h-auto
            mx-auto rounded-sm border border-teal-200 p-0 mt-5 
            shadow-xl dark:shadow-teal-100 flex'
        >
            <Carousel
                showArrows={true}
                showIndicators={true}
                infiniteLoop={true}
                dynamicHeight={false}
                showThumbs={true}
                autoPlay={true}
                className='mx-auto bg-slate-500 h-52 md:h-80 lg:h-[450px]'
            >
                {
                    images.map((image, index) => (
                        <React.Fragment key={`image-${index.toString()}`}>
                            <div key={`image-${index.toString()}`} className='h-52  md:h-80 lg:h-[450px]'>
                                <Image src={image} width={640} height={640} alt={image.slice(0, 7)} />
                                <p className="legend hover:bg-opacity-20">img {index + 1}</p>
                            </div>
                        </React.Fragment>
                    ))
                }
            </Carousel>
        </div>

    );
};