import React from "react";
import { Helmet } from "react-helmet";

import { useSiteMetadata } from "hooks";

import Layout from "components/Layout";
import Container from "components/Container";

const SecondPage = () => {
  const { companyName, companyUrl, authorName, authorUrl, siteDescription } =
    useSiteMetadata();

  return (
    <Layout pageName="about">
      <Helmet>
        <title>About</title>
      </Helmet>
      <Container type="content">
        <h1>About</h1>

        <h2>{companyName}</h2>
        <p>{siteDescription}</p>
        <p>
          <a href={companyUrl}>View on Github</a>
        </p>
        <div>

        <h2>Created By</h2>
          <p>Tyler Carlsen</p>
          <p>Jonathan Covarrubias </p>
          <p>Angel Villa</p>
          <p>Peter Nguyen</p>
          <p>Huy Hoang</p>
        <p>
          <a href={authorUrl}>{authorName}</a>
        </p>
        </div>
        <div>
          <h2>Data Sources: </h2>
          <p> 
            <a href="https://disease.sh/">Disease.sh</a>
          </p>
        </div>
      </Container>
    </Layout>
  );
};

export default SecondPage;
