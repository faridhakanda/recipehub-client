import { getNewDetailsByID } from "@/lib/data";
import React from "react";
import Image from "next/image";
import { FaEye, FaStar } from "react-icons/fa";
import { CiBookmark, CiShare1 } from "react-icons/ci";
import Link from "next/link";



export const generateMetadata = async({ params }) => {
    //console.log(params, "params detail page!");
    const { id } = await params;
    //console.log(params, "Farid news details page!");
    //console.log("news id: ", id);
    const news = await getNewDetailsByID(id);
    //console.log(news, "Farid Akanda");
    return {
        title: news.title,
        description: news.details
    };
};


const NewsDetailsPage = async ({ params }) => {
  //console.log(params, "params for news details!");
  const { id } = await params;
  //console.log(id, "params farid");

  const news = await getNewDetailsByID(id);
  
  return (
    <div className="my-8">
      
      
        <div
          
          className="card bg-base-100 w-2/4 mx-auto  shadow-sm my-4 px-2"
        >
          <div className="card-body">
            <div className="flex bg-slate-200 p-2 rounded-md justify-between gap-2 items-center">
              <div className="flex items-center gap-1">
                <Image
                  className="rounded-full"
                  src={news.author?.img}
                  alt={news.author}
                  width={40}
                  height={40}
                />
                <div>
                  <h2 className="font-semibold">{news.author?.name}</h2>
                  <p className="text-xs">{news.author?.published_date}</p>
                </div>
              </div>

              <div className="flex gap-1">
                <CiShare1 />
                <CiBookmark />
              </div>
            </div>
            <h2 className="card-title">{news.title}</h2>
            <figure>
              <Image
                className="w-full"
                src={news.image_url}
                alt={news.title}
                width="400"
                height="400"
              />
            </figure>

            <p className="">{news.details}</p>

            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <p className="flex gap-1 items-center">
                  <span className="text-yellow-300">
                    <FaStar />
                  </span>
                  {news.rating.number}
                </p>
                <p className="flex gap-1 items-center">
                  <FaEye />
                  {news.total_view}
                </p>
              </div>
              <button className="btn btn-primary">
                <Link href={`/category/${news.category_id}`}>See all Category News</Link>
              </button>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default NewsDetailsPage;
