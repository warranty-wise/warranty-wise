import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const SearchBar  = ({ onSearch }) => {
    const [query, setQuery] = useState("")

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value
        setQuery(value)
        onSearch(value)
    }

    return (
        <form
            style={{
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "600px",
                display: "flex",
                justifyContent: "center",
                gap: "0.5em",
                alignItems: "center",
                background: "white",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add this line for box shadow
            }}
        >
            <IoIosSearch className="size-7 invert"/>
            <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e)}
                style={{
                    width: "100%",
                    border: 'none',
                    color: 'black',
                    backgroundColor: 'white',
                    zIndex: "1",
                }}
            />
        </form>
    );
}
export default SearchBar