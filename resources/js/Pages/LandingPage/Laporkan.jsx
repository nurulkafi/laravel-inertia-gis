import Modal from "@/Components/FloatUI/Modal";
import MapboxMap from "@/Components/MapBox";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/FloatUI/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Pagination from "@/Components/Pagination";
import Select from "react-select";
import Label from "@/Components/FloatUI/Label";
export default function Index(props) {
    const auth = props.auth;
    // const datas = props.datas;
    const [openModal, setOpenModal] = useState(false);
    const [dataLat, setDataLat] = useState("");
    const [dataLng, setDataLng] = useState("");
    const [dataCityName, setDataCityName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        nameOfPelapor: "", // Update the field name
        address: "",
        lat: "",
        lng: "",
        tujuan: "",
    });


    useEffect(() => {
        setData((data) => ({ ...data, name: data.nameOfPelapor }));
        setData((data) => ({ ...data, address: dataCityName }));
        setData((data) => ({ ...data, lat: dataLat }));
        setData((data) => ({ ...data, lng: dataLng }));
        setData((data) => ({ ...data, tujuan: selectedOption }));
    }, [dataLat, dataLng,data.nameOfPelapor,selectedOption]);
    // useEffect(() => {
    //     setData((data) => ({
    //         ...data,
    //         name: nameOfPelapor,
    //         address: dataCityName,
    //         lat: dataLat,
    //         lng: dataLng,
    //         tujuan: selectedOption,
    //     }));
    // }, [data.nameOfPelapor, dataCityName, dataLat, dataLng, selectedOption]);

    const submit = (e) => {
        e.preventDefault();

        post(route("node.create"));
        setOpenModal(false);
        data.name = "";
        data.lat = "";
        data.lng = "";
        data.nameOfPelapor = "";
        setSelectedOption(null)
    };

    const optionsJenisLaporan = [
        { value: "Pencagahan Kabakaran", label: "Pencagahan Kabakaran" },
        { value: "Pemadaman Kebakaran", label: "Pemadaman Kebakaran" },
        {
            value: "Penyelamatan(Kebakaran dan Non Kebakaran)",
            label: "Penyelamatan(Kebakaran dan Non Kebakaran)",
        },
        {
            value: "Pemberdayaan Masyarakat",
            label: "Pemberdayaan Masyarakat",
        },
        {
            value: "Penangan B3 (Bahan berbahaya dan beracun)",
            label: "Penangan B3 (Bahan berbahaya dan beracun)",
        },
    ];

    return (
        <>
            <section className="py-2 pl-20 ml-20 mt-5">
                <div className="max-w-screen-xl mx-auto px-4 md:px-8 border-1 bg-white-100 border border-solid border-gray-300 rounded-xl">
                    <div className="mb-6 text-center flex items-center justify-center flex-col">
                        <img
                            src={props?.icon?.logo} // Gantilah dengan path gambar yang sesuai
                            alt="Firefighter"
                            width={200}
                            className="mx-auto mb-2"
                        />
                        <h1 className="text-2xl">Form Laporan Kebakaran</h1>
                    </div>

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
                                            label={"Nama Pelapor"}
                                            id="nameOfPelapor"
                                            type="text"
                                            name="nameOfPelapor" // Update the name attribute
                                            value={data.nameOfPelapor}
                                            onChange={(e) =>
                                                setData(
                                                    "nameOfPelapor",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <TextInput
                                            label={"Alamat"}
                                            id="address"
                                            type="text"
                                            name="address"
                                            value={data.address}
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <Label label={"Jenis Laporan"} />
                                        <Select
                                            defaultValue={selectedOption}
                                            onChange={(e)=>{
                                                setSelectedOption(e.value);
                                            }}
                                            options={optionsJenisLaporan}
                                            isSearchable={false}
                                        />
                                        {/* <TextInput
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
                                        /> */}
                                    </div>
                                )}
                            </div>

                            <div className="col-span-1">
                                <Label label={"Pilih Lokasi Disini"} />
                                <MapboxMap
                                    api_token={props.map_token}
                                    setDataLat={setDataLat}
                                    setDataLng={setDataLng}
                                    setDataCityName={setDataCityName}
                                    setIsLoading={setIsLoading}
                                    usageFor="Laporan"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 mt-5 border-t">
                            <button
                                className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                                // onClick={() => setOpenModal(false)}
                                type="submit"
                            >
                                Laporkan
                            </button>
                            {/* <button
                                className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                                onClick={() => setOpenModal(false)}
                            >
                                Cancel
                            </button> */}
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
