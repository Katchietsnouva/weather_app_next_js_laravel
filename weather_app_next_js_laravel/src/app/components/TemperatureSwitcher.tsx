import React from 'react';

interface TemperatureSwitcherProps {
    unit: 'C' | 'F';
    setUnit: (unit: 'C' | 'F') => void;
}

// const TemperatureSwitcher: React.FC<TemperatureSwitcherProps> = ({ unit, setUnit }) => (
//     <div className="">
//         <button onClick={() => setUnit('C')} className={`btn btn-sm border border-blue-100/30 rounded-lg px-4 py-2  hover:bg-blue-600/40 transition-all ${unit === 'C' ? 'btn-active' : ''}`}>
//             °C
//         </button>
//         <button onClick={() => setUnit('F')} className={`btn btn-sm  border border-blue-100/30 rounded-lg px-4 py-2 ml-6 hover:bg-blue-600/40 transition-all ${unit === 'F' ? 'btn-active' : ''}`}>
//             °F
//         </button>
//     </div>
// );

// export default TemperatureSwitcher;



const TemperatureSwitcher: React.FC<TemperatureSwitcherProps> = ({ unit, setUnit }) => (
    <div className="flex gap-4">
        <button
            onClick={() => setUnit('C')}
            className={`btn btn-sm border border-blue-100/30 rounded-lg px-4 py-2 transition-all ${unit === 'C' ? 'bg-orange-500/40 hover:bg-orange-500/50 border-none text-white' : 'bg-gray-800 text-gray-300 hover:bg-blue-600/40'
                }`}
        >
            °C
        </button>
        <button
            onClick={() => setUnit('F')}
            className={`btn btn-sm border border-blue-100/30 rounded-lg px-4 py-2 transition-all ${unit === 'F' ? 'bg-orange-500/40 hover:bg-orange-500/50 border-none  text-white' : 'bg-gray-800 text-gray-300 hover:bg-blue-600/40'
                }`}
        >
            °F
        </button>
    </div>
);

export default TemperatureSwitcher;
