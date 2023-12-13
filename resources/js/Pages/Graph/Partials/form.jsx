import Modal from "@/Components/FloatUI/Modal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/FloatUI/TextInput";
import MapboxMap from "@/Components/MapBox";
import Select from "@/Components/FloatUI/Select";
import Label from "@/Components/FloatUI/Label";
import ReactSelect from "react-tailwindcss-select";
export default function Form(props) {
    const auth = props.auth;
    const graph = props.graph;
    const node = props.node;
    const unconnectedNodes = props.unconnectedNodes;
    // console.log('gr',graph)
    const [openModal, setOpenModal] = useState(false);
    const [titikMulai, setTitikMulai] = useState(null);
    const [dataOption, setDataOption] = useState(null);
    const [dataNode, setDataNode] = useState(null);
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
        // setOpenModal(false);
        history.push("/graph");
        data.start = "";
        data.end = "";
        data.distance = "";
    };
    const options = [
        { value: 1, label: "Node Yang Belum Terhubung" },
        { value: 2, label: "Node Yang Sudah Terhubung" },
    ];
    useEffect(() => {
        // console.log('dataOption',dataOption?.value)
        if (dataOption?.value === 1) {
            setDataNode(unconnectedNodes);
        }
        else {
            setDataNode(node);
        }
    }, [dataOption]);
    return (
        <>
            <form onSubmit={submit} className="p-12">
                <div>
                    {isLoading ? (
                        <div role="status" className="max-w-sm animate-pulse">
                            {[48, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5].map(
                                (size, index) => (
                                    <div
                                        key={index}
                                        className={`h-${size} bg-gray-200 rounded-full dark:bg-gray-700 ${
                                            index < 6 ? "mb-2.5" : ""
                                        }`}
                                        style={{
                                            maxWidth:
                                                index === 0 ? "48px" : "360px",
                                        }}
                                    ></div>
                                )
                            )}
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <div>
                        <Label label={"Opsi Data"}></Label>
                            <ReactSelect
                                value={dataOption}
                                onChange={(e) => {
                                    setDataOption(e);
                                }}
                                options={options}
                            />
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
                                value={distance}
                                rightSection="km"
                                disabled
                            />
                        </div>
                    )}
                </div>
                <div className="mt-10">
                    <MapboxMap
                        api_token={props.map_token}
                        setDataCityName={setDataCityName}
                        setIsLoading={setIsLoading}
                        usageFor={"Graph"}
                        dataNode={dataNode}
                        dataTitikMulai={NodeTitikMulai}
                        dataTitikTujuan={NodeTitikTujuan}
                        setDistance={setDistance}
                        icon={props?.icon}
                    />
                </div>
                <div className="grid grid-cols-2 gap-2"></div>

                <div className="flex items-center gap-3 p-4 mt-5 border-t">
                    <button
                        className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
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
            ;
        </>
    );
}
