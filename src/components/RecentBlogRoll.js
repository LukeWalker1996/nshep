import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import { FaBlog, FaSearch } from "react-icons/fa";

class RecentBlogRoll extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data, limit = null } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div className="columns is-multiline">
        {posts &&
          posts
            .filter((p, i) => i <= 3)
            .map(({ node: post }, i) => (
              // <div className="is-parent column is-6" key={post.id}>
              //   <article
              //     className={`blog-list-item tile is-child box notification ${
              //       post.frontmatter.featuredpost ? 'is-featured' : ''
              //     }`}
              //   >
              //     <header>
              //       {post.frontmatter.featuredimage ? (
              //         <div className="featured-thumbnail">
              //           <PreviewCompatibleImage
              //             imageInfo={{
              //               image: post.frontmatter.featuredimage,
              //               alt: `featured image thumbnail for post ${
              //                 post.title
              //               }`,
              //             }}
              //           />
              //         </div>
              //       ) : null}
              //       <p className="post-meta">
              //         <Link
              //           className="title has-text-primary is-size-4"
              //           to={post.fields.slug}
              //         >
              //           {post.frontmatter.title}
              //         </Link>
              //         <span> &bull; </span>
              //         <span className="subtitle is-size-5 is-block">
              //           {post.frontmatter.date}
              //         </span>
              //       </p>
              //     </header>
              //     <p>
              //       {post.excerpt}
              //       <br />
              //       <br />
              //       <Link className="button" to={post.fields.slug}>
              //         Keep Reading →
              //       </Link>
              //     </p>
              //   </article>
              // </div>
              <div className="is-parent column is-6" key={post.id}>
                <div className="card blog-card">
                  <div className="card-content">
                    <FaBlog color={"#f38148"} />
                    <h3> {post.frontmatter.title}</h3>
                    <p>
                      {post.excerpt}
                      <div style={{ textAlign: "right" }}>
                        <Link className="blog-btn" to={post.fields.slug}>
                          VIEW
                        </Link>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    );
  }
}

RecentBlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query RecentBlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
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
    render={(data, count) => <RecentBlogRoll data={data} count={count} />}
  />
);
