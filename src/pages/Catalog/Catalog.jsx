import React, {useEffect, useState} from 'react';
import Card from "../../components/Card/Card";
import axios from "../../utils/axios";
import {Link, useNavigate, useParams} from 'react-router-dom'
import {menuList} from "../../utils/menuList";

const Catalog = () => {

    const [order,setOrder] = useState('default')
    const [title,setTitle] = useState('')
    const [products,setProducts] = useState([])

    const navigate = useNavigate()

    const {category} = useParams()

    useEffect(() => {

        let categories = category !== 'all' ? 'category=' + category + '&' : ''

        let titleFilter = title ? `title_like=${title}&` : ''

        axios(`/products?${categories}${orders}${titleFilter}`)
            .then(({data}) => setProducts(data))
            .catch((err) => console.log(err))
    },[category,order,title])


    const filterOrder = () => {
        switch (order){
            case 'asc' : {
                return '_sort=price&_order=asc&'
            }
            case 'desc' : {
                return '_sort=price&_order=desc&'
            }
            case 'weight' : {
                return '_sort=weight&_order=asc&'
            }
            case 'calories' : {
                return '_sort=cal&_order=asc&'
            }
            case 'default' : {
                return ''
            }
        }
    }

    let orders = filterOrder()



    return (
        <section className="catalog">
            <div className="container">
                <div className="catalog__content">
                    <aside className="catalog__aside">
                        <p className="catalog__aside-title">
                            Фильтруйте продукты, <br/>
                            как вам удобно
                        </p>
                        <div className="catalog__aside-filter">
                            <div className="catalog__aside-category-box">
                                <p className="catalog__aside-category-name">Категории</p>
                                <select onChange={(e) => navigate(`/catalog/${e.target.value}`) } className="catalog__aside-categories">
                                    <option selected={category === 'all'} className="catalog__aside-category" value="all">Все блюда</option>
                                    {
                                        menuList.map(item => (
                                            <option selected={item.en === category} className="catalog__aside-category" key={item.en} value={item.en}>{item.ru}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="catalog__aside-category-box">
                                <p className="catalog__aside-category-name" style={{width:"140px"}}>Сортировать по:</p>
                                <select onChange={(e) => setOrder(e.target.value) } className="catalog__aside-categories">
                                    <option className="catalog__aside-category" value="default">По умолчанию</option>
                                    <option className="catalog__aside-category" value="asc">По убыванию</option>
                                    <option className="catalog__aside-category" value="desc">По возрастанию</option>
                                    <option className="catalog__aside-category" value="weight">По весу</option>
                                    <option className="catalog__aside-category" value="calories">По калорийности</option>
                                </select>
                            </div>

                            <div className="catalog__aside-category-box">
                                <p className="catalog__aside-category-name" style={{width:"170px"}}>Поиск по названию:</p>
                                <input value={title} onChange={(e) => setTitle(e.target.value) } style={{padding:"10px"}}  className="catalog__aside-categories"/>
                            </div>

                        </div>

                    </aside>
                    
                    <div className="catalog__right">

                        <h2 className="catalog__crumbs">
                            <Link to="/">Главная</Link> /{
                            category !== 'all' ? menuList.find((item) => item.en === category).ru : 'Все'
                        }
                        </h2>

                        <div className="catalog__row">
                            {
                                products.map(item => (
                                    <Card item={item} key={item.id}/>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Catalog;