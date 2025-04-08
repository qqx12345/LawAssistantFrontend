import { memo } from "react"
import type { FormFieldProps } from "./types"

const FormField = memo(
  ({ label, id, value, onChange, placeholder = "", textarea = false, className = "" }: FormFieldProps) => {
    return (
      <div className={`space-y-1 ${className}`}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {textarea ? (
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{ height: "30px", minHeight: "30px" }}
            className="w-full px-3 py-1 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] bg-white text-gray-800 placeholder-gray-500 overflow-auto transition-all duration-200 ease-in-out hover:border-gray-300 text-sm max-h-[120px]"
            rows={1}
          />
        ) : (
          <input
            id={id}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{ height: "30px" }}
            className="w-full px-3 py-1 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] bg-white text-gray-800 placeholder-gray-500 transition-all duration-200 ease-in-out hover:border-gray-300 text-sm"
          />
        )}
      </div>
    )
  },
)

FormField.displayName = "FormField"

export default FormField
