import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
//import TwitterWall from '../components/twitter-wall'
import { TwitterTimelineEmbed, TwitterFollowButton } from "react-twitter-embed";
import MembersRoll from "../components/MembersRoll";

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section
      style={{ background: "#f3f3f3" }}
      className="section section--gradient"
    >
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="columns">
              <div className="column is-7">
                <div className="section">
                  <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                    {title}
                  </h2>
                  <div className="card blog-post-card">
                    <div className="card-content">
                      <PageContent content={content} />
                    </div>
                  </div>
                  <h3 className="title">Founding Members</h3>
                  <MembersRoll type={12} style={2} />
                </div>
              </div>
              <div className="column">
                <div className="section">
                  <h3 className="title">Twitter</h3>
                  <div className="card blog-post-card">
                    <div className="card-content">
                      <TwitterFollowButton screenName="NSHEP10" />
                      <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="NSHEP10"
                        options={{ height: 400 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
