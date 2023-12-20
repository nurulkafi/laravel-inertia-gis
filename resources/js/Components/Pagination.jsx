import React from "react";

import { Link, usePage } from "@inertiajs/react";

export default function Pagination({ links }) {
    function getClassName(active) {
        if (active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white hover:text-black focus:border-primary focus:text-primary bg-blue-700 text-white";
        } else {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-blue-700 hover:text-white focus:border-primary focus:text-primary text-black";
        }
    }

    return (
        links.length > 3 && (
            <div className="m-4">
                <div className="flex flex-wrap mt-8">
                    {links.map((link, key) =>
                        link.url === null ? (
                            <div className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded">
                                { link.label.replaceAll('&laquo;', '').replaceAll('&raquo;', '') }
                            </div>
                        ) : (
                            <Link
                                className={getClassName(link.active)}
                                href={link.url}
                            >
                                { link.label.replaceAll('&laquo;', '').replaceAll('&raquo;', '') }
                            </Link>
                        )
                    )}
                </div>
            </div>
        )
    );
}
