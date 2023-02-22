import * as React from "react";
import { Routes, Route } from "react-router-dom";

//lazy load the components
const Main = React.lazy(() => import("../components/Main"));
const Post = React.lazy(() => import("../components/Post"));
const Create = React.lazy(() => import("../components/Create"));

const AppRoutes = () => (

    <React.Suspense fallback={<span>Loading, please wait...</span>}>

        <Routes>
            <Route exact path="/" element= {<Main/>} />
            <Route exact path="/post/:id" element= {<Post/>} />
            <Route exact path="/create" element= {<Create/>} />
        </Routes>


    </React.Suspense>

)

export default AppRoutes;