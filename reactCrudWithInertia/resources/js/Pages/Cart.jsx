import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function Cart({ auth , todos }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cart</h2>}
        >
            <Head title="Cart" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  Cart Page
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
