import { extend } from "lodash";
import { useState } from "react";
import classes from "../styles/searchkit.module.css";
import styles from "../styles/Home.module.css";

import { gql, useQuery } from "@apollo/client";
import { useSearchkitVariables, withSearchkit } from "@searchkit/client";
import withApollo from "../lib/withApollo";
import { Card, CardContent, Grid, Typography, Box } from "@material-ui/core";
import JobDescription from "../components/JobDescription";
import {
  FacetsList,
  SearchBar,
  ResetSearchButton,
  SelectedFilters,
  Pagination,
} from "@searchkit/elastic-ui";

import {
  EuiPage,
  EuiFlexGrid,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
  EuiHorizontalRule,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";

const QUERY = gql`
  {
    results {
      hits {
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
    }
  }
`;

const JobHitsItem = ({ result, selectedJob, setSelectedJob }) => {
  const onCardClick = (item) => {
    setSelectedJob(item);
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
            <h2>{result.position_name}</h2>
            <p>
              <b>Company: </b>
              {result.company_name} <b>Date: </b>{" "}
              {result.external_api_published_at} <b>Tags: </b>{" "}
              {result.tags && result.tags.join(", ")} <b>Category: </b>{" "}
              {result.position_category}
            </p>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

const Index = () => {
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
  if (loading || !data) {
    return <h1>loading...</h1>;
  }
  return (
    <EuiPage>
      <EuiPageSideBar>
        <SearchBar loading={loading} />
      </EuiPageSideBar>
      <EuiPageBody component="div">
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <SelectedFilters loading={loading} />
            </EuiTitle>
          </EuiPageHeaderSection>
          <EuiPageHeaderSection>
            <ResetSearchButton loading={loading} />
          </EuiPageHeaderSection>
        </EuiPageHeader>
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
          <EuiFlexGroup justifyContent="spaceAround">
            <Pagination />
          </EuiFlexGroup>
        </EuiPageContentBody>
      </EuiPageBody>
    </EuiPage>
  );
};

export default withApollo(withSearchkit(Index));
// export default function Cassandra() {
//   const [selectedJob, setSelectedJob] = useState(null);
//   const jobItem = (
//     <JobHitsItem setSelectedJob={setSelectedJob} selectedJob={selectedJob} />
//   );
//   return (
//     <SearchkitProvider searchkit={searchkit}>
//       <Layout className={classes.sk_layout}>
//         <TopBar>
//           <SearchBox
//             autofocus={true}
//             searchOnChange={true}
//             prefixQueryFields={["description^1"]}
//             mod={`${classes.sk_search_box__action} ${classes.searchBox}`}
//           />
//         </TopBar>
//         <LayoutBody>
//           <LayoutResults>
//             <ActionBar>
//               <ActionBarRow>
//                 <HitsStats
//                   mod={classes.sk_hits_stats}
//                   translations={{
//                     "hitstats.results_found": "{hitCount} results found",
//                   }}
//                 />
//                 <ViewSwitcherToggle mod={classes.sk_view_switcher} />
//                 <SortingSelector
//                   mod={`${classes.sk_sorting_selector} `}
//                   options={[
//                     { label: "Relevance", field: "_score", order: "desc" },
//                     {
//                       label: "Latest Releases",
//                       field: "external_api_published_at",
//                       order: "desc",
//                     },
//                     {
//                       label: "Earliest Releases",
//                       field: "external_api_published_at",
//                       order: "asc",
//                     },
//                   ]}
//                 />
//               </ActionBarRow>
//               <ActionBarRow>
//                 <GroupedSelectedFilters />
//                 <ResetFilters mod={classes.sk_reset_filters} />
//               </ActionBarRow>
//             </ActionBar>
//             <Grid container spacing={2} className={styles.jobsContainer}>
//               <Grid
//                 xs={6}
//                 item
//                 className={`${classes.sk_hits_stats__info} ${classes.sk_hits_stats}`}
//               >
//                 <ViewSwitcherHits
//                   mod={`${classes.sk_hits_list}`}
//                   hitsPerPage={12}
//                   sourceFilter={[
//                     "external_api_name",
//                     "external_api_id",
//                     "original_post_url",
//                     "tags",
//                     "external_api_published_at",
//                     "description",
//                     "description_html",
//                     "position_name",
//                     "position_category",
//                     "company_name",
//                     "company_logo_url",
//                     "external_api_verified",
//                     "external_api_original",
//                     "external_api_updated_at",
//                     "job_post_image_url",
//                     "location",
//                     "company_url",
//                     "job_hours_type",
//                     "how_to_apply_html",
//                     "updated_at",
//                   ]}
//                   hitComponents={[
//                     {
//                       key: "list",
//                       title: "List",
//                       itemComponent: jobItem,
//                       defaultOption: true,
//                     },
//                   ]}
//                   scrollTo="body"
//                 />
//               </Grid>
//               <Grid xs={6} item>
//                 <JobDescription job={selectedJob} />
//               </Grid>
//             </Grid>
//             <NoHits suggestionsField={"position_name"} />
//             <Pagination showNumbers={true} />
//           </LayoutResults>
//         </LayoutBody>
//       </Layout>
//     </SearchkitProvider>
//   );
// }
