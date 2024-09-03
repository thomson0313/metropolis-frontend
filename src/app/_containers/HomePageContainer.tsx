import React, { ReactNode } from 'react'

interface HomePageContainerProps {
  children: ReactNode // Define the children prop
}

const HomePageContainer: React.FC<HomePageContainerProps> = ({ children }) => {
  return <>{children}</>
}

export default HomePageContainer
