import { useContext } from "react";
import { BlogAuthContext } from "../context/blogAuthContextObject";

export function useBlogAuth() {
    return useContext(BlogAuthContext);
}
