import EmailVerificationClient from '@/components/auth/EmailVerificationClient'
import  Container  from "@/components/layout/Container"
import React from 'react'

const page = () => {
  return ( 
        <Container>
            <EmailVerificationClient />
        </Container>
   
  )
}

export default page