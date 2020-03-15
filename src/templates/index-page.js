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

import Slider from "react-slick";

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

const sliderSettings = {
  dots: false,
  arrows: false,
  draggable: false,
  infinite: true,
  autoplay: true,
  speed: 4000,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true
};

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro
}) => {
  const Hero = ({ title }) => {
    return (
      <div style={{ position: "relative" }}>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />

        <Slider {...sliderSettings}>
          {imgs.map(image => (
            <div>
              <img
                style={{
                  width: "100%",
                  objectFit: "cover",
                  minHeight: "400px"
                }}
                src={image.img}
                alt={image.name}
              />
              <div
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "0",
                  zIndex: "99",
                  fontSize: "46px",
                  color: "#fff",
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center"
                }}
              >
                <h1
                  style={{
                    verticalAlign: "middle",
                    margin: 0,
                    background: theme.primary,
                    color: "white",
                    padding: "20px",
                    fontSize: "46px",
                    width: "300px"
                  }}
                  className="title"
                >
                  {title}
                </h1>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  return (
    <div style={{ background: "#f3f3f3" }}>
      <Hero title={mainpitch.title} />
  
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
