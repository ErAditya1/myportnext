import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import React from 'react'

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
         <Navbar />
        {children}
         <Footer />
    </div>
  )
}

export default PublicLayout
