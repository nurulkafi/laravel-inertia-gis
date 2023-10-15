import { useState } from "react";

export default function Select({node,label,value}) {
    return (
        <>
            <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <select
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e)=>{
                    value(e.target.value)
                }}
            >
                <option selected>Pilih</option>
                {node.map((value, key) => (
                    <option key={key} value={value.id}>
                        {value.name}
                    </option>
                ))}
            </select>
        </>
    );
};
