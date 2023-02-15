import React, {useContext, useState} from 'react';
import {Link,useNavigate,useLocation} from 'react-router-dom'
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import axios from "../../utils/axios";
import {CustomContext} from "../../utils/context";
import {useForm} from "react-hook-form";


const Form = () => {

    const {pathname} = useLocation()

    const {
        register,
        reset,
        handleSubmit,
        formState:{
            errors
        }} = useForm(
        {mode: "onBlur"}
    )

    const [email,setEmail] = useState('')

    const [eye,setEye] = useState(false)

    const navigate = useNavigate()

    const {setUser} = useContext(CustomContext)

    const registerUser = (data) => {

        axios.post(`/register`, {...data})
            .then((res) => {
                setUser({
                    token: res.data.accessToken,
                    ...res.data.user
                })

                localStorage.setItem('user',JSON.stringify({
                    token: res.data.accessToken,
                    ...res.data.user
                }))
                reset()
                navigate('/')
            })
            .catch(err => console.log(err.message))
    }

    const loginUser = (data) => {

        axios.post(`/login`, {...data})
            .then((res) => {
                setUser({
                    token: res.data.accessToken,
                    ...res.data.user
                })

                localStorage.setItem('user',JSON.stringify({
                    token: res.data.accessToken,
                    ...res.data.user
                }))
                navigate('/')
            })
            .catch(err => console.log(err.message))
    }

    const onSubmit = (data) => {
        pathname === '/register' ? registerUser(data) : loginUser(data)
    }

    return (
        <div className="content">
            <form noValidate className="form" onSubmit={handleSubmit(onSubmit)}>

                <h2 className="form__title">
                    {
                        pathname === "/register" ? "Регистация" : "Вход в аккаунт"
                    }
                </h2>

                <input
                    {...register('email', {required: {message: "Поле email обязателен к заполнению",value: true},minLength: {message: "Вы неправильно ввели свой email",value: 8},pattern: {message: "Напишите свой email правильно",value: /^[^]+@[^ ]+\.[a-z]{2,5}$/}})}
                    value={email} onChange={(e) => setEmail(e.target.value)} className="form__field" type="email" placeholder="Введите Email"/>
                <p className="form__error">{errors.email && errors.email.message}</p>

                <div className="form__password">
                    <input
                        {...register('password',{required: {message: "Пароль обязателен к заполнению !",value: true},pattern: {value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,message: "Пароль должен содержать не менее 6 символов, заглавную букву, число"}})}

                        className="form__field" type={eye?"text"  : "password"} placeholder={
                        pathname === "/register" ? "Придумайте пароль" : "Введите пароль"
                    }/>
                    <span onClick={() => setEye((prev)=> !prev)} className="form__eye">
                        {
                            eye? <AiFillEyeInvisible size={20}/>:<AiFillEye size={20}/>
                        }
                    </span>
                </div>
                <p className="form__error">{errors.password && errors.password.message}</p>


                <button className="form__btn" type="submit">
                    {
                        pathname === "/register" ? "Создать аккаунт" : "Вход в аккаунт"
                    }
                </button>

                <Link style={{textAlign:"right"}}
                      to={pathname === "/register" ? "/login" : "/register"}
                >
                    {pathname === "/register" ? "У меня уже есть аккаунт" : "У меня еще нет аккаунта"}
                </Link>

            </form>
        </div>
    );
};

export default Form;