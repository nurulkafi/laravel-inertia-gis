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
    return (
        <section className="py-2 pl-8 pr-8 mt-5">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8 border-1 bg-white-100 border border-solid border-gray-300 rounded-xl">
                <div className="mb-6 text-center flex items-center justify-center flex-col">
                    <img
                        src={props?.icon?.logo} // Gantilah dengan path gambar yang sesuai
                        alt="Logo"
                        width={200}
                        className="mx-auto mb-2"
                    />
                </div>

                <p className="text-center">
                    Laporan Anda telah berhasil dibuat. Mohon ditunggu, kami
                    akan segera menuju ke tempat kejadian.
                </p>
            </div>
        </section>
    );
}
