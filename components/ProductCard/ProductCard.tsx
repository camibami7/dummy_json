import { SetStateAction, useState } from 'react'
import css from './ProductCard.module.css'
import Image from 'next/image'
import ArrowDownIcon from '../Images/ArrowDown.svg'

interface DropdownProps {
    products: [] | undefined
}

interface Product {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
}

export default function ProductCard({ products }: DropdownProps) {
    const [showOptions, setShowOptions] = useState(false)
    const [dropdownTitle, setDropdownTitle] = useState('Select a product')

    function handleClick() {
        setShowOptions(!showOptions)
    }
    function optionClick(e: SetStateAction<string>) {
        setDropdownTitle(e)
        setShowOptions(false)
    }

    return (
        <>
            <div className={css.contentWrapper}>
                <button
                    className={
                        dropdownTitle === 'Select a product'
                            ? css.dropdown
                            : css.dropdownSelected
                    }
                    onClick={() => handleClick()}
                    type="button"
                    data-testid="dropdown"
                >
                    {dropdownTitle}
                    <Image
                        className={css.arrow}
                        src={ArrowDownIcon}
                        width={14}
                        height={14}
                        alt={'arrow down'}
                    />
                </button>
                <div className={showOptions ? css.dropdownOptions : css.hidden}>
                    {products?.map((product: Product, index: number) => {
                        return (
                            <p
                                className={css.options}
                                key={index}
                                onClick={() => optionClick(product.title)}
                            >
                                {product.title}
                            </p>
                        )
                    })}
                </div>
                {showOptions ? (
                    ''
                ) : (
                    <div className={css.productCardWrapper}>
                        {dropdownTitle === 'Select a product' ? (
                            <p>No product selected</p>
                        ) : (
                            products
                                ?.filter((option: Product) => {
                                    return option.title == dropdownTitle
                                })
                                .map((product: Product, index: number) => (
                                    <div
                                        key={index}
                                        className={css.productCard}
                                    >
                                        <img
                                            className={css.productImage}
                                            src={product.images[0]}
                                            alt="product image"
                                            data-testid="product_image"
                                        />
                                        <div className={css.productInformation}>
                                            <div className={css.titleCategory}>
                                                <p className={css.title}>
                                                    {product.title}
                                                </p>
                                                <p className={css.category}>
                                                    {product.category}
                                                </p>
                                            </div>
                                            <p className={css.brand}>
                                                {product.brand}
                                            </p>
                                            <p className={css.price}>
                                                {formatPrice(product.price)}
                                            </p>
                                            <p className={css.description}>
                                                {product.description}
                                            </p>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export function formatPrice(price: number) {
    const numericPrice = Number(price)

    if (!isNaN(numericPrice)) {
        return `$${numericPrice.toFixed(2)}`
    } else {
        return 'Invalid Price'
    }
}
