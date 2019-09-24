import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

class MembersRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: Members } = data.allMarkdownRemark;
    const { type = 6 } = this.props;
    //types = 6 or 12
    console.log("possst");
    console.log(Members);
    return (
      <div className="columns is-multiline">
        {Members &&
          Members.map(({ node: Member }) => (
            // <div className="is-parent column is-6" key={Member.id}>
            //   <article
            //     className={`blog-list-item tile is-child box notification ${
            //       Member.frontmatter.featuredMember ? 'is-featured' : ''
            //     }`}
            //   >
            //     <header>
            //       {Member.frontmatter.featuredimage ? (
            //         <div className="featured-thumbnail">
            //           <PreviewCompatibleImage
            //             imageInfo={{
            //               image: Member.frontmatter.featuredimage,
            //               alt: `featured image thumbnail for Member ${
            //                 Member.title
            //               }`,
            //             }}
            //           />
            //         </div>
            //       ) : null}
            //       <p className="Member-meta">
            //         <Link
            //           className="title has-text-primary is-size-4"
            //           to={Member.fields.slug}
            //         >
            //           {Member.frontmatter.title}
            //         </Link>
            //         <span> &bull; </span>
            //         <span className="subtitle is-size-5 is-block">
            //           {Member.frontmatter.date}
            //         </span>
            //       </p>
            //     </header>
            //     <p>
            //       {Member.excerpt}
            //       <br />
            //       <br />
            //       <Link className="button" to={Member.fields.slug}>
            //         Keep Reading →
            //       </Link>
            //     </p>
            //   </article>
            // </div>
            <div className={`is-parent column is-${type}`} key={Member.id}>
              <Link to={Member.fields.slug}>
                <div className="card">
                  <div className="card-content">
                    <div
                      style={{
                        width: 180,
                        height: 180,
                        marginBottom: 20,
                        marginLeft: "calc(50% - 90px)"
                      }}
                    >
                      <PreviewCompatibleImage
                        className="card-image"
                        imageInfo={{
                          image: Member.frontmatter.image,
                          alt: `featured image thumbnail for Member ${Member.title}`
                        }}
                      />
                    </div>

                    <div style={{ textAlign: "center" }}>
                      <h3>{Member.frontmatter.title}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    );
  }
}

MembersRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query MembersRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "member-page" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                description
                templateKey
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
        }
      }
    `}
    render={(data, count) => <MembersRoll data={data} count={count} />}
  />
);
