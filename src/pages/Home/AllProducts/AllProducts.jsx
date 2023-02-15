import React,{useEffect,useContext} from "react";
import ProductsFilter from "../../../components/ProductsFilter/ProductsFilter";
import About from "../About/About";
import MenuList from "./MenuList/MenuList";
import {CustomContext} from "../../../utils/context";

const AllProducts = () => {

    const {products,getAllProducts} = useContext(CustomContext)


    useEffect(() => {
        getAllProducts()
    },[])
    return (
        <section className="products">

            <MenuList/>
                <ProductsFilter products={products} title="Холодные закуски"/>
                <ProductsFilter products={products} title="Горячие закуски"/>
                <ProductsFilter products={products} title="Мясные блюда"/>
            <About/>
        </section>
    );
};

export default AllProducts;