import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '@/components/ProductCard/ProductCard'

export default function Home() {
    const [products, setProducts] = useState()

    useEffect(() => {
        axios
            .get('https://dummyjson.com/products')
            .then((response) => setProducts(response.data.products))
            .catch((error) => console.log(error))
    }, [])

    return (
        <div>
            <Head>
                <title>Diligent Take Home</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <ProductCard products={products} />
            </main>
        </div>
    )
}
