import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import ProfileImage from 'components/Main/ProfileImage'

type IntroductionProps = {
  profileImage: IGatsbyImageData
}

const Background = styled.div`
  width: 100%;
  background-image: url('/banner.png');
  background-position-x: right;
  color: #010100;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 768px;
  height: 300px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
    padding: 0 20px;
  }
`

const TitleWrapper = styled.div`
  margin-left: 20px;
`

const Title = styled.div`
  font-size: 35px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 25px;
  }
`

const SubTitle = styled.div`
  margin-top: 5px;
  font-size: 20px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`

const Introduction: FunctionComponent<IntroductionProps> = function ({
  profileImage,
}) {
  return (
    <Background>
      <Wrapper>
        <ProfileImage profileImage={profileImage} />
        <TitleWrapper>
          <Title>slevme</Title>
          <SubTitle>주니어 개발자의 기록 블로그</SubTitle>
        </TitleWrapper>
      </Wrapper>
    </Background>
  )
}

export default Introduction
