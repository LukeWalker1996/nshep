import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import Features from "../components/Features";
import RecentBlogRoll from "../components/RecentBlogRoll";
import theme from "../templates/theme";

import Bristol from "../img/hero/bristol.jpg";
import DurhamBS from "../img/hero/durham-bs.jpeg";
import DurhamFront from "../img/hero/durham-front.jpg";
import Liverpool from "../img/hero/liverpool.jpg";
import York from "../img/hero/york.jpg";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";

import LazyLoad from "react-lazyload";

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro
}) => {
  const [activeImg, updateActiveImg] = useState(0);
  const [beforeImg, updateBeforeImg] = useState(4);
  // kick start off the process
  useEffect(() => {
    setTimeout(() => {
      updateActiveImg(1);
      updateBeforeImg(0);
    }, 5000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (activeImg == 4) {
        updateActiveImg(0);
        updateBeforeImg(4);
        return;
      } else {
        updateBeforeImg(activeImg);
        updateActiveImg(activeImg + 1);
        return;
      }
    }, 5000);
  }, [activeImg]);

  const imgs = [
    {
      id: 1,
      img: DurhamFront,
      name: "Durham"
    },

    {
      id: 2,
      img: Bristol,
      name: "Bristol"
    },
    {
      id: 3,
      img: Liverpool,
      name: "Liverpool"
    },
    {
      id: 4,
      img: York,
      name: "York"
    },
    {
      id: 5,
      img: DurhamBS,
      name: "Durham"
    }
  ];

  return (
    <div style={{ background: "#f3f3f3" }}>
      <LazyLoad height={400}>
        <div style={{ position: "relative", height: 400 }}>
          <div
            className="full-width-image margin-top-0"
            style={{
              backgroundPosition: `top left right bottom`,
              backgroundAttachment: ``,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              background: "transparent",
              position: "absolute",
              backgroundImage: `url(${imgs[beforeImg].img})`,
              
            }}
          >
            {imgs
              .filter((v, i) => i == activeImg)
              .map(i => {
                return (
                  <Fade key={i.id}>
                    <div
                      className="full-width-image margin-top-0"
                      style={{
                        // backgroundImage: `url(${
                        //   !!image.childImageSharp ? image.childImageSharp.fluid.src : image
                        // })`,
                        background: "transparent",
                        backgroundImage: `url(${i.img})`,
                        backgroundPosition: `top left right bottom`,
                        backgroundAttachment: ``,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        color: "white",
                        position: "absolute"
                      }}
                    >
                      <h2
                        style={{
                          verticalAlign: "middle",
                          margin: 0,
                          background: theme.primary,
                          color: "white",
                          padding: "20px",
                          fontSize: "46px"
                        }}
                        className="title"
                      >
                        {mainpitch.title}
                      </h2>

                      <div
                        style={{
                          display: "flex",
                          height: "150px",
                          lineHeight: "1",
                          justifyContent: "space-around",
                          alignItems: "left",
                          flexDirection: "column"
                        }}
                      ></div>
                    </div>
                  </Fade>
                );
              })}
          </div>
        </div>
      </LazyLoad>

      <section
        className="section"
        style={{
          backgroundColor: "#038d9f",
          color: "white",
          lineHeight: "1",
          padding: "0.25em"
        }}
      >
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <h3 className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen">
                  {subheading}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--gradient">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="content">
                  <div className="content">
                    <div className="tile">
                      <h3 className="subtitle">{mainpitch.description}</h3>
                    </div>
                  </div>
                  <div className="columns is-multiline">
                    <div className="column is-12">
                      <h3 className="has-text-weight-semibold is-size-2">
                        {heading}
                      </h3>
                      <p>{description}</p>
                    </div>
                    <div className="column is-12">
                      <h3 className="has-text-weight-semibold is-size-2">
                        Recent Posts
                      </h3>
                      <RecentBlogRoll limit={4} />
                      <div className="column is-12 has-text-centered">
                        <Link className="btn" to="/blog">
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  })
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          heading
          description
        }
      }
    }
  }
`;
