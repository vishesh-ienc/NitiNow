import { useState } from "react";

function ToggleButton() {
    const [onoff, setOnOff] = useState(false);

    return (
        <button>
            {/* From Uiverse.io by Javierrocadev */}
            <label className="relative inline-flex items-center cursor-pointer mr-10">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="group peer ring-0 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full outline-none duration-300 after:duration-300 w-20 h-9  shadow-md peer-checked:from-[#764ba2] peer-checked:to-[#667eea] peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-7 after:w-7 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-11 peer-hover:after:scale-95">
                    <svg className="absolute  top-1 left-10 stroke-gray-900 w-7 h-7" height="100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100" x="0" xmlns="http://www.w3.org/2000/svg" y="0">
                        <path className="svg-fill-primary" d="M50,18A19.9,19.9,0,0,0,30,38v8a8,8,0,0,0-8,8V74a8,8,0,0,0,8,8H70a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H38V38a12,12,0,0,1,23.6-3,4,4,0,1,0,7.8-2A20.1,20.1,0,0,0,50,18Z">
                        </path>
                    </svg>
                    <svg className="absolute top-1 left-1 stroke-gray-900  w-7 h-7" height="100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100" x="0" xmlns="http://www.w3.org/2000/svg" y="0">
                        <path d="M30,46V38a20,20,0,0,1,40,0v8a8,8,0,0,1,8,8V74a8,8,0,0,1-8,8H30a8,8,0,0,1-8-8V54A8,8,0,0,1,30,46Zm32-8v8H38V38a12,12,0,0,1,24,0Z" fillRule="evenodd">
                        </path>
                    </svg>
                </div>
            </label>
        </button>
    );
}

export default ToggleButton;