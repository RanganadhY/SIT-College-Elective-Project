import React from 'react'
import "./loader.css"
export function StudentLoader() {
    return (
            <div className="loader-wrapper">
                <div className='load-container'>
                    <div class="spinner"></div></div>
            </div>
            
        
    )
}

export function AdminLoader() {
    return (
        <div className="adminloader-wrapper">
            <div className='adminload-container'>
                <div class="adminspinner"></div></div>
        </div>
        
    
)
}