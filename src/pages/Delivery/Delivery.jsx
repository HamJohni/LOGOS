import React,{useState,useEffect} from 'react';
import Title from "../../components/Title/Title";
import axios from "../../utils/axios";
import map from "../../img/map.png"
import MenuList from "../Home/AllProducts/MenuList/MenuList";
import Answer from "./Answer/Answer";

const Delivery = () => {

    const [delivery,setDelivery] = useState([])
    useEffect(() => {
        axios('/delivery').then(({data}) => {
            setDelivery(data)
        }).catch((err) => console.log(err))
    },[])

    return (
        <>
            <section className="delivery">
                <MenuList/>
                <Title title="Условия доставки"/>
                <div className="container">
                    <div className="delivery__block">
                        <div className="delivery__quests">
                            {
                                delivery.map(item => (
                                    <Answer key={item.id} item={item}/>
                                ))
                            }
                        </div>
                        <div className="delivery__map">
                            <img className="delivery__map-bg" src={map} alt=""/>
                        </div>
                    </div>

                    <div className="delivery__info">
                        <div className="delivery__info-top">
                            <p className="delivery__info-time">
                                График работы доставки:
                                <span className="delivery__info-hour">
                                    с 10:00-21:00
                                </span>
                            </p>
                            <p className="delivery__info-time">
                                График работы кафе:
                                <span className="delivery__info-hour">
                                    с 08:00-21:00
                                </span>
                            </p>
                        </div>

                        <div className="delivery__info-bottom">
                            <h3 className="delivery__info-subtitle">
                                Минимальный заказ:
                            </h3>

                            <p className="delivery__info-desc">
                                Бесплатная доставка пешим курьером при сумме заказа от 400 ₽ <br/>
                                Доставка оператором такси от любой суммы заказа - по тарифам <br/>
                                перевозчика.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Delivery;