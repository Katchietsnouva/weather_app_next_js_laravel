export const SkeletonLoader = () => {
    return (
        <div className="bg-gray-800 p-8 w-1/4 rounded-3xl shadow-2xl flex flex-col items-center justify-between space-y-8">
            <div className="animate-pulse w-full h-64 bg-gray-600 rounded-2xl mb-4"></div>
            <div className="animate-pulse w-full h-8 bg-gray-600 rounded mb-2"></div>
            <div className="animate-pulse w-32 h-8 bg-gray-600 rounded"></div>
        </div>
    );
};
