import React from "react";

export default function StudentList({data}) {
    return (
        <div>
            {data.map((student, index) => (
                <p key={index}>{student}</p>
            ))}
        </div>
    )
}