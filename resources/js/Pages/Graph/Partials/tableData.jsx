import Pagination from "@/Components/Pagination";
export default function TableData({ datas,setId,setOpenModal,setDeleteModal }) {
    return (
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                    <tr>
                        <th className="py-3 px-6" style={{ width: "1%" }}>
                            No
                        </th>
                        <th className="py-3 px-6">Start</th>
                        <th className="py-3 px-6">End</th>
                        <th className="py-3 px-6">Jarak</th>
                        <th className="py-3 px-6">Aksi</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                    {datas?.data?.map((item, idx) => (
                        <tr key={idx}>
                            <td
                                className="px-6 py-4 whitespace-nowrap"
                                style={{ width: "1%" }}
                            >
                                {idx + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {item.nameStart}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {item.nameEnd}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {parseFloat(item.distance).toFixed(2)} km
                            </td>
                            <td className=" px-6 whitespace-nowrap">
                                <button
                                    type="button"
                                    onClick={()=>{
                                        setId(item.id)
                                        setOpenModal(true)
                                    }}
                                    className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={()=>{
                                        setId(item.id)
                                        setDeleteModal(true)
                                    }}
                                    className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <Pagination class="mt-6" links={datas.links} />
            </table>
        </div>
    );
}
