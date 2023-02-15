import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {Autoplay} from "swiper";
import Title from "../Title/Title";
import Card from "../Card/Card";


const ProductsFilter = ({title,products}) => {

    return (
        <div className="products__filter">
            <Title title={title}/>
            <div className="products__filter-sliders">
                <Swiper
                    slidesPerView={3.5}
                    spaceBetween={30}
                    autoplay={{
                        delay: 3000
                    }}
                    speed={3000}
                    modules={[Autoplay]}
                    loop={true}
                    className="mySwiper"

                >

                    {
                        products.map(item => (
                            <SwiperSlide key={item.id} className="products__slider">
                                <Card item={item}/>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>
        </div>
    );
};

export default ProductsFilter;