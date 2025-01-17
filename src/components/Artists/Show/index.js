import React, { Component } from "react";
import PropTypes from "prop-types";
import View from "./View";
import { Query } from "@apollo/client/react/components";
//graphql.macro
import Error from "../../Shared/Error";
import Loading from "v1/shared/Loading";

const getArtist = require("./getArtist.graphql");

class Show extends Component {
  render() {
    const variables = {
      slug: this.props.match.params.slug,
    };

    return (
      <Query query={getArtist} variables={variables}>
        {({ data, loading, errors }) => {
          if (loading) return <Loading />;
          else if (errors) return <Error error={errors} />;
          else return <View artist={data.getArtist} />;
        }}
      </Query>
    );
  }
}

Show.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
  }),
};

export default Show;
