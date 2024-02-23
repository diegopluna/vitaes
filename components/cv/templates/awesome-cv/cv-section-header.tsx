export default function CVSectionHeader( {label} : {label : string} ) {
    return (
        <div className="flex flex-row w-full mb-2">
            <h2 className="text-2xl font-bold flex flex-row text-nowrap whitespace-nowrap">
                <span className="flex text-[#0395de]">{label.slice(0, 3)}</span>
                <span className="flex">{label.slice(3)}</span>
            </h2>
            <div className="border-b border-black w-full mb-2" />
        </div>
    )
}