import Modal from "@/Components/FloatUI/Modal";
import MapboxMap from "@/Components/MapBox";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/FloatUI/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Pagination from "@/Components/Pagination";
import TableData from "./Partials/tableData";
import { Link, usePage } from "@inertiajs/react";
import Select from "@/Components/FloatUI/Select";
import Label from "@/Components/FloatUI/Label";
export default function Index(props) {
    const auth = props.auth;
    const datas = props.datas;
    const [openModal, setOpenModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [id, setId] = useState("");
    const [isJalan, setIsJalan] = useState(false);
    const [tipeData, setTipeData] = useState("semua");

    const [editData, setEditData] = useState(null);
    const [dataLat, setDataLat] = useState("");
    const [dataLng, setDataLng] = useState("");
    const [dataCityName, setDataCityName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionTipeData, setSelectedOptionTipeData] = useState(null);
    const [name, setName] = useState(null);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        id: id,
        name: name,
        lat: lat,
        lng: lng,
        tipeJalan: selectedOption,
        tipeData: selectedOptionTipeData,
    });

    useEffect(() => {
        setData((data) => ({ ...data, name: dataCityName || name }));
        setData((data) => ({ ...data, lat: dataLat || lat }));
        setData((data) => ({ ...data, lng: dataLng || lng }));
        setData((data) => ({ ...data, tipeJalan: selectedOption }));
        setData((data) => ({ ...data, tipeData: selectedOptionTipeData }));
    }, [dataLat, dataLng, selectedOption, selectedOptionTipeData]);
    // useEffect(() => {
    //     // setId("");
    //     // setIsJalan(false);
    //     // setTipeData("semua");
    //     // setDataNode(datas);
    //     // setEditData(null);
    //     // setDataLat("");
    //     // setDataLng("");
    //     // setDataCityName("");
    //     // setIsLoading(false);
    //     // setSelectedOption(null);
    //     // setSelectedOptionTipeData(null);
    //     // setName(null);
    //     // setLat(null);
    //     // setLng(null);
    //     // data.id="";
    //     // data.name="";
    //     // data.lng="";
    //     // data.tipeJalan="";
    //     // data.tipeData="";
    // }, [openModal,deleteModal]);
    useEffect(() => {
        if (id !== "") {
            axios
                .get(`http://localhost:8000/api/node/${id}`)
                .then((response) => {
                    setData((data) => ({
                        ...data,
                        id: response?.data?.id,
                        name: response?.data?.name, // Set default value here
                        lat: response?.data?.lat, // Set default value here
                        lng: response?.data?.lng, // Set default value here
                        tipeJalan:
                            response?.data?.tipeJalan +
                            " - " +
                            response?.data?.description,
                        tipeData: response?.data?.type,
                    }));
                    setName(response?.data?.name);
                    setLat(response?.data?.lat);
                    setLng(response?.data?.lng);
                    setDataLat(response?.data?.lat);
                    setDataLng(response?.data?.lng);
                    // Set selected options here
                    setSelectedOption(
                        response?.data?.tipeJalan +
                            " - " +
                            response?.data?.description
                    );
                    setSelectedOptionTipeData(response?.data?.type);
                })
                .catch((error) => {
                    setData(error);
                    console.error("Error fetching address data", error);
                });
        }
        console.log("id", id);
        console.log("data", editData);
    }, [id]);
    const submit = (e) => {
        e.preventDefault();

        if (data.id !== "") {
            post(route("node.update",id));
        }else{
            post(route("node.create"));
        }
        setOpenModal(false);
        data.id="",
        data.name="",
        data.lng="",
        data.tipeJalan="",
        data.tipeData="",
        setSelectedOption(null);
        setSelectedOptionTipeData(null);
        // console.log("e",e)
    };
    const submitDelete = (e) => {
        e.preventDefault();

        post(route("node.delete",id));
        setId("");
        setDeleteModal(false);
        // console.log("e",e)
    };
    function getClassName(active) {
        if (active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-indigo-600 focus:border-primary focus:text-primary bg-indigo-700 text-white";
        } else {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-indigo-700 hover:text-white focus:border-primary focus:text-primary";
        }
    }
    const optionJenisJalan = [
        {
            value: "1 -  Jalan Arteri Primer",
            label: "1 -  Jalan Arteri Primer",
        },
        {
            value: "2 -  Jalan Arteri Sekunder",
            label: "2 -  Jalan Arteri Sekunder",
        },
        {
            value: "3 - Jalan Kolektor  Primer",
            label: "3 - Jalan Kolektor  Primer",
        },
        {
            value: "4 - Jalan Kolektor  Sekunder",
            label: "4 - Jalan Kolektor  Sekunder",
        },
        {
            value: "5 -  Jalan Lokal Primer",
            label: "5 -  Jalan Lokal Primer",
        },
        {
            value: "6 -  Jalan Lokal Sekunder",
            label: "6 -  Jalan Lokal Sekunder",
        },
        {
            value: "7 - Jalan Lingkungan  Primer",
            label: "7 - Jalan Lingkungan  Primer",
        },
        {
            value: "8 - Jalan Lingkungan  Sekunder",
            label: "8 - Jalan Lingkungan  Sekunder",
        },
    ];
    const optionJenisData = [
        {
            value: "Kantor",
            label: "Kantor",
        },
        {
            value: "Jalan",
            label: "Jalan",
        },
    ];
    useEffect(() => {
        if (selectedOptionTipeData === "Jalan") {
            setIsJalan(true);
        } else {
            setIsJalan(false);
        }
    }, [selectedOptionTipeData]);
    useEffect(() => {
        setTipeData(props?.page ?? "semua")
    }, []);
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
                                        <p className="text-gray-600 mt-2 text-justify">
                                            Node dalam algoritma A* dan Dijkstra
                                            adalah simpul atau titik pada graf
                                            yang digunakan untuk mencari jalur
                                            terpendek antara dua titik. Pada
                                            algoritma A*, setiap simpul memiliki
                                            dua nilai, yaitu nilai g(n) yang
                                            merupakan jarak terpendek dari
                                            simpul awal ke simpul n, dan nilai
                                            h(n) yang merupakan estimasi jarak
                                            terpendek dari simpul n ke simpul
                                            tujuan. Sedangkan pada algoritma
                                            Dijkstra, setiap simpul memiliki
                                            nilai jarak terpendek dari simpul
                                            awal ke simpul tersebut.
                                        </p>
                                        <div className="m-4">
                                            <span className="mr-4 text-lg font-semibold">
                                                Filter Tipe Data
                                            </span>
                                            <div className="flex flex-wrap mt-1 items-center">
                                                <Link
                                                    className={getClassName(
                                                        tipeData === "semua"
                                                            ? true
                                                            : false
                                                    )}
                                                    href={route("node.index")}
                                                    onClick={() => {
                                                        setTipeData("semua");
                                                    }}
                                                >
                                                    Semua
                                                </Link>
                                                <Link
                                                    className={getClassName(
                                                        tipeData === "Kantor"
                                                            ? true
                                                            : false
                                                    )}
                                                    href={route(
                                                        "node.filter",
                                                        "Kantor"
                                                    )}
                                                    onClick={() => {
                                                        setTipeData("Kantor");
                                                    }}
                                                >
                                                    Kantor
                                                </Link>

                                                <Link
                                                    className={getClassName(
                                                        tipeData === "Kejadian"
                                                            ? true
                                                            : false
                                                    )}
                                                    href={route(
                                                        "node.filter",
                                                        "Kejadian"
                                                    )}
                                                    onClick={() => {
                                                        setTipeData("Kejadian");
                                                    }}
                                                >
                                                    Tempat Kejadian
                                                </Link>

                                                <Link
                                                    className={getClassName(
                                                        tipeData === "Jalan"
                                                            ? true
                                                            : false
                                                    )}
                                                    href={route(
                                                        "node.filter",
                                                        "Jalan"
                                                    )}
                                                    onClick={() => {
                                                        setTipeData("Jalan");
                                                    }}
                                                >
                                                    Jalan
                                                </Link>
                                            </div>
                                        </div>
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
                                <TableData
                                    datas={datas}
                                    tipeData={tipeData}
                                    setOpenModal={setOpenModal}
                                    setId={setId}
                                    setDeleteModal={setDeleteModal}
                                />
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
            <Modal
                show={openModal}
                setShow={setOpenModal}
                jenis={id === "" ? "Tambah" : "Edit"}
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
                                        label={isJalan ? "Nama Jalan" : "Nama"}
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={name || data?.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />
                                    {/* <Label label={"Jenis Data"} /> */}
                                    <Select
                                        selectedValue={
                                            setSelectedOptionTipeData
                                        }
                                        defaultValue={selectedOptionTipeData}
                                        // onChange={(e) => {
                                        //     setSelectedOptionTipeData(e.value);
                                        // }}
                                        node={optionJenisData}
                                        // isSearchable={false}
                                        label={"Jenis Data"}
                                    />

                                    {isJalan && (
                                        <>
                                            <Select
                                                selectedValue={
                                                    setSelectedOption
                                                }
                                                defaultValue={selectedOption}
                                                // onChange={(e) => {
                                                //     setSelectedOptionTipeData(e.value);
                                                // }}
                                                node={optionJenisJalan}
                                                // isSearchable={false}
                                                label={"Jenis Jalan"}
                                            />
                                        </>
                                    )}
                                    <TextInput
                                        label={"Latitude"}
                                        id="Latitude"
                                        type="text"
                                        name="Latitude"
                                        value={lat || data?.lat}
                                        // onChange={(e) => setData("lat", dataLat)}
                                        disabled
                                    />
                                    <TextInput
                                        label={"Longtitude"}
                                        id="Longtitude"
                                        type="text"
                                        name="Longdata.nametitude"
                                        value={lng || data?.lng}
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
                                dataNode={props?.node}
                                icon={props?.icon}
                                Koordinat={
                                    id !== "" ? { lat: lat, lng: lng } : null
                                }
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
            <Modal
                show={deleteModal}
                setShow={setDeleteModal}
                jenis={deleteModal}
                title={"Hapus Node"}
                size={"sm"}
            >
                <div className="text-center text-lg">
                    Yakin Akan Menghapus Data?
                </div>
                <form onSubmit={submitDelete}>
                    <div className="flex items-center gap-3 p-4 mt-5 border-t">
                        <button
                            className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                            // onClick={() => setOpenModal(false)}
                            type="submit"
                        >
                            Ya
                        </button>
                        <button
                            className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                            onClick={() => {
                                setDeleteModal(false);
                                setId("");
                            }}
                        >
                            Tidak
                        </button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
