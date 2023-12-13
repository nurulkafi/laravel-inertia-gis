import Modal from "@/Components/FloatUI/Modal";
import MapboxMap from "@/Components/MapBox";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/FloatUI/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Pagination from "@/Components/Pagination";
import TableNavigasi from "./Partials/tableNavigasi";
// import Select from "@/Components/FloatUI/Select";
// import Select from "react-select";
// import TableData from "./Partials/tableData";
import Select from "react-tailwindcss-select";
import Label from "@/Components/FloatUI/Label";
export default function Index(props) {
    const auth = props.auth;
    const node = props.node;
    const algoritma = props.algoritma;
    console.log("props?.icon", props?.icon);
    const [openModal, setOpenModal] = useState(false);
    const [dataLat, setDataLat] = useState("");
    const [dataLng, setDataLng] = useState("");
    const [dataCityName, setDataCityName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [dataAlgoritma, setDataAlgoritma] = useState(false);
    const [titikMulai, setTitikMulai] = useState(null);
    const [titikTujuan, setTitikTujuan] = useState(null);
    useEffect(() => {
        if (titikMulai !== null && titikTujuan !== null) {
            axios
                .get(
                    `http://localhost:8000/api/astar/result/${titikMulai?.value}/${titikTujuan?.value}`
                )

                .then((response) => {
                    setDataAlgoritma(response.data);
                    // console.log('response',response.data)
                })
                .catch((error) => {
                    setData(error);
                    console.error("Error fetching address data", error);
                });
        }
    }, [titikMulai, titikTujuan]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Finding Routes Using Algorithms A-Star
                </h2>
            }
        >
            <Head title="Finding Routes Using Algorithms A-Star" />

            <section className="py-2 pl-20 ml-20">
                <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <ul className="mt-16">
                        <li className="border rounded-lg">
                            <div className="max-w-screen-xl mx-auto px-4 md:px-8  p-10">
                                <div className="items-start justify-between md:flex">
                                    <div className="max-w-lg">
                                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                                            Finding Routes Using Algorithms
                                            A-Star
                                        </h3>
                                        <p className="text-gray-600 mt-2">
                                            A* (atau disebut A-star) adalah
                                            algoritma pencarian jalur yang
                                            digunakan untuk menemukan jalur
                                            terpendek atau solusi terbaik dalam
                                            grafik atau peta. Algoritma ini
                                            menggabungkan pendekatan Greedy
                                            Best-First Search (GBFS) dengan
                                            biaya terakumulasi dan
                                            heuristik(Algoritma Haversine) untuk
                                            memandu pencarian
                                        </p>
                                    </div>
                                </div>
                                {/* <TableData datas={datas} /> */}
                                <div className="mt-10">
                                    <Label label={"Titik Mulai"} />
                                    <Select
                                        value={titikMulai}
                                        onChange={(e) => {
                                            setTitikMulai(e);
                                        }}
                                        // onChange={handleChange}
                                        // options={options}
                                        options={node?.map((item) => {
                                            return {
                                                value: item.id,
                                                label:
                                                    item.id + " - " + item.name,
                                            };
                                        })}
                                        isSearchable={true}
                                    />
                                    <Label label={"Titik Tujuan"} />
                                    <Select
                                        value={titikTujuan}
                                        onChange={(e) => {
                                            setTitikTujuan(e);
                                        }}
                                        // options={options}
                                        options={node?.map((item) => {
                                            return {
                                                value: item.id,
                                                label:
                                                    item.id + " - " + item.name,
                                            };
                                        })}
                                        isSearchable={true}
                                    />
                                    {/* <Select
                                        node={node}
                                        label={"Titik Mulai"}
                                        value={setTitikMulai}
                                    />
                                    <Select
                                        node={node}
                                        label={"Tujuan"}
                                        value={setTitikTujuan}
                                    /> */}
                                </div>
                                <div className="mt-10">
                                    <MapboxMap
                                        api_token={props.map_token}
                                        usageFor="Algoritma"
                                        dataNode={node}
                                        dataAlgoritma={dataAlgoritma}
                                        icon={props?.icon}
                                    />
                                </div>
                                <div className="mt-10">
                                    <TableNavigasi
                                        fastRoute={
                                            dataAlgoritma?.result_algoritma_shortpath
                                        }
                                        execution_time={
                                            dataAlgoritma?.shortpath
                                                ?.execution_time
                                        }
                                        alternatifRoute={
                                            dataAlgoritma?.result_all_path
                                        }
                                    />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
