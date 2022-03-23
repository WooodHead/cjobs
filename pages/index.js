import { extend } from "lodash";
import { useState } from "react";
import classes from "../styles/searchkit.module.css";
import styles from "../styles/Home.module.css";
import JobDescription from "../components/JobDescription";
import { Card, CardContent, Grid, Typography, Box } from "@material-ui/core";

import { gql, useQuery } from "@apollo/client";
import { useSearchkitVariables, withSearchkit } from "@searchkit/client";
import withApollo from "../lib/withApollo";
import "@elastic/eui/dist/eui_theme_light.css";

import {
  ResetSearchButton,
  Pagination,
  SortingSelector,
} from "@searchkit/elastic-ui";

import {
  EuiPage,
  EuiPageBody,
  EuiPageContentBody,
  EuiPageSideBar,
  EuiHorizontalRule,
  EuiFlexGroup,
  // EuiPagination,
} from "@elastic/eui";
import SearchBox from "../components/ui/SearchBox";

const QUERY = gql`
  query resultSet(
    $query: String
    $filters: [SKFiltersSet]
    $page: SKPageInput
    $sortBy: String
  ) {
    results(query: $query, filters: $filters) {
      summary {
        total
        appliedFilters {
          id
          identifier
          display
          label
          ... on ValueSelectedFilter {
            value
          }
        }
        sortOptions {
          id
          label
        }
        query
      }
      hits(page: $page, sortBy: $sortBy) {
        page {
          total
          totalPages
          pageNumber
          from
          size
        }
        sortedBy
        items {
          ... on ResultHit {
            id
            fields {
              external_api_name
              external_api_id
              original_post_url
              tags
              external_api_published_at
              description
              description_html
              position_name
              position_category
              company_name
              company_logo_url
              external_api_verified
              external_api_original
              external_api_updated_at
              job_post_image_url
              location
              company_url
              job_hours_type
              how_to_apply_html
              updated_at
            }
          }
        }
      }
      facets {
        identifier
        type
        label
        display
        entries {
          label
          count
        }
      }
    }
  }
`;

const JobHitsItem = ({ result, selectedJob, setSelectedJob }) => {
  const onCardClick = (item) => {
    console.log(selectedJob);
    if (selectedJob && selectedJob.external_api_id === item.external_api_id) {
      setSelectedJob(null);
    } else {
      setSelectedJob(item);
    }
  };
  return (
    <Card
      variant="outlined"
      onClick={() => onCardClick(result)}
      className={classes.cardItem}
      sx={{ minWidth: 275 }}
    >
      <Box data-qa="hit">
        <CardContent>
          <Box>
            <Typography paragraph variant="h5">
              {result.position_name}
            </Typography>
            <Typography component="ul" className={classes.cardContent}>
              <Typography variant="h6" component="li" gutterBottom>
                <b>Company:</b> {result.company_name}
              </Typography>
              <Typography variant="h6" component="li" gutterBottom>
                <b>Date:</b> {result.external_api_published_at}
              </Typography>
              <Typography variant="h6" component="li" gutterBottom>
                <b>Tags:</b> {result.tags && result.tags.join(", ")}
              </Typography>
              <Typography variant="h6" component="li" gutterBottom>
                <b>Category:</b> {result.position_category}
              </Typography>
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

const Index = () => {
  // const [activePage, setActivePage] = useState(0);
  // const Facets = FacetsList([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const variables = useSearchkitVariables();
  const {
    previousData,
    data = previousData,
    loading,
  } = useQuery(QUERY, {
    variables,
  });

  console.log(data);

  if (!data) {
    return <h1>loading...</h1>;
  }
  return (
    <EuiPage style={{ paddingTop: "60px", width: "100%", height: "100vh" }}>
      <EuiPageSideBar>
        <SearchBox />
        {/* <Facets data={data?.results} loading={loading} /> */}
        <SortingSelector data={data?.results} loading={loading} />
        <EuiHorizontalRule margin="m" />
        <ResetSearchButton loading={loading} />
      </EuiPageSideBar>
      <EuiPageBody>
        {data.results.summary.total !== 0 ? (
          <EuiPageContentBody>
            <Grid container spacing={2} className={styles.jobsContainer}>
              <Grid
                xs={6}
                item
                className={`${classes.sk_hits_stats__info} ${classes.sk_hits_stats}`}
              >
                {data.results.hits.items.map((item) => {
                  return (
                    <JobHitsItem
                      result={item.fields}
                      selectedJob={selectedJob}
                      setSelectedJob={setSelectedJob}
                    />
                  );
                })}
              </Grid>
              <Grid xs={6} item>
                <JobDescription job={selectedJob} />
              </Grid>
            </Grid>
            <EuiFlexGroup justifyContent="center">
              <Grid className={classes.paginationContainer}>
                {/* <EuiPagination
                  compressed
                  data={data?.results}
                  pageCount={data.results.hits.page.totalPages}
                  activePage={activePage}
                  onPageClick={(activePage) => setActivePage(activePage)}
                /> */}
                <Pagination data={data?.results} />
              </Grid>
            </EuiFlexGroup>
          </EuiPageContentBody>
        ) : (
          <Typography paragraph variant="h5">
            No results found
          </Typography>
        )}
      </EuiPageBody>
    </EuiPage>
  );
};

export default withApollo(withSearchkit(Index));
