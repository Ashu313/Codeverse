import React from 'react'
import classnames from "classnames"

const Button = ({children,className, ...rest}) => {
    const allClassNames = classnames(className )
  return (
  <div {...rest} className={`${allClassNames}   flex items-center text-[18px]  md:text-[28px] text-[#313E51] font-medium shadow-2xl rounded-2xl my-4 cursor-pointer  `}>{children}</div>
  )
}

export default Button;