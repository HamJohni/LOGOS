import React from 'react';
import {useNavigate} from "react-router-dom";
import {menuList} from "../../../../utils/menuList";


const MenuList = () => {

    const navigate = useNavigate()

    return (
        <ul className="products__ul">
            {
                menuList.map(item => (
                    <li key={item.en} className="products__item" onClick={() => navigate(`/catalog/${item.en}`)}>{item.ru}</li>
                ))
            }
        </ul>
    );
};

export default MenuList;