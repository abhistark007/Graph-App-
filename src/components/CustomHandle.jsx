import React from "react"
import { Handle } from "reactflow"

export default function CustomHandle(props) {
  return (
    <Handle
      style={{
        width: 8,
        height: 8,
        background: "white",
        border: "2px solid black"
      }}
      {...props}
    />
  )
}
