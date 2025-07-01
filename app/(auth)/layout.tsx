import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import {ReactNode} from 'react'
import { headers } from 'next/headers';


const Authlayout = async ({children}: {children: ReactNode }) => {

  const isUserAuthenticated = await isAuthenticated();

  if(isUserAuthenticated) redirect('/');

  
 
  return (
    <div className = "auth-layout">{children}</div>
  )
}

export default Authlayout