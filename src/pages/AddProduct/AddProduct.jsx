import React from 'react';
import {useForm} from "react-hook-form";
import axios from "../../utils/axios";
import {menuList} from "../../utils/menuList";

const AddProduct = () => {

    const {
        register,
        reset,
        handleSubmit,
        formState:{
            errors
        }} = useForm(
        {mode: "onBlur"}
    )

    const onSubmit = (data) => {

        const newProduct = {
            ...data,
            cal: data.protein * 4 + data.fats * 9 + data.carbs * 4
        }

        axios.post('/products', newProduct )
            .then(res => {
                reset()
                alert("Продукт успешно добавлен")
            })
            .catch((err) => alert("Не удалось добавить товар"))
        console.log(newProduct)
    }

    return (
        <section className="add">
            <div className="container">
                <form noValidate className="add__form" onSubmit={handleSubmit(onSubmit)} >

                    <div className="add__block">
                        <h2 className="add__title">Добавление продукта</h2>
                        <div className="add__block-input">

                            <div className="add__input">
                                    <input style={{borderBottom: errors.title? "2px solid red": ''}}
                                           {...register('title', {
                                        required: {
                                            value: true
                                        }
                                    })} className="add__input-title form__field" type="text" placeholder="Название"/>

                                     <input  style={{borderBottom: errors.image? "2px solid red": ''}}
                                             {...register('image', {
                                         required: {
                                             value: true
                                         }
                                     })} type="url" className=" form__field  add__input-title" placeholder="Фото"/>
                            </div>
                            <div className="add__block-box">
                                <div className="add__block-price">
                                          <input  style={{borderBottom: errors.price? "2px solid red": ''}}
                                                  {...register('price', {
                                                      required: {
                                                          value: true
                                                      }
                                                  })} className="form__field  add__input-price" type="number" placeholder="Цена"/>
                                        <input style={{borderBottom: errors.weight? "2px solid red": ''}}
                                               {...register('weight', {
                                                   required: {
                                                       value: true
                                                   }
                                               })}  className="form__field  add__input-price" type="number" placeholder="Вес"/>
                                </div>


                                    <textarea style={{border: errors.description? "2px solid red": ''}}
                                              {...register('description', {
                                                  required: {
                                                      value: true
                                                  }
                                              })}   className="add__input-textarea" placeholder="Расскажите об продукте"/>
                            </div>
                            <div className="add__block-cal">
                                    <input style={{borderBottom: errors.protein? "2px solid red": ''}}
                                           {...register('protein', {
                                               required: {
                                                   value: true
                                               }
                                           })}  className="form__field  add__input-cal" placeholder="Белки" type="number"/>

                                    <input style={{borderBottom: errors.fats? "2px solid red": ''}}
                                           {...register('fats', {
                                               required: {
                                                   value: true
                                               }
                                           })}  className="form__field  add__input-cal" placeholder="Жиры"   type="number"/>

                                     <input style={{borderBottom: errors.carbs? "2px solid red": ''}}
                                            {...register('carbs', {
                                                required: {
                                                    value: true
                                                }
                                            })}  className="form__field  add__input-cal" placeholder="Углеводы" type="number"/>

                                    <select style={{border: errors.carbs? "2px solid red": ''}} required {...register('category', {
                                        required: {
                                            value: true
                                        }
                                    })} className="add__select">
                                        <option  disabled className="add__option">Выбрать категорию</option>
                                        {
                                            menuList.map(item => (
                                                <option key={item.en} className="add__option" value={item.en}>{item.ru}</option>
                                            ))
                                        }
                                    </select>
                            </div>

                        </div>
                        <button type="submit" className="form__btn add__btn">Добавить продукт</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddProduct;