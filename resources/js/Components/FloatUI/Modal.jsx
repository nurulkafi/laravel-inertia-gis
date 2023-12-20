

export default function Modal ({show,setShow,jenis,title,children,size="xl"}) {
    // const [show, setState] = useState(true);

    return show ? (
        <div className="fixed inset-0 z-10 overflow-y-auto ">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => {
                    setShow(false);
                }}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div
                    className={`relative w-full ${
                        size === "sm" ? "max-w-md" : "max-w-7xl"
                    } mx-auto bg-white rounded-md shadow-lg`}
                >
                    <div className="flex items-center justify-between p-4 border-b">
                        <h4 className="text-lg font-medium text-gray-800">
                            {title === "Hapus Node"
                                ? title
                                : `Form ${jenis} ${title}`}
                        </h4>
                        <button
                            className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                            onClick={() => {
                                setShow(false);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 mx-auto"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
};
