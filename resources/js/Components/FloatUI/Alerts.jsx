import React, { useState, useEffect } from "react";

export default function Alerts({ type, message,show=true }) {
    const [showAlert, setShowAlert] = useState(show);
    console.log("showAlert", showAlert);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowAlert(false);
        }, 5000); // Tampilkan selama 5 detik

        return () => {
            clearTimeout(timeout);
        };
    }, [showAlert]);

    // Fungsi untuk mendapatkan kelas warna latar belakang berdasarkan jenis pemberitahuan
    const getBackgroundColorClass = () => {
        if (type === "success") {
            return "bg-green-50"; // Ganti dengan kelas CSS warna latar belakang yang sesuai
        } else if (type === "failed") {
            return "bg-red-50"; // Ganti dengan kelas CSS warna latar belakang yang sesuai
        }
        return "bg-amber-50"; // Default jika type tidak sesuai
    };

    return (
        <div
            className={`fixed top-4 right-4 z-50 transition-transform ${
                showAlert ? "translate-x-0" : "translate-x-full"
            } duration-500 ease-in-out`}
        >
            {showAlert && (
                <div
                    className={`rounded-md md:max-w-2xl md:mx-auto md:px-8 py-3 ${getBackgroundColorClass()}`}
                >
                    <div className="flex">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 rounded-full text-amber-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="self-center ml-3">
                            <span
                                className={`font-semibold text-${
                                    type === "success" ? "green" : "red"
                                }-600`}
                            >
                                {type === "success" ? "Success" : "Failed"}
                            </span>
                            <p
                                className={`text-${
                                    type === "success" ? "green" : "red"
                                }-600 mt-1`}
                            >
                                {message}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
