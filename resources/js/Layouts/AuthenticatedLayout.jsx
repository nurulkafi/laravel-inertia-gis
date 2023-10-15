import { useState, useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import Alerts from "@/Components/FloatUI/Alerts";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const { flash } = usePage().props;
    var boolean = 0;
    // const [modifiedFlash, setModifiedFlash] = useState("");
    const navigation = [
        {
            href: "/dashboard",
            name: "Dashboard",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                    />
                </svg>
            ),
        },
        {
            href: "/node",
            name: "Node",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
                    />
                </svg>
            ),
        },
        {
            href: "/graph",
            name: "Graph",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
                    />
                </svg>
            ),
        },
    ];

    const navsFooter = [
        {
            href: "javascript:void(0)",
            name: "Help",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                </svg>
            ),
        },
        {
            href: "javascript:void(0)",
            name: "Settings",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            ),
        },
        {
            href: "javascript:void(0)",
            name: "Logout",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                </svg>
            ),
        },
    ];

    if (flash.type) {
        if (flash.type) {
            const commonToastOptions = {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // onOpen: () => window.alert("Called when I open"),
            };

            if (flash.type === "success") {
                toast.success(flash.message, commonToastOptions);
            }
            if (flash.type === "error") {
                toast.error(flash.message, commonToastOptions);
            }

            flash.type = null;
            flash.message = null;
        }
    }
    return (
        <>
            {/* {flash.type && flash.message && (
                <Alerts
                    type={flash.type}
                    message={flash.message}
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                />
            )} */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <nav className="fixed top-0 left-0 w-full h-full border-r bg-white space-y-8 sm:w-80">
                <div className="flex flex-col h-full">
                    <div className="h-20 flex items-center px-8">
                        <a href="javascript:void(0)" className="flex-none">
                            <img
                                src="https://floatui.com/logo.svg"
                                width={140}
                                className="mx-auto"
                            />
                        </a>
                    </div>
                    <div className="flex-1 flex flex-col h-full overflow-auto">
                        <ul className="px-4 text-sm font-medium flex-1">
                            {navigation.map((item, idx) => (
                                <li key={idx}>
                                    {/* <a
                                        href={item.href}
                                        className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                                    >
                                        <div className="text-gray-500">
                                            {item.icon}
                                        </div>
                                        {item.name}
                                    </a> */}
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                                    >
                                        <div className="text-gray-500">
                                            {item.icon}
                                        </div>
                                        {item.name}
                                        {/* <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" /> */}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div>
                            <ul className="px-4 pb-4 text-sm font-medium">
                                {navsFooter.map((item, idx) => (
                                    <li key={idx}>
                                        <a
                                            href={item.href}
                                            className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                                        >
                                            <div className="text-gray-500">
                                                {item.icon}
                                            </div>
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="py-4 px-4 border-t">
                                <div className="flex items-center gap-x-4">
                                    <img
                                        src="https://randomuser.me/api/portraits/women/79.jpg"
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <span className="block text-gray-700 text-sm font-semibold">
                                            Alivika tony
                                        </span>
                                        <a
                                            href="javascript:void(0)"
                                            className="block mt-px text-gray-600 hover:text-indigo-600 text-xs"
                                        >
                                            View profile
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <main>{children}</main>
        </>

        // <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        //     <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        //             <div className="flex justify-between h-16">
        //                 <div className="flex">
        //                     <div className="shrink-0 flex items-center">
        //                         <Link href="/">
        //                             <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
        //                         </Link>
        //                     </div>

        //                     <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
        //                         <NavLink href={route('dashboard')} active={route().current('dashboard')}>
        //                             Dashboard
        //                         </NavLink>
        //                     </div>
        //                 </div>

        //                 <div className="hidden sm:flex sm:items-center sm:ml-6">
        //                     <div className="ml-3 relative">
        //                         <Dropdown>
        //                             <Dropdown.Trigger>
        //                                 <span className="inline-flex rounded-md">
        //                                     <button
        //                                         type="button"
        //                                         className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
        //                                     >
        //                                         {user.name}

        //                                         <svg
        //                                             className="ml-2 -mr-0.5 h-4 w-4"
        //                                             xmlns="http://www.w3.org/2000/svg"
        //                                             viewBox="0 0 20 20"
        //                                             fill="currentColor"
        //                                         >
        //                                             <path
        //                                                 fillRule="evenodd"
        //                                                 d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        //                                                 clipRule="evenodd"
        //                                             />
        //                                         </svg>
        //                                     </button>
        //                                 </span>
        //                             </Dropdown.Trigger>

        //                             <Dropdown.Content>
        //                                 <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
        //                                 <Dropdown.Link href={route('logout')} method="post" as="button">
        //                                     Log Out
        //                                 </Dropdown.Link>
        //                             </Dropdown.Content>
        //                         </Dropdown>
        //                     </div>
        //                 </div>

        //                 <div className="-mr-2 flex items-center sm:hidden">
        //                     <button
        //                         onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
        //                         className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
        //                     >
        //                         <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        //                             <path
        //                                 className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
        //                                 strokeLinecap="round"
        //                                 strokeLinejoin="round"
        //                                 strokeWidth="2"
        //                                 d="M4 6h16M4 12h16M4 18h16"
        //                             />
        //                             <path
        //                                 className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
        //                                 strokeLinecap="round"
        //                                 strokeLinejoin="round"
        //                                 strokeWidth="2"
        //                                 d="M6 18L18 6M6 6l12 12"
        //                             />
        //                         </svg>
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>

        //         <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
        //             <div className="pt-2 pb-3 space-y-1">
        //                 <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
        //                     Dashboard
        //                 </ResponsiveNavLink>
        //             </div>

        //             <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
        //                 <div className="px-4">
        //                     <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
        //                     <div className="font-medium text-sm text-gray-500">{user.email}</div>
        //                 </div>

        //                 <div className="mt-3 space-y-1">
        //                     <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
        //                     <ResponsiveNavLink method="post" href={route('logout')} as="button">
        //                         Log Out
        //                     </ResponsiveNavLink>
        //                 </div>
        //             </div>
        //         </div>
        //     </nav>

        //     {header && (
        //         <header className="bg-white dark:bg-gray-800 shadow">
        //             <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
        //         </header>
        //     )}

        //     <main>{children}</main>
        // </div>
    );
}
