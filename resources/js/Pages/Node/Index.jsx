import Modal from "@/Components/FloatUI/Modal";
import MapboxMap from "@/Components/MapBox";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/FloatUI/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Pagination from "@/Components/Pagination";
import TableData from "./Partials/tableData";

export default function Index(props) {
    const auth = props.auth;
    const datas = props.datas;
    const [openModal, setOpenModal] = useState(false);
    const [dataLat, setDataLat] = useState("");
    const [dataLng, setDataLng] = useState("");
    const [dataCityName, setDataCityName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        lat: "",
        lng: "",
    });

    useEffect(() => {
        setData((data) => ({ ...data, name: dataCityName }));
        setData((data) => ({ ...data, lat: dataLat }));
        setData((data) => ({ ...data, lng: dataLng }));
    }, [dataLat, dataLng]);
    const submit = (e) => {
        e.preventDefault();

        post(route("node.create"));
        setOpenModal(false);
        data.name = "";
        data.lat = "";
        data.lng = "";
    };
    console.log(isLoading)
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
                                <TableData datas={datas} />
                            </div>
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
                    <div className="grid grid-cols-2 gap-2">
                        <div className="col-span-1">
                            {isLoading && (
                                <div
                                    role="status"
                                    class="max-w-sm animate-pulse"
                                >
                                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                                    <span class="sr-only">Loading...</span>
                                </div>
                                
                            )}
                            {!isLoading && (
                                <div>
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
                                        // onChange={(e) => setData("lat", dataLat)}
                                        disabled
                                    />
                                    <TextInput
                                        label={"Longtitude"}
                                        id="Longtitude"
                                        type="text"
                                        name="Longdata.nametitude"
                                        value={data.lng}
                                        // onChange={(e) => setData("lng", dataLng)}
                                        disabled
                                    />
                                </div>
                            )}
                        </div>
                        <div className="col-span-1">
                            <MapboxMap
                                api_token={props.map_token}
                                setDataLat={setDataLat}
                                setDataLng={setDataLng}
                                setDataCityName={setDataCityName}
                                setIsLoading={setIsLoading}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 mt-5 border-t">
                        <button
                            className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                            // onClick={() => setOpenModal(false)}
                            type="submit"
                        >
                            Simpan
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
