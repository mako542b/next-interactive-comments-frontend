import Link from "next/link"
import useAuthContext from "../hooks/useAuthContext"
import { useEffect } from "react"
import useAxios from "../hooks/useAxios"

export default function index() {

    return (
      <div className="grid place-content-center text-center h-full p-20">
        <h1 className="text-3xl text-gray-700">Welcome to interactive comments section</h1>
        <p className="text-gray-700">If not already a member, join to gain access to newest comments</p>
      </div>
    )
}