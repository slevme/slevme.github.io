import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

type PostOutlineProps = {
  content: string
}

const OutlineBox = styled.div`
  top: 0;
  flex-grow: 0;
  max-width: calc(100% / 3);
  flex-basis: calc(100% / 3);
  margin-left: 1rem;
  max-width: 18rem;
  max-height: calc(100vh - 200px);
  position: sticky;
  overflow: auto;
  margin-bottom: 3px;
  font-size: 0.9rem;
  color: #909090;
`

const Outline: FunctionComponent<PostOutlineProps> = function ({ content }) {
  return (
    <OutlineBox
      // dangerouslySetInnerHTML는 보안 관점에서 위험하지만 innerHTML을 사용하겠다는 뜻이다.
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default Outline
