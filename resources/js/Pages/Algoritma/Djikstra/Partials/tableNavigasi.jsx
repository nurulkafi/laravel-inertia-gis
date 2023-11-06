import Pagination from "@/Components/Pagination";
export default function TableNavigasi({ fastRoute, alternatifRoute, execution_time }) {

    // Inisialisasi totalDistanceFast ke 0
    let totalDistanceFast = 0;
    let totalDistanceAlternatif = 0;

    return (
        <>
            {fastRoute && (
                <div>
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Fastes Route
                    </h3>
                    <div className="mt-5 shadow-sm border rounded-lg overflow-x-auto">
                        <table className="w-full table-auto text-sm text-left">
                            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                                <tr>
                                    <th className="py-3 px-6">Langkah</th>
                                    <th className="py-3 px-6">Start</th>
                                    <th className="py-3 px-6">End</th>
                                    <th className="py-3 px-6">Jarak</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 divide-y">
                                {fastRoute?.map((item, idx) => {
                                    // Tambahkan jarak ke totalDistanceFast
                                    totalDistanceFast += parseFloat(
                                        item.distance
                                    );

                                    return (
                                        <tr key={idx}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {idx + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.nameStart}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.nameEnd}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.distance} km
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
                                        {totalDistanceFast} km
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="px-6 py-4 whitespace-nowrap font-bold text-lg"
                                    >
                                        Total Execution Time :
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {execution_time} <b>Detik</b>
                                    </td>
                                </tr>
                            </tbody>
                            {/* <Pagination class="mt-6" links={alternatifRoute.links} /> */}
                        </table>
                    </div>
                </div>
            )}

            {alternatifRoute?.map((item, idx) => (
                <div key={idx}>
                    <h3 className="mt-5 text-gray-800 text-xl font-bold sm:text-2xl">
                        Alternatif Route {idx + 1}
                    </h3>
                    <div className="mt-5 shadow-sm border rounded-lg overflow-x-auto">
                        <table className="w-full table-auto text-sm text-left">
                            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                                <tr>
                                    <th className="py-3 px-6">Langkah</th>
                                    <th className="py-3 px-6">Start</th>
                                    <th className="py-3 px-6">End</th>
                                    <th className="py-3 px-6">Jarak</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 divide-y">
                                {item?.map((item2, idx2) => {
                                    // Tambahkan jarak ke totalDistanceFast
                                    totalDistanceFast += parseFloat(
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
                                                {item2.distance} km
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
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </>
    );
}
