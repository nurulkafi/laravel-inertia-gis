import Pagination from "@/Components/Pagination";
import { parse } from "postcss";
export default function TableNavigasi({
    fastRoute = null,
    alternatifRoute = null,
    execution_time,
}) {
    // Inisialisasi totalDistanceFast dan totalDistanceAlternatif ke 0
    let totalDistanceFast = 0;
    let totalDistanceAlternatif = 0;

    return (
        <>
            {fastRoute !== null ? (
                <div>
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Rute Tercepat
                    </h3>
                    <div className="mt-5 shadow-sm border rounded-lg overflow-x-auto">
                        <table className="w-full table-auto text-sm text-left">
                            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                                <tr>
                                    <th className="py-3 px-6">Langkah</th>
                                    <th className="py-3 px-6">Start</th>
                                    <th className="py-3 px-6">End</th>
                                    <th className="py-3 px-6">Jarak</th>
                                    <th className="py-3 px-6">
                                        Tingkat Kemacetan
                                    </th>
                                    <th className="py-3 px-6">
                                        Bobot Jenis Jalan
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 divide-y">
                                {fastRoute.map((item, idx) => {
                                    // Initialize totalDistanceFast before using it
                                    let totalDistanceFast = 0;

                                    // Tambahkan jarak ke totalDistanceFast
                                    totalDistanceFast += parseFloat(
                                        item?.distance
                                    );

                                    return (
                                        <tr key={idx}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {idx + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item?.nameStart}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item?.nameEnd}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {parseFloat(
                                                    item.distance
                                                ).toFixed(2)}{" "}
                                                km
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {parseFloat(
                                                    item?.tingkatKemacetanStart
                                                ) +
                                                    parseFloat(
                                                        item?.tingkatKemacetanEnd
                                                    )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {parseFloat(
                                                    item?.tipeJalanStart
                                                ) +
                                                    parseFloat(
                                                        item?.tipeJalanEnd
                                                    )}
                                            </td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="px-6 py-4 whitespace-nowrap text-right font-bold text-lg"
                                    >
                                        Total
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {totalDistanceFast.toFixed(2)} km
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="px-6 py-4 whitespace-nowrap font-bold text-lg"
                                    >
                                        Total Waktu Eksekusi:
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {execution_time} <b>Detik</b>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                    Rute Tidak Ditemukan!
                </h3>
            )}

            {alternatifRoute?.map((item, idx) => {
                // Inisialisasi totalDistanceAlternatif ke 0 untuk setiap iterasi alternatifRoute
                totalDistanceAlternatif = 0;

                return (
                    <div key={idx}>
                        <h3 className="mt-5 text-gray-800 text-xl font-bold sm:text-2xl">
                            Rute Alternatif {idx + 1}
                        </h3>
                        <div className="mt-5 shadow-sm border rounded-lg overflow-x-auto">
                            <table className="w-full table-auto text-sm text-left">
                                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                                    <tr>
                                        <th className="py-3 px-6">Langkah</th>
                                        <th className="py-3 px-6">Start</th>
                                        <th className="py-3 px-6">End</th>
                                        <th className="py-3 px-6">Jarak</th>
                                        <th className="py-3 px-6">
                                            Tingkat Kemacetan
                                        </th>
                                        <th className="py-3 px-6">
                                            Bobot Jenis Jalan
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 divide-y">
                                    {item?.map((item2, idx2) => {
                                        // Tambahkan jarak ke totalDistanceAlternatif
                                        totalDistanceAlternatif += parseFloat(
                                            item2.distance
                                        );

                                        return (
                                            <tr key={idx2}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {idx2 + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item2.nameStart}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item2.nameEnd}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {parseFloat(
                                                        item2.distance
                                                    ).toFixed(2)}{" "}
                                                    km
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {parseFloat(
                                                        item2?.tingkatKemacetanStart
                                                    ) +
                                                        parseFloat(
                                                            item2?.tingkatKemacetanEnd
                                                        )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {parseFloat(
                                                        item2?.tipeJalanStart
                                                    ) +
                                                        parseFloat(
                                                            item2?.tipeJalanEnd
                                                        )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="px-6 py-4 whitespace-nowrap text-right font-bold text-lg"
                                        >
                                            Total
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {totalDistanceAlternatif.toFixed(2)}{" "}
                                            km
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
