import {Suspense} from 'react'
import {LoadingSpinner} from "./shared/Loader/LoadingSpinner";
import Routes from "./routers";

function App() {
    return (
        <Suspense fallback={
            <LoadingSpinner size={30} align='center'/>
        }>
            <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
                <Routes/>
            </div>
        </Suspense>
    )
}

export default App
