import React, {useContext} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import {BiMap} from 'react-icons/bi'
import {RiSearchLine} from 'react-icons/ri'
import {CgPhone} from 'react-icons/cg'
import {CustomContext} from "../../utils/context";
import BasketNull from "../../components/BasketNull/BasketNull";


const Header = () => {

    const {user,setUser,basket,setModal} = useContext(CustomContext)

    const navigate = useNavigate()

    const loOutUser = () => {
        setUser({
            email: ''
        })
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <header id="header" className="header">
            <div className="container">
                <nav className="header__nav">
                    <div className="header__right">
                        <h1 className="header__title">
                            <Link to="/">
                                LOGOS
                            </Link>
                        </h1>
                        <div className="header__content">
                            <div className="header__search">
                            <span className="header__search-map">
                                <BiMap size={20}/>
                            </span>
                                <input className="header__search-input" type="text" placeholder="Введите адрес доставки"/>
                                <span className="header__search-icon">
                                <RiSearchLine size={20}/>
                            </span>
                            </div>

                            <div className="header__contact">
                            <span className="header__contact-icon">
                                <CgPhone size={20}/>
                            </span>
                                <div className="header__contact-text">
                                    Контакты: <br/>
                                    <a href="tel:+7 (917) 510-57-59" className="header__contact-link">
                                        +7 (917) 510-57-59
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                        {
                            user.email.length? <span  className="header__join" onClick={loOutUser}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.5788" cy="7.27803" r="4.77803" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.00002 18.7014C3.99873 18.3655 4.07385 18.0337 4.2197 17.7311C4.67736 16.8158 5.96798 16.3307 7.03892 16.111C7.81128 15.9462 8.59431 15.836 9.38217 15.7815C10.8408 15.6533 12.3079 15.6533 13.7666 15.7815C14.5544 15.8367 15.3374 15.9468 16.1099 16.111C17.1808 16.3307 18.4714 16.77 18.9291 17.7311C19.2224 18.3479 19.2224 19.064 18.9291 19.6808C18.4714 20.6419 17.1808 21.0812 16.1099 21.2918C15.3384 21.4634 14.5551 21.5766 13.7666 21.6304C12.5794 21.7311 11.3866 21.7494 10.1968 21.6854C9.92221 21.6854 9.65677 21.6854 9.38217 21.6304C8.59663 21.5773 7.81632 21.4641 7.04807 21.2918C5.96798 21.0812 4.68652 20.6419 4.2197 19.6808C4.0746 19.3747 3.99955 19.0401 4.00002 18.7014Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                                Выйти
                            </span> :
                                <Link className="header__join" to="/register">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="11.5788" cy="7.27803" r="4.77803" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.00002 18.7014C3.99873 18.3655 4.07385 18.0337 4.2197 17.7311C4.67736 16.8158 5.96798 16.3307 7.03892 16.111C7.81128 15.9462 8.59431 15.836 9.38217 15.7815C10.8408 15.6533 12.3079 15.6533 13.7666 15.7815C14.5544 15.8367 15.3374 15.9468 16.1099 16.111C17.1808 16.3307 18.4714 16.77 18.9291 17.7311C19.2224 18.3479 19.2224 19.064 18.9291 19.6808C18.4714 20.6419 17.1808 21.0812 16.1099 21.2918C15.3384 21.4634 14.5551 21.5766 13.7666 21.6304C12.5794 21.7311 11.3866 21.7494 10.1968 21.6854C9.92221 21.6854 9.65677 21.6854 9.38217 21.6304C8.59663 21.5773 7.81632 21.4641 7.04807 21.2918C5.96798 21.0812 4.68652 20.6419 4.2197 19.6808C4.0746 19.3747 3.99955 19.0401 4.00002 18.7014Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Войти
                                </Link>
                        }

                    <button className="header__btn" onClick={() => {
                        if(basket.length){
                            navigate('/basket')
                        }else{
                            setModal(true)
                        }
                    }}>
                            Корзина
                        <span className='header__btn-count'>
                            {basket.length}
                        </span>
                    </button>
                </nav>
            </div>
            <BasketNull/>
        </header>
    );
};

export default Header;