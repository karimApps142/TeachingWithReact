import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function AddProduct({ auth }) {
    const { data, setData, post, errors } = useForm({
        title: "",
        price: "",
        qty: "",
        image: ""
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("products.store"))
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add Product
                </h2>
            }
        >
            <Head title="Add Product" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={onSubmit} >

                        <input type="file" placeholder="image" onChange={e => setData({
                            ...data,
                            image: e.target.files[0]
                        })} />
                        {
                            errors.image ?
                                <p >{errors.image} </p> : null
                        }

                        <input type="text" placeholder="title" value={data.title} onChange={e => setData({
                            ...data,
                            title: e.target.value
                        })} />
                        {
                            errors.title ?
                                <p >{errors.title} </p> : null
                        }
                        <input type="number" placeholder="price"
                            value={data.price} onChange={e => setData({
                                ...data,
                                price: e.target.value
                            })} />
                        {
                            errors.price ?
                                <p className="text-red-600" >{errors.price} </p> : null
                        }
                        <input type="number" placeholder="qty"
                            value={data.qty} onChange={e => setData({
                                ...data,
                                qty: e.target.value
                            })} />
                        <button type="submit">submit</button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
