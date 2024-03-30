import React, { createContext } from "react"
import PropTypes from "prop-types"

const StyleContex = createContext(false, false, false, {}, () => {})

export default StyleContex


export const StyleProvider = ({ children }) => {
    const containerBox = "shadow sm:overflow-hidden sm:rounded-md"

    const containerStyle = {
        component: "lg:grid lg:grid-cols-3 lg:gap-6",
        left: "lg:col-span-1 px-4 sm:px-0",
        right: "mt-5 lg:col-span-2 lg:mt-0 lg:w-full",
        leftComponent: "grid grid-cols-2 gap-0 mt-2",
        twoComponents: "md:grid md:grid-cols-1 md:gap-10",
        rightContainer: containerBox
    }


    const header = "font-bold leading-tight"
    const headerMargin = "mt-3 mb-5"
    const headerStyle = {
        h1: `${header} ${headerMargin} text-xl md:text-2xl lg:text-3xl`,
        h2: `${header} ${headerMargin} text-l md:text-xl lg:text-2xl`,
        h3: `${header} ${headerMargin} text-m md:text-l lg:text-xl`,
        h4: `${header} mt-1 text-m md:text-l lg:text-xl`
    }

    const button = "inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    const buttonStyle = {
        activ: `${button} opacity-100`,
        inactiv: `${button} opacity-30`,
        icon: "ml-2"
    }

    const inputStyle = "block w-full rounded-md border-0 mt-1 px-2 py-1.5 dark:bg-neutral-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    const smSplit = "col-span-6 sm:col-span-3"
    const formStyle = {
        form: `mt-5 md:col-span-2 md:mt-0 md:w-full ${containerBox}`,
        header: "bg-gray-50 dark:bg-neutral-700 px-1 py-3 text-right sm:px-3",
        container: "w-full mt-2 mb-4 px-3 sm:px-6 sm:grid sm:grid-cols-6 gap-y-8 gap-x-6",
        fullComponent: "sm:col-span-6",
        fullSMhalf: smSplit,
        label: "block text-sm font-medium leading-6",
        input: inputStyle,
        textArea: `${inputStyle} resize-none`,
        select: inputStyle,
    }

    const descriptionStyle = {
        container: "w-full",
        dl: "grid sm:grid-cols-4 sm:gap-4",
        dt: "text-sm font-medium",
        dd: "mt-1 text-sm sm:mt-0",
        infoContainerFull: "py-5 sm:col-span-4",
        infoContainerHalf: "py-5 sm:col-span-2",
    }

    const tableStyle = {
        container: `min-w-full ${containerBox}`,
        overflow: "overflow-x-auto",
        table: "table-auto overflow-scroll min-w-full",
        head: "border-b",
        th: "text-sm font-medium px-3 py-4 text-left",
        tr: "border-b odd:bg-gray-100 dark:odd:bg-neutral-700",
        td: "text-sm font-light px-3 py-4 whitespace-nowrap",
        editButton: "mx-2",
    }

    const pageMenuStyle = {
        container: `bg-gray-50 dark:bg-neutral-800 px-1 py-3 text-left sm:px-3 ${containerBox} mt-5 md:col-span-2 md:mt-1`,
    }


    let contexData = {
        headerStyle,
        buttonStyle,
        tableStyle,
        pageMenuStyle,
        containerStyle,
        formStyle,
        descriptionStyle
    }

    return <StyleContex.Provider value={contexData}>{children}</StyleContex.Provider>
}

StyleContex.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}
