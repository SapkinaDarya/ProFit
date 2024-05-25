import React from 'react'

function User({ color }) {
  return (
    <div>
      <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.73156 22.1665C7.26303 18.7207 10.6801 16.5 14.4509 16.5H18.5491C22.3199 16.5 25.737 18.7207 27.2684 22.1665V22.1665C28.6706 25.3214 26.3612 28.875 22.9088 28.875H10.0912C6.63876 28.875 4.32938 25.3214 5.73156 22.1665V22.1665Z" stroke={ color } strokeLinejoin="round"/>
        <path d="M12.375 8.25C12.375 5.97183 14.2218 4.125 16.5 4.125C18.7782 4.125 20.625 5.97183 20.625 8.25C20.625 10.5282 18.7782 12.375 16.5 12.375C14.2218 12.375 12.375 10.5282 12.375 8.25Z" stroke={ color } strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export default User
