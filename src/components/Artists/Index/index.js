import React, { Component } from "react";
import PropTypes from "prop-types";
import View from "./View";
import { Query } from "@apollo/client/react/components";
import Error from "../../Shared/Error";
import Loading from "v1/shared/Loading";

const getArtists = require("./getArtists.graphql");

class Index extends Component {
  render() {
    const variables = {
      page: this.props.match.params.page || 1,
    };

    return (
      <Query query={getArtists} variables={variables}>
        {(props) => {
          console.log({ props });
          const { data, loading, error, refetch } = props;
          if (loading) return <Loading />;
          else if (error) return <Error error={error} />;
          else if (data)
            return <View data={data.getArtists} refetch={refetch} />;
          else return <Error error={"Something went wrong."} />;
        }}
      </Query>
    );
  }
}

Index.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.number,
    }),
  }),
};

export default Index;
