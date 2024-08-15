
const RouteNotFound = () => {
    return (
        <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center mt-32">
            <h2 className="text-3xl font-semibold text-center">404 - Page Not Found</h2>
            <p className="text-lg text-gray-700 text-center mt-4">Sorry, the page you are looking for does not exist.</p>
        </div>
    );
};

export default RouteNotFound;