import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

const NavbarWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 50px;
  margin: auto 10px;
  @media (max-width: 768px) {
    height: 35px;
    margin: auto 8px;
  }
`

const BlogLogoWrapper = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`

const BlogLogo = styled.img`
  width: 35px;
  height: 18px;

  @media (max-width: 768px) {
    width: 30px;
    height: 15px;
  }
`

const BlogName = styled.a`
  font-size: 22px;
  text-align: center;
  font-weight: bold;
  padding-bottom: 5px;
  /* text-shadow: -1px 0 #ffffff, 0 1px #ffffff, 1px 0 #ffffff, 0 -1px #ffffff; */

  @media (max-width: 768px) {
    font-size: 18px;
    padding-bottom: 4px;
  }
`

const Navbar: FunctionComponent = function () {
  return (
    <NavbarWrapper>
      <BlogLogoWrapper href="http://localhost:8000/">
        <BlogLogo src="/logo.png" alt="Blog Logo" />
      </BlogLogoWrapper>
      <BlogName href="http://localhost:8000/">slevme</BlogName>
    </NavbarWrapper>
  )
}

export default Navbar
