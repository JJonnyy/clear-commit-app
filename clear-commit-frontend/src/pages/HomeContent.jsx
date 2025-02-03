import {Link} from "react-router-dom";

export const HomeContent = () => {
    const apps = [
        { id: 1, name: 'Clear Comments', icon: '🧹', description: 'Remove comments from code', path: '/app/clear-comments', active: true },
        { id: 2, name: 'Format Code', icon: '📝', description: 'Format and beautify code' },
        { id: 3, name: 'Minify', icon: '📦', description: 'Minify code and reduce size' },
        { id: 4, name: 'Analyze', icon: '📊', description: 'Code analysis tools' },
    ];
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {apps.map((app) => (
                (app.path) ? (
                        <Link to={app.path} key={app.id}>
                            <div
                                key={app.id}
                                className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300 ${app.active ? 'border border-indigo-500' : '' }`}
                            >
                                <div className="flex flex-col items-center text-center">
                                    <span className="text-4xl mb-4">{app.icon}</span>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">{app.name}</h3>
                                    <p className="text-sm text-gray-500">{app.description}</p>
                                </div>
                            </div>
                        </Link>) :
                    <div
                        key={app.id}
                        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex flex-col items-center text-center">
                            <span className="text-4xl mb-4">{app.icon}</span>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">{app.name}</h3>
                            <p className="text-sm text-gray-500">{app.description}</p>
                        </div>
                    </div>
            ))}
        </div>
    );
};