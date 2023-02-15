import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {BsChevronLeft} from 'react-icons/bs'
import Title from "../../components/Title/Title";
import {CustomContext} from "../../utils/context";
import {TbPlus} from "react-icons/tb";
import {TbMinus} from "react-icons/tb";
import {ImCross} from "react-icons/im"


const Basket = () => {


    const navigate = useNavigate()

    const {basket,delOneBasket,plusOneBasket, minusOneBasket,setModal} = useContext(CustomContext)

    if(basket.length === 0){
        navigate('/')
        // setModal(true)
    }

    return (
        <section className="basket">
            <div className="container">
                <p className="basket__back" onClick={() => navigate('/')}>
                    <BsChevronLeft/>
                    к выбору блюда
                </p>
                <div className="basket__title">
                    <Title title="Корзина"/>
                    <p className="basket__count">
                        в корзине {basket.length} товара
                    </p>
                </div>

                <div className="basket__items">
                    {
                        basket.map((item,idx) => (
                            <div className="basket__item" style={{borderBottom: idx === basket.length-1 ? 'none'  :'1px solid #FFFFFF80'}}>
                                <img className="basket__item-img" src={item.image} alt={item.title}/>

                                <div className="basket__item-info">
                                    <h2 className="basket__item-title">{item.title}</h2>
                                    <p className="basket__item-desc">{item.description}</p>
                                </div>

                                <div className="basket__item-btns">
                                    <button className="basket__item-btn" onClick={() => minusOneBasket(item.id) } ><TbMinus size={25} /></button>
                                    <p className="basket__item-count">{item.count}</p>
                                    <button className="basket__item-btn" onClick={() => plusOneBasket(item.id) } ><TbPlus size={25} /></button>
                                </div>

                                <p className="basket__item-price">{item.price} ₽</p>

                                <button className="basket__item-btn" onClick={() => delOneBasket(item.id)} ><ImCross/></button>
                            </div>
                        ))
                    }
                </div>

                <div className="basket__suggest">
                    <h2 className="basket__suggest-subtitle">ДОБАВИТЬ К ЗАКАЗУ</h2>
                    <div className="basket__suggest-items">
                        {
                            basket.map((item,idx) =>(
                                idx < 4 ?
                                <div key={item.id} className="basket__suggest-item" style={{borderRight: idx < 3? '1px solid #FFFFFF80': 'none'}}>
                                    <img className="basket__suggest-img" src={item.image} alt={item.title}/>
                                    <h2 className="basket__suggest-title">{item.title}</h2>
                                    <button className="basket__suggest-btn">
                                        Добавить
                                        <span className="basket__item-btn" style={{transform: "scale(0.8)"}}>
                                           <TbPlus size={20}/>
                                        </span>
                                    </button>

                                    <p className="basket__suggest-price">{item.price} ₽</p>
                                </div>: ''
                            ))
                        }
                    </div>
                </div>

                <div className="basket__total">
                    <div className="basket__total-info">

                        <p className="basket__total-price">
                            <span className="basket__total-sub">Итого:</span>
                            {basket.reduce((acc,rec) => {
                               return acc += Number(rec.count * rec.price)
                            },0)} ₽
                        </p>

                        <p className="basket__total-free">
                            {
                                basket.reduce((acc,rec) => {
                                   return acc += Number(rec.count * rec.price)
                                },0) > 2000 ?
                                    <span className="basket__total-free-green">Доставка бесплатная</span> :
                                    <p className="basket__total-free-price">
                                        До бесплатной доставки не хватет:
                                         <span className="basket__total-free-green">{
                                            2000 - basket.reduce((acc,rec) => {
                                                return acc += Number(rec.count * rec.price)
                                            },0)} ₽
                                        </span>
                                    </p>
                            }
                        </p>

                        <p className="basket__total-min">
                            Минимальная сума заказа <span className="basket__total-free-orange">1500 ₽</span>
                        </p>
                    </div>

                    <button className="basket__total-btn">Оформить заказ</button>
                </div>
            </div>
        </section>
    );
};

export default Basket;