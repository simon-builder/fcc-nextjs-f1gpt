import { title } from "process";
import "./global.css";

export const metadata = {
    title: "UFCGPT",
    description: "UFCGPT - UFCG Programming Tournament",
}

const Rootlayout = ({ children }) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

export default Rootlayout;