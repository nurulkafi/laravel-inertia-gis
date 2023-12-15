import { Link, usePage } from "@inertiajs/react";

export default function Index(props) {
    const logo = usePage().props?.icon?.logo;

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="max-w-2xl p-8 bg-white shadow-md rounded-md">
                <h1 className="text-4xl font-bold mb-4 text-center text-red-500">
                    Selamat Datang di Layanan Pemadam Kebakaran
                </h1>
                <p className="text-gray-600 text-center mb-8">
                    Layanan cepat dan andal untuk penanganan kebakaran.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-center justify-center">
                        <img
                            src={logo} // Gantilah dengan path gambar yang sesuai
                            alt="Firefighter"
                            className="w-full max-w-sm"
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-red-500 mt-5">
                            Butuh layanan kami?
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Kami siap membantu Anda dalam situasi darurat
                            kebakaran. Laporkan kejadian segera!
                        </p>
                        <Link
                            href="/laporan" // Gantilah dengan path yang sesuai
                            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                        >
                            Laporkan disini
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
