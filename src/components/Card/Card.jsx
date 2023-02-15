import React, {useContext} from 'react';
import {RiShoppingCartLine} from "react-icons/ri";
import {TbPlus} from "react-icons/tb";
import {TbMinus} from "react-icons/tb";
import {useNavigate} from "react-router-dom";
import {CustomContext} from "../../utils/context";

const Card = ({item}) => {

    const navigate = useNavigate()

    const {addProduct,basket,plusOneBasket,minusOneBasket} = useContext(CustomContext)

    return (
        <div className="products__card">
            <img  onClick={() => navigate(`/product/${item.id}`)} className='products__card-img' src={item.image} alt={item.title}/>

            <div className="products__card-info">
                <div className="products__card-name">
                    <h1 className="products__card-title">
                        {item.title}
                    </h1>
                    <p className="products__card-weight">
                        Вес: {item.weight}г
                    </p>
                </div>

                <p className="products__card-desc">
                    {item.description}
                </p>

                {
                    basket.findIndex(product => product.id === item.id) > -1 ?
                        <div className="products__card-buy">
                            <button onClick={() => minusOneBasket(item.id) } type="button" className="products__card-btnPlus">
                                <TbMinus size={30}/>
                            </button>

                            <p className="products__card-price">
                                {item.price} ₽
                            </p>

                            <button onClick={() => plusOneBasket(item.id)} type="button" className="products__card-btnPlus">
                                <TbPlus size={30}/>
                            </button>

                            <div className="products__card-count">
                                {
                                    basket.find(product => product.id === item.id).count
                                }
                            </div>
                        </div>

                        :

                        <div className="products__card-buy" >
                            <p className="products__card-price">
                                {item.price} ₽
                            </p>

                            <button type="button" className="products__card-btn header__btn" onClick={() => addProduct(item)}>
                                В корзину
                                <span>
                            <RiShoppingCartLine size={20}/>
                        </span>
                            </button>
                        </div>
                }

            </div>

        </div>
    );
};

export default Card;