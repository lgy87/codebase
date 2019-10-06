import React from "react"
import { Link } from "react-router-dom"

export default function Settings() {
  return (
    <ul style={{ height: "100%", overflow: "auto" }}>
      {Array(1000)
        .fill(1)
        .map((_, index) => (
          <li key={index}>
            <Link to={"/haha-" + index}>{index}</Link>
          </li>
        ))}
    </ul>
  )
}
