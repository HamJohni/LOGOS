import React, {useContext, useState} from 'react';
import {SlBasketLoaded} from "react-icons/sl"
import {ImCross} from "react-icons/im"
import {CustomContext} from "../../utils/context";
import {useNavigate} from "react-router-dom";

const BasketNull = () => {

    const {setModal,modal} = useContext(CustomContext)

    const navigate = useNavigate()


    return (
        <div className={modal? "basketNull active" : "basketNull"} onClick={() => setModal(false)}>
            <div className={modal?"basketNull__block active" : "basketNull__block" } onClick={(e) => e.stopPropagation()}>
                <SlBasketLoaded size={100} style={{color: "green"}}/>

                <p className="basketNull__text">
                    КОРЗИНА ПУСТАЯ
                </p>

                <button className="basketNull__btn" onClick={() => navigate("/catalog")}>
                    Посмотреть меню
                </button>
                <ImCross size={20} className="basketNull__exit" onClick={() => setModal(false)} />
            </div>
        </div>
    );
};

export default BasketNull;