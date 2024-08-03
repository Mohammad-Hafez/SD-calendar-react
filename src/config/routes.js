import { Routes, Route } from "react-router-dom";
import Notfound from "../Components/Notfound/Notfound";
import Appointments from "../Components/Appointments/Appointments";
import BookDate from "../Components/BookDate/BookDate";

const Routers = () => {
    return (
        <Routes>
                {/* Public Routes */}
                <Route index element={<Appointments />}></Route>
                <Route path="appointments" element={<Appointments />}></Route>
                <Route path="book-date" element={<BookDate />}></Route>
                {/* Not Found Route */}
                <Route path="*" element={<Notfound />}></Route>
        </Routes>
    )
}
export default Routers;