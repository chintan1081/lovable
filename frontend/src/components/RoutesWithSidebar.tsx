import Cookies from 'js-cookie';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const RoutesWithSidebar = () => {
    const token = Cookies.get("token");
    const [ miniSidebar, setMiniSidebar ] = useState(false);
    return (
        <>
            {
                token ?
                    <div className={`h-screen w-full grid ${ !miniSidebar ? 'grid-cols-[250px_1fr]' : 'grid-cols-[60px_1fr]'}`}>
                        <Sidebar miniSidebar={miniSidebar} setMiniSidebar={setMiniSidebar} />
                        <Outlet />
                    </div>
                    : <Navigate to="/signin" />}
        </>
    )
}

export default RoutesWithSidebar;
