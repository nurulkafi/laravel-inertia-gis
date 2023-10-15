import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    {
        type = "text",
        className = "",
        label = "",
        isFocused = false,
        rightSection = "",
        ...props
    },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <>
            <label className="font-medium">{label}</label>
            {rightSection === "" ? (
                <input
                    {...props}
                    // type="text"
                    // required
                    disabled={props.disabled}
                    className={`block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                        props.disabled ? "bg-gray-200" : ""
                    }`}
                />
            ) : (
                <div className="relative">
                    <input
                        {...props}
                        disabled={props.disabled}
                        className={`block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                            props.disabled ? "bg-gray-200" : ""
                        }`}
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 border-1">
                        {props.rightSection}
                        {/* Anda bisa menambahkan props.unit atau teks yang sesuai */}
                    </span>
                </div>
            )}
        </>
    );
});
