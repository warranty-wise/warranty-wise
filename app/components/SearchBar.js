import { IoIosSearch } from "react-icons/io";
import colors from "tailwindcss/colors";
const AutocompleteSearchBar  = ({query, setQuery}) => {
    return (
        <div
            style={{
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "600px",
                display: "flex",
                justifyContent: "start",
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
                onChange={(e) => setQuery(e.target.value)}
                style={{
                    width: "100%",
                    border: 'none',
                    color: 'black',
                    backgroundColor: 'white',
                    zIndex: "1",
                }}
            />
        </div>
    );
}
export default AutocompleteSearchBar