import { useState } from "react";

export default function Label({ label }) {
    return (
        <>
            <label
                for="countries"
                className="block mb-1 mt-2 text-md font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
        </>
    );
}
