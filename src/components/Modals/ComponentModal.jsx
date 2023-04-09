import React, { useEffect } from "react"
import PropTypes from "prop-types"

export default function Modal({ onClose, show, header, content }) {
    const closeOnEscapeKeyDown = (e) => {
        if ((e.charCode || e.keyCode) === 27) {
            onClose()
        }
    }

    useEffect(() => {
        document.body.addEventListener("keydown", closeOnEscapeKeyDown)
        return function cleanup() {
            document.body.removeEventListener("keydown", closeOnEscapeKeyDown)
        }
    }, [])
    if (!show) {
        return null
    }
    return (
        <div
            className="modal fixed left-0 top-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={onClose}
            aria-hidden="true"
        >
            <div
                className="modal-content w-5/6 bg-white sm:w-4/6 md:w-3/6"
                onClick={(e) => {
                    e.stopPropagation()
                }}
                aria-hidden="true"
            >
                <div className="modal-header p-3">
                    <h4 className="modal-title">{header}</h4>
                </div>
                <div className="modal-body p-3">{content}</div>
                <div className="modal-footer p-3">
                    <button
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                        type="button"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    header: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}
