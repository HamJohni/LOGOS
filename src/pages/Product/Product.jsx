import React, {useContext, useEffect, useState} from 'react';
import axios from "../../utils/axios";
import {useNavigate, useParams} from "react-router-dom";
import MenuList from "../Home/AllProducts/MenuList/MenuList";
import {BsChevronLeft} from 'react-icons/bs'
import {RiShoppingCartLine} from "react-icons/ri";
import Map from "../Home/Map/Map";
import Title from "../../components/Title/Title";
import {CustomContext} from "../../utils/context";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper";
import Card from "../../components/Card/Card";


const Product = () => {

    const [product,setProduct] = useState({})

    const {products} = useContext(CustomContext)

    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        axios(`/products/${id}`)
            .then(({data}) => setProduct(data))
            .catch((err) => console.log(err, "Ошибка при получении продукта"))
    },[])


    if(JSON.stringify(product) === '{}'){
        return(
            <h2>Продукт не найден</h2>
        )
    }

    return (
            <section className="product">
                <MenuList/>
                <div className="container">
                    <h2 onClick={() => navigate(-1)} className="product__back">
                        <BsChevronLeft className="product__back-left"/>
                        Вернуться назад
                    </h2>

                    <div className="product__block">
                        <div className="product__block-left">
                            <img className="product__block-img" src={product.image} alt={product.title}/>
                        </div>

                        <div className="product__block-right">

                            <div className="product__block-el">
                                <h2 className="product__block-title">
                                    {product.title}
                                </h2>

                                <p className="product__block-desc">
                                    {product.description}
                                </p>
                            </div>

                            <div className="product__block-info">
                                <p className="product__block-weight">
                                   Вес: {product.weight} г
                                </p>

                                <div className="product__block-sale">
                                    <button className="products__card-btn header__btn">
                                        В корзину
                                        <span>
                                        <RiShoppingCartLine size={20}/>
                                    </span>
                                    </button>

                                    <p className="product__block-price">
                                        {product.price} ₽
                                    </p>
                                </div>

                                <table className="product__block-nutrition">
                                    <tr className="product__block-tr">
                                        <td className="product__block-td">{product.cal}</td>
                                        <td className="product__block-td">{product.protein}</td>
                                        <td className="product__block-td">{product.fats}</td>
                                        <td className="product__block-td">{product.carbs}</td>
                                        <td className="product__block-td">{product.weight} г</td>
                                    </tr>

                                    <hr/>

                                    <tr className="product__block-tr">
                                        <td className="product__block-td">Ккал</td>
                                        <td className="product__block-td">Белки</td>
                                        <td className="product__block-td">Жиры</td>
                                        <td className="product__block-td">Ккал</td>
                                        <td className="product__block-td">Вес</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <hr style={{opacity: ".3"}}/>

                <Title title="С ЭТИМ ТОВАРОМ ПОКУПАЮТ"/>

                <div className="products__filter">
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

                <Map/>
            </section>
    );
};

export default Product;