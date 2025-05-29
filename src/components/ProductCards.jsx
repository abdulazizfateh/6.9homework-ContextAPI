import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// Loading Product Cards
import LoadingProductCards from "./LoadingProductCards";
// UseStateValue() hook
import { useStateValue } from "../context/index";
// Icons
import { IoAdd } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";

const ProductCards = ({ data, loading }) => {
    const navigate = useNavigate();

    const [state, dispatch] = useStateValue();
    const handleLikedItem = (product) => {
        dispatch({ type: "ADD_TO_LIKED_ITEMS", payload: product });
    }
    const handleAddToCart = (product) => {
        dispatch({ type: "ADD_TO_CART", payload: product });
    }

    return (
        <section className='section_products py-8 min-h-[92dvh]'>
            <div className="container mx-auto">
                {
                    loading && <LoadingProductCards />
                }
                <div className='products_wrapper grid grid-cols-1 min-[320px]:grid-cols-2 gap-x-1.5 gap-y-[8px] sm:gap-y-3 lg:gap-x-2.5 lg:gap-y-4 min-[700px]:gap-2 min-[480px]:grid-cols-3 min-[940px]:grid-cols-4 lg:grid-cols-5'>
                    {
                        data?.map((product) => (
                            <div key={product.id} className='card bg-secondary-bg overflow-hidden rounded-lg border border-border group'>
                                <div className='card_image bg-border overflow-hidden relative'>
                                    <img onClick={() => navigate(`/products/${product.id}`)} loading="lazy" className='object-contain min-[320px]:object-cover w-full h-[160px] sm:h-[220px] md:h-[289px] group-hover:scale-[1.03] duration-500' src={product.image} alt={product.title} />

                                </div>
                                <div className='card_body p-2 md:pt-2.5 md:p-3'>
                                    <h4 className='card_title text-xs md:text-sm font-medium h-8 md:h-11 mb-1 line-clamp-2'>{product.title}</h4>
                                    <p className='card_desc text-[10px] md:text-[13px] h-11 md:h-15 sm:min-h-10 text-secondary-text mb-3 md:mb-4 capitalize line-clamp-3'>{product.description}</p>
                                    <div className='flex items-center gap-2 justify-between'>
                                        <p className='text-highlight-blue text-xs sm:text-sm'>${product.price}</p>
                                        <div className='flex items-center gap-1'>
                                            <button onClick={() => { handleLikedItem(product) }} className='size-8 cursor-pointer rounded-md bg-border flex items-center justify-center border border-[#3d444d] hover:bg-transparent'>
                                                <IoMdHeartEmpty className='text-highlight-blue' />
                                            </button>
                                            <button onClick={() => { handleAddToCart(product) }} className='size-8 cursor-pointer rounded-md bg-border flex items-center justify-center border border-[#3d444d] hover:bg-transparent'>
                                                <IoAdd />
                                            </button>
                                            {/* {
                                                (state.cart.length > 0 && state.cart.some((item) => item.id === product.id)) &&
                                                <button className='size-8 cursor-pointer rounded-md bg-border flex items-center justify-center border border-[#3d444d] hover:bg-transparent'>
                                                    <span>{state.cart.length}</span>
                                                </button>
                                            } */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default React.memo(ProductCards);