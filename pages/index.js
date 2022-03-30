import { extend } from "lodash";
import { useEffect, useState } from "react";
import classes from "../styles/searchkit.module.css";
import styles from "../styles/Home.module.css";
import JobDescription from "../components/JobDescription";
import { Card, CardContent, Grid, Typography, Box } from "@material-ui/core";

import { gql, useQuery } from "@apollo/client";
import { useSearchkitVariables, withSearchkit } from "@searchkit/client";
import withApollo from "../lib/withApollo";
import "@elastic/eui/dist/eui_theme_light.css";
import { useSearchkit } from "@searchkit/client";
import {
  ResetSearchButton,
  Pagination,
  SortingSelector,
  FacetsList,
} from "@searchkit/elastic-ui";

import {
  EuiPage,
  EuiPageBody,
  EuiPageContentBody,
  EuiPageSideBar,
  EuiHorizontalRule,
  EuiFlexGroup,
  EuiPagination,
  EuiFacetButton,
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
        sortOptions {
          id
          label
        }
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
              external_api_published_at
              description
              description_html
              position_name
              position_category
              company_name
              external_api_id
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

const JobHitsItem = ({
  result,
  selectedJob,
  setSelectedJob,
  setIsCardClicked,
}) => {
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
  const api = useSearchkit();
  const Facets = FacetsList([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const variables = useSearchkitVariables();
  const {
    previousData,
    data = previousData,
    loading,
  } = useQuery(QUERY, {
    variables,
  });

  useEffect(() => {
    if (selectedJob) {
      setSelectedJob(null);
    }
  }, [data]);

  if (!data) {
    return <h1>loading...</h1>;
  }

  return (
    <EuiPage style={{ paddingTop: "60px", width: "100%", height: "100vh" }}>
      <EuiPageSideBar>
        <SearchBox />
        <SortingSelector data={data?.results} loading={loading} />
        <EuiHorizontalRule margin="m" />
        <Grid className={classes.facets}>
          <Facets loading={loading} data={data?.results} />
        </Grid>
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
                      key={item.fields.external_api_id}
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
                  pageCount={data.results.hits.page.totalPages}
                  activePage={data?.results.hits.page.pageNumber}
                  onPageClick={(activePage) => {
                    api.setPage({
                      size: data.results.hits.page.size,
                      from: activePage * data.results.hits.page.size,
                    });
                    api.search();
                    console.log("Data", data.results.hits);
                    console.log("Active page", activePage);
                    console.log(
                      "total pages",
                      data.results.hits.page.totalPages
                    );
                  }}
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
