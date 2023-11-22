import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";
import rasm1 from "../imagesHome/hero1.webp"
import rasm2 from "../imagesHome/hero2.webp"
import rasm3 from "../imagesHome/hero3.webp"
import rasm4 from "../imagesHome/hero4.webp"
import rasm5 from "../imagesHome/rasm5.jpg"
import rasm6 from "../imagesHome/rasm6.jpg"
import rasm7 from "../imagesHome/rasm7.jpg"
import rasm8 from "../imagesHome/rasm8.jpg"

const carouselImages = [rasm1, rasm2, rasm3, rasm4, rasm5, rasm6, rasm7, rasm8];



function Home() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios("https://strapi-store-server.onrender.com/api/products?featured=true")
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (data == null) {
    return <Loader />;
  }
  return (
    <>
      <div className="py-16 flex flex-col md:flex-row justify-between">
        <div className="md:w-1/2 flex flex-col justify-center items-start home-content">
          <h1 className="text-6xl max-w-[500px] font-bold home-title">
            We are changing the way people shop
          </h1>
          <p className="max-w-[500px] text-[18px] my-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </p>
          <Link to="/products" className="btn btn-primary">
            Our Products
          </Link>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 " >
        <div className='hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box '>
        {carouselImages.map((image) => {
          return (
            <div key={image} className='carousel-item'>
              <img
                src={image}
                className='rounded-box h-full w-80 object-cover'
              />
            </div>
          );
        })}
      </div>
        </div>
      </div>
      <div>
        <h2 className="text-5xl font-semibold">Featured Products</h2>
        <div className="divider"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 py-12 pb-[100px]">
          {data &&
            data.map((item) => {
              return (
                <Link key={item.id} to={`/product/${item.id}`} className="card bg-base-100 w-[360px] shadow-xl rounded-2xl" >
                  <figure>
                    <img
                      src={item.attributes.image}
                      alt="Shoes"
                      className="rounded-xl h-64 md:h-48 w-full object-cover"
                    />
                  </figure>
                  <div className="card-body p-4">
                    <h2 className="text-3xl font-bold text-center mt-5">
                      {item.attributes.title}
                    </h2>
                    <p className="mt-2 text text-center">
                      ${item.attributes.price / 100}
                    </p>
                    <a download={item.attributes.image} className="btn btn-primary w-1/2 mx-auto mt-1">Download</a>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
