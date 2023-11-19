import {useRoutes} from "react-router-dom";
import LoginRoutes from "./LoginRoutes";

export default function Routes() {
    return useRoutes([LoginRoutes]);
}