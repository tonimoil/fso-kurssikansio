import React from 'react'

const Notification = ({message, notificationType}) => {
    if (message === null) {
        return null
      }
    
      return (
        <div className={(notificationType === 0) ? 'notification' : 'error'}>
          {message}
        </div>
      )
}

export default Notification
