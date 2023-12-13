import Modal from "@/Components/FloatUI/Modal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/FloatUI/TextInput";
import MapboxMap from "@/Components/MapBox";
import Select from "@/Components/FloatUI/Select";
import TableData from "./Partials/tableData";
import { Link, usePage } from "@inertiajs/react";
export default function Index(props) {
    const auth = props.auth;
    const graph = props.graph;
    const node = props.node;
    // console.log('gr',graph)
    const [openModal, setOpenModal] = useState(false);
    const [titikMulai, setTitikMulai] = useState(null);
    const [titikTujuan, setTitikTujuan] = useState(null);
    const [NodeTitikMulai, setNodeTitikMulai] = useState(null);
    const [NodeTitikTujuan, setNodeTitikTujuan] = useState(null);
    const [distance, setDistance] = useState("");
    const [dataCityName, setDataCityName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        start: "",
        end: "",
        distance: "",
    });
    useEffect(() => {
        setData((data) => ({ ...data, start: titikMulai }));
        setData((data) => ({ ...data, end: titikTujuan }));
        setData((data) => ({ ...data, distance: distance }));
    }, [titikMulai, titikTujuan, distance]);
    // console.log('data',data)
    useEffect(() => {
        if (titikMulai !== null && titikTujuan !== null) {
            const dataTitikMulai = node.find(
                (value) => value.id === parseInt(titikMulai)
            );
            const dataTitikTujuan = node.find(
                (value) => value.id === parseInt(titikTujuan)
            );
            setNodeTitikMulai(dataTitikMulai);
            setNodeTitikTujuan(dataTitikTujuan);
        }
    }, [titikMulai, titikTujuan, NodeTitikMulai, NodeTitikTujuan]);
    const submit = (e) => {
        e.preventDefault();

        post(route("graph.create"));
        setOpenModal(false);
        data.start = "";
        data.end = "";
        data.distance = "";
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Graph
                </h2>
            }
        >
            <Head title="Graph" />
            <section className="py-2 pl-20 ml-20">
                <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <ul className="mt-16">
                        <li className="border rounded-lg">
                            <div className="max-w-screen-xl mx-auto px-4 md:px-8  p-10">
                                <div className="items-start justify-between md:flex">
                                    <div className="max-w-lg">
                                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                                            Graph
                                        </h3>
                                        <p className="text-gray-600 mt-2">
                                            Graf terdiri dari simpul-simpul
                                            (nodes) dan tepi (edges) yang
                                            menghubungkan simpul-simpul
                                            tersebut.
                                        </p>
                                    </div>
                                    <div className="mt-3 md:mt-0">
                                        {/* <button
                                            onClick={() => setOpenModal(true)}
                                            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                                        >
                                            Add Graph
                                        </button> */}
                                        <Link
                                            href="/add-graph"
                                            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                                        >
                                            Add Graph
                                            {/* <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" /> */}
                                        </Link>
                                    </div>
                                </div>
                                <TableData datas={graph} />
                            </div>
                        </li>
                    </ul>
                    <Modal
                        show={openModal}
                        setShow={setOpenModal}
                        jenis={"Tambah"}
                        title={"Graph"}
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
                                            <span class="sr-only">
                                                Loading...
                                            </span>
                                        </div>
                                    )}
                                    {!isLoading && (
                                        <div>
                                            <Select
                                                node={node}
                                                label={"Titik Mulai"}
                                                value={setTitikMulai}
                                            />
                                            <Select
                                                node={node}
                                                label={"Tujuan"}
                                                value={setTitikTujuan}
                                            />
                                            <TextInput
                                                label={"Distance"}
                                                id="Distance"
                                                type="text"
                                                // name="Longdata.nametitude"
                                                value={distance}
                                                // onChange={(e) => setData("lng", dataLng)}
                                                rightSection="km"
                                                disabled
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="col-span-1">
                                    <MapboxMap
                                        api_token={props.map_token}
                                        setDataCityName={setDataCityName}
                                        setIsLoading={setIsLoading}
                                        usageFor={"Graph"}
                                        dataNode={node}
                                        dataTitikMulai={NodeTitikMulai}
                                        dataTitikTujuan={NodeTitikTujuan}
                                        setDistance={setDistance}
                                        icon={props?.icon}
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
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
