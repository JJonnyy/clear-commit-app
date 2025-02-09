export const Loading = () => {
    return (
        <div className="bg-purple-100 min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div
                    className="animate-spin rounded-full h-32 w-32 border-t-4 border-purple-500 border-solid mx-auto mb-8"></div>
                <h1 className="text-4xl font-bold text-purple-800 mb-4">Loading...</h1>
                <p className="text-purple-600 text-lg">Please wait while we prepare your content</p>

                <div className="mt-8 flex space-x-2 justify-center">
                    <div className="w-3 h-3 rounded-full bg-purple-400 animate-bounce"></div>
                    <div className="w-3 h-3 rounded-full bg-purple-600 animate-bounce delay-100"></div>
                    <div className="w-3 h-3 rounded-full bg-purple-800 animate-bounce delay-200"></div>
                </div>

                <div className="mt-8 w-64 mx-auto bg-purple-200 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full animate-pulse w-3/4"></div>
                </div>
            </div>
        </div>
    );
}