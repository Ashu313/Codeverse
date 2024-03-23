import React from 'react'
import classnames from "classnames"

const Icons = ({children,bgcolor}) => {
    const allClassNames = classnames(bgcolor )
  return (
    <span  className= {` ${allClassNames} p-1 mr-5`}  >{children}</span>
  )
}

export default Icons