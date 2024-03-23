import React from 'react'
import classnames from "classnames"

const ImageIcons = ({src, className, ...rest}) => {
  const allClassNames = classnames( className)
  return (
    <img src={src} alt=''  className= {`  ${allClassNames}`} />
  )
}

export default ImageIcons