import Image from "next/image";
import client from "../../lib/sanity.client";
import Link from "next/link";
import { subString } from "@/helper";


export interface Data {
  title: string;
  description: string;
  link?: string;
  _id?: string;
  imageUrl: string;
  slug: string;
  category?: string[];
  source: string;
  galleryImage?: string[];
  _createdAt?: string;
}

async function getProjects() {
  try {

    const query = `*[_type == "project"]{
      title,
      description,
      "slug" : slug.current,
      "imageUrl": image.asset->url,
      "category" : category[]->name
    }
    `;
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    return [];
  }
}

export const revalidate = 60;

export default async function Projects() {
  const data: Data[] = await getProjects();

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          All Projects
        </h1>
      </div>

      <div className="grid gap-y-8 sm:gap-6  sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-10 pt-8">
        {data.map((project) => (
          <article
            key={project._id}
            className="overflow-hidden dark:border-zinc-600 rounded-lg border border-gray-100 bg-white shadow-lg dark:bg-black dark:shadow-gray-700 shadow-teal-100"
          >
            <div className="h-56 w-full relative">
              {project.imageUrl &&
                <Image
                  fill={true}
                  src={project.imageUrl}
                  alt="Image of the project"
                  className="w-full h-full object-cover"
                />
              }
            </div>

            <div className="p-4 sm:p-6">
              <Link href={`/projects/detail/${project.slug}`} >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {project.title}
                </h3>
              </Link>

              <p className=" line-clamp-3 mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {subString(project.description, 200)}
              </p>

              <div className="flex w-auto flex-wrap">
                {
                  project.category?.map((category) => (
                    <>
                      <div key={category} className="
                      text-xs bg-slate-200 text-slate-900 p-1 
                      rounded-md font-thin mx-0.5 my-1 mt-1
                      shadow-sm hover:bg-slate-100
                      dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-900
                      ">{category}</div>
                    </>
                  ))
                }
              </div>

              <Link
                className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-500"
                href={`/projects/detail/${project.slug}`}              >
                Learn More!
                <span className="block transition-all group-hover:ms-0.5">
                  &rarr;
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
