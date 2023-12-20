import Pagination from "@/Components/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
export default function TableData({
    datas,
    tipeData,
    setOpenModal,
    setId = "",
    setDeleteModal,
}) {
    return (
        <div className="mt-2 shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                    <tr>
                        <th className="py-3 px-6" style={{ width: "1%" }}>
                            No
                        </th>
                        {tipeData === "Kejadian" ? (
                            <th className="py-3 px-6">
                                Nama Pelapor - Jenis Laporan
                            </th>
                        ) : null}
                        <th className="py-3 px-6">Alamat</th>
                        <th className="py-3 px-6">Latitude</th>
                        <th className="py-3 px-6">Longitude</th>
                        {tipeData === "Jalan" ? (
                            <th className="py-3 px-6">Jenis Jalan</th>
                        ) : null}
                        {tipeData === "Jalan" ? (
                            <th className="py-3 px-6">Tingkat Kemacetan</th>
                        ) : null}
                        <th className="py-3 px-6">Aksi</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                    {datas?.data?.map((item, idx) => (
                        <tr key={idx}>
                            <td className="px-6 py-4" style={{ width: "1%" }}>
                                {idx + 1}
                            </td>
                            {tipeData === "Kejadian" ? (
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.description}
                                </td>
                            ) : null}
                            <td className="px-6 py-4 whitespace-nowrap">
                                {item.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {item.lat}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {item.lng}
                            </td>
                            {tipeData === "Jalan" ? (
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.tipeJalan} - {item.description}
                                </td>
                            ) : null}
                            {tipeData === "Jalan" ? (
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.tingkatKemacetan}
                                </td>
                            ) : null}
                            <td className=" px-6 whitespace-nowrap">
                                <button
                                    // href="javascript:void()"
                                    onClick={() => {
                                        setId(item.id);
                                        setOpenModal(true);
                                    }}
                                    className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setId(item.id);
                                        setDeleteModal(true);
                                    }}
                                    className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination class="mt-6" links={datas.links} />
        </div>
    );
}
