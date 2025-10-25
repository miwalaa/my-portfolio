// src/components/AdminLogo/AdminLogo.tsx
import React from 'react'
import Image from 'next/image'

export const AdminLogo: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Image
        alt="Logo"
        width={150}
        height={150}
        className="object-contain"
        src="/logo.png"
        priority
      />
    </div>
  )
}

export default AdminLogo
