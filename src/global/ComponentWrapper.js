import React from 'react';
import Page from './Page';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import PageHeader from './PageHeader';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

ComponentWrapper.propTypes = {
  title: PropTypes.string
};
// ----------------------------------------------------------------------

function ComponentWrapper(props) {
  const classes = useStyles();
  const { breadcrumbs, heading } = props;

  return (
    <Page className={classes.root} title="Dashboard-App | Rumsan Seed">
      <Container maxWidth="xl">
        <PageHeader heading={heading} links={breadcrumbs} />
        {props.children}
      </Container>
    </Page>
  );
}

export default ComponentWrapper;