// @ts-nocheck
import { describe, expect } from '@jest/globals'
import ProductCard, { formatPrice } from './ProductCard'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

const mockProducts = [
    {
        id: 1,
        title: 'iPhone 9',
        description: 'An apple mobile which is nothing like apple',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Apple',
        category: 'smartphones',
        thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        images: [
            'https://i.dummyjson.com/data/products/1/1.jpg',
            'https://i.dummyjson.com/data/products/1/2.jpg',
            'https://i.dummyjson.com/data/products/1/3.jpg',
            'https://i.dummyjson.com/data/products/1/4.jpg',
            'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        ],
    },
    {
        id: 2,
        title: 'iPhone X',
        description:
            'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
        price: 899,
        discountPercentage: 17.94,
        rating: 4.44,
        stock: 34,
        brand: 'Apple',
        category: 'smartphones',
        thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
        images: [
            'https://i.dummyjson.com/data/products/2/1.jpg',
            'https://i.dummyjson.com/data/products/2/2.jpg',
            'https://i.dummyjson.com/data/products/2/3.jpg',
            'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
        ],
    },
    {
        id: 3,
        title: 'Samsung Universe 9',
        description:
            "Samsung's new variant which goes beyond Galaxy to the Universe",
        price: 1249,
        discountPercentage: 15.46,
        rating: 4.09,
        stock: 36,
        brand: 'Samsung',
        category: 'smartphones',
        thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
        images: ['https://i.dummyjson.com/data/products/3/1.jpg'],
    },
]

describe('ProductCard', () => {
    it('a11y - accessibility test', async () => {
        const { container } = render(<ProductCard products={undefined} />)
        expect(await axe(container)).toHaveNoViolations()
    })

    it('should see the dropdown and correct wording', () => {
        render(<ProductCard products={undefined} />)
        expect(screen.getByText(/Select a product/i)).toBeInTheDocument()
    })

    it('should open the dropdown and see the products', async () => {
        render(<ProductCard products={mockProducts} />)

        const dropdown = screen.getByTestId('dropdown')
        expect(dropdown).toBeInTheDocument()

        await userEvent.click(dropdown)

        // See all products in the mock
        expect(screen.getByText(/iPhone 9/i)).toBeInTheDocument()
        expect(screen.getByText(/iPhone X/i)).toBeInTheDocument()
        expect(screen.getByText(/Samsung Universe 9/i)).toBeInTheDocument()
    })

    it('should select one of the options and see the dropdown text change', async () => {
        render(<ProductCard products={mockProducts} />)

        const dropdown = screen.getByTestId('dropdown')
        expect(dropdown).toBeInTheDocument()

        await userEvent.click(dropdown)
        await userEvent.click(screen.getByText(/Samsung Universe 9/i))

        // Should change the dropdown text
        expect(dropdown).toHaveTextContent(/Samsung Universe 9/i)
        expect(screen.queryByText(/Select a product/i)).not.toBeInTheDocument()
    })

    it('should select a product from the dropdown and see the product information', async () => {
        render(<ProductCard products={mockProducts} />)

        const dropdown = screen.getByTestId('dropdown')
        expect(dropdown).toBeInTheDocument()

        await userEvent.click(dropdown)

        // Click one option
        await userEvent.click(screen.getByText(/iPhone 9/i))

        expect(screen.getByText(/smartphones/i)).toBeInTheDocument()
        expect(screen.getByTestId('product_image')).toBeInTheDocument()
        expect(screen.getByText('$549.00')).toBeInTheDocument()
        expect(
            screen.getByText(/An apple mobile which is nothing like apple/i)
        ).toBeInTheDocument()
    })
})

describe('formatPrice', () => {
    it('formatPrice', async () => {
        expect(formatPrice(549)).toEqual('$549.00')
        expect(formatPrice(1)).toEqual('$1.00')
        expect(formatPrice(99)).toEqual('$99.00')
        expect(formatPrice(0)).toEqual('$0.00')
        expect(formatPrice(-1)).toEqual('$-1.00')
        expect(formatPrice(1000)).toEqual('$1000.00')
        expect(formatPrice('1')).toEqual('$1.00')
        expect(formatPrice('NAN')).toEqual('Invalid Price')
    })
})
