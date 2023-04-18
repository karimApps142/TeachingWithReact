import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { addToCart } from '@/store/cart';
import { Head, Link, useForm } from '@inertiajs/react';
import { useDispatch } from 'react-redux'



export default function Dashboard({ auth, products }) {

    const dispatch = useDispatch();

    const { get } = useForm({})

    const goToCart = (product) => {
        dispatch(addToCart(product))
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products</h2>}
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Link href="/products/add" as="button" className='px-5 py-2 bg-green-600 text-white rounded shadow-md'>add product</Link>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex items-center  flex-wrap">
                        {products && products.map(product => <div className='m-2' key={product.id}>
                            <img className='h-60 w-40 rounded shadow bg-white mb-1 object-cover' src={product.image} alt="" />
                            <button onClick={() => goToCart(product)} className='px-10 py-2 rounded shadow bg-green-800 text-white'>Add To Cart</button>
                            <p className='text-center font-extrabold font-serif' key={product.id}>{product.title}</p>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
