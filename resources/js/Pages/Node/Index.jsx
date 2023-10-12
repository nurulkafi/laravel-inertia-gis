import Modal from "@/Components/FloatUI/Modal";
import MapboxMap from "@/Components/MapBox";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Index(props) {
    const auth = props.auth;
    const datas = props.datas;
    const [openModal, setOpenModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        lat: "",
        lng: "",
    });
    const submit = (e) => {
        e.preventDefault();

        post(route("node.create"));
        setOpenModal(false);
        data.name = "";
        data.lat = "";
        data.lng = "";
        // console.log('submit')
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Node
                </h2>
            }
        >
            <Head title="Node" />

            <section className="py-2 pl-20 ml-20">
                <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <ul className="mt-16">
                        <li className="border rounded-lg">
                            <div className="max-w-screen-xl mx-auto px-4 md:px-8  p-10">
                                <div className="items-start justify-between md:flex">
                                    <div className="max-w-lg">
                                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                                            Node
                                        </h3>
                                        <p className="text-gray-600 mt-2">
                                            Node dalam algoritma Dijkstra adalah
                                            salah satu elemen dalam graf yang
                                            digunakan untuk mencari jalur
                                            terpendek antara dua titik atau
                                            simpul dalam graf.
                                        </p>
                                    </div>
                                    <div className="mt-3 md:mt-0">
                                        <button
                                            onClick={() => setOpenModal(true)}
                                            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                                        >
                                            Add Node
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                                    <table className="w-full table-auto text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                                            <tr>
                                                <th className="py-3 px-6">
                                                    No
                                                </th>
                                                <th className="py-3 px-6">
                                                    Name
                                                </th>
                                                <th className="py-3 px-6">
                                                    Latitude
                                                </th>
                                                <th className="py-3 px-6">
                                                    Longitude
                                                </th>
                                                <th className="py-3 px-6">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 divide-y">
                                            {datas.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {idx + 1}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {item.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {item.lat}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {item.lng}
                                                    </td>
                                                    <td className=" px-6 whitespace-nowrap">
                                                        <a
                                                            href="javascript:void()"
                                                            className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                                                        >
                                                            Edit
                                                        </a>
                                                        <button
                                                            href="javascript:void()"
                                                            className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* <div className="flex items-start justify-between p-4">
                                <div className="space-y-2">
                                    {item.icon}
                                    <h4 className="text-gray-800 font-semibold">
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        {item.desc}
                                    </p>
                                </div>
                                <button className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 hover:bg-gray-100">
                                    Connect
                                </button>
                            </div>
                            <div className="py-5 px-4 border-t text-right">
                                <a
                                    href="javascript:void(0)"
                                    className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                                >
                                    View integration
                                </a>
                            </div> */}
                        </li>
                    </ul>
                </div>
            </section>
            {/* <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="items-start justify-between md:flex">
                    <div className="max-w-lg">
                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                            Team members
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                    <div className="mt-3 md:mt-0">
                        <a
                            href="javascript:void(0)"
                            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                        >
                            Add member
                        </a>
                    </div>
                </div>
                <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">Username</th>
                                <th className="py-3 px-6">Email</th>
                                <th className="py-3 px-6">Position</th>
                                <th className="py-3 px-6">Salary</th>
                                <th className="py-3 px-6"></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {data.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.position}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.salary}
                                    </td>
                                    <td className="text-right px-6 whitespace-nowrap">
                                        <a
                                            href="javascript:void()"
                                            className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                                        >
                                            Edit
                                        </a>
                                        <button
                                            href="javascript:void()"
                                            className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div> */}
            <Modal
                show={openModal}
                setShow={setOpenModal}
                jenis={"Tambah"}
                title={"Node"}
            >
                <form onSubmit={submit}>
                    <div class="grid grid-cols-2 gap-2">
                        <div className="col-span-1">
                            <TextInput
                                label={"Name"}
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <TextInput
                                label={"Latitude"}
                                id="Latitude"
                                type="text"
                                name="Latitude"
                                value={data.lat}
                                onChange={(e) => setData("lat", e.target.value)}
                                required
                            />
                            <TextInput
                                label={"Longtitude"}
                                id="Longtitude"
                                type="text"
                                name="Longtitude"
                                value={data.lng}
                                onChange={(e) => setData("lng", e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <MapboxMap api_token={props.map_token} />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 mt-5 border-t">
                        <button
                            className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                            // onClick={() => setOpenModal(false)}
                            type="submit"
                        >
                            Accept
                        </button>
                        <button
                            className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                            onClick={() => setOpenModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
