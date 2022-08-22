import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { PostFrontmatterType } from 'types/PostItem.types'
import Template from 'components/Common/Template'
import PostHead from 'components/Post/PostHead'
import PostContent from 'components/Post/PostContent'
import CommentWidget from 'components/Post/CommentWidget'
import Ountline from 'components/Post/Ountline'
import styled from '@emotion/styled'

type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: PostPageItemType[]
    }
  }
  location: {
    href: string
  }
}

const ContentBox = styled.div`
  display: flex;
`

const LeftBox = styled.div`
  flex-basis: 50%;
  @media (max-width: 768px) {
    display: none;
  }
`

const MiddleBox = styled.div`
  flex-basis: 768px;
`

const RightBox = styled.div`
  flex-basis: 50%;
  @media (max-width: 768px) {
    display: none;
  }
`

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
  location: { href },
}) {
  const {
    node: {
      html,
      frontmatter: {
        title,
        summary,
        date,
        categories,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
          publicURL,
        },
      },
      tableOfContents,
    },
  } = edges[0]

  return (
    <Template title={title} description={summary} url={href} image={publicURL}>
      <PostHead
        title={title}
        date={date}
        categories={categories}
        thumbnail={gatsbyImageData}
      />
      <ContentBox>
        <LeftBox></LeftBox>
        <MiddleBox>
          <PostContent html={html} />
        </MiddleBox>
        <RightBox>
          <Ountline content={tableOfContents} />
        </RightBox>
      </ContentBox>
      <CommentWidget />
    </Template>
  )
}

export default PostTemplate

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
              publicURL
            }
          }
          tableOfContents
        }
      }
    }
  }
`

export type PostPageItemType = {
  node: {
    html: string
    frontmatter: PostFrontmatterType
    tableOfContents: string
  }
}
