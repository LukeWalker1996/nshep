import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const MemberPageTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  image
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div
              style={{
                height: 180,
                width: 180,
                marginLeft: "calc(50% - 90px)",
                marginBottom: 10
              }}
            >
              <PreviewCompatibleImage
                className="card-image"
                imageInfo={{
                  image: image,
                  alt: `featured image thumbnail for Member ${title}`
                }}
              />
            </div>

            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <div dangerouslySetInnerHTML={{__html: description}} />
            {/* {contentComponent}
            {PostContent}
            <PostContent content={content} /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

MemberPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const MemberPage = ({ data }) => {
  const { markdownRemark: post } = data;
console.log('memmber page')
console.log(post);
console.log(data)

  return (
    <Layout>
      <MemberPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        //   tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
      />
    </Layout>
  );
};

MemberPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default MemberPage;

export const pageQuery = graphql`
  query MemberPageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 240, quality: 64) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
