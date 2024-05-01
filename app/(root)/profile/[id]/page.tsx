import { TUrlParams } from '@/types'
import React from 'react'

const UserProfile = ({params, searchParams}: TUrlParams) => {
  return (
    <div>UserProfile: {params.id}</div>
  )
}

export default UserProfile