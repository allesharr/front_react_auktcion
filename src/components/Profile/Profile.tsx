import React from 'react'
import { applicationDataAPI } from '../../api/api'
import InformationField from '../Common/InformationField'

const Profile = () => {

  const [user, setUser] = React.useState<{[key: string]: any} | null>(null)

  React.useEffect(() => {
    const userId = localStorage.getItem("user_id")
    if (userId) applicationDataAPI.getOne("sys_user",userId).then(({data}) => {
        setUser(data)
    }).catch(err => {

    })
  },[])

  return <>
          {
          user 
          ?
          <>
            <InformationField label="Логин" content={user.login}/>
            {/* <InformationField label="Роль" content={user.user_role?.role_alias}/> */}
          </>
          : 
          null
          }
  </>
}

export default Profile