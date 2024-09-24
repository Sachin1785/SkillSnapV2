import { useState } from 'react'
import Nav from '../Components/Nav'
import UserProfile from '../Components/UserProfile'


function UserPage() {
  const [count, setCount] = useState(0)

  return (
    <>
      
        <UserProfile  style={{width:'100%'}}/>
    </>
  )
}

export default UserPage