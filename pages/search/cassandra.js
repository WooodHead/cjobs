import { extend } from "lodash";
import { useState } from "react";
import classes from "../../styles/searchkit.module.css";
import {
  SearchkitManager,
  SearchkitProvider,
  SearchBox,
  RefinementListFilter,
  Pagination,
  HitsStats,
  SortingSelector,
  NoHits,
  ResetFilters,
  DynamicRangeFilter,
  RangeFilter,
  ViewSwitcherHits,
  ViewSwitcherToggle,
  GroupedSelectedFilters,
  InputFilter,
  Layout,
  TopBar,
  LayoutBody,
  LayoutResults,
  ActionBar,
  ActionBarRow,
  SideBar,
} from "searchkit";
import { Card, CardContent, Grid, Typography, Box } from "@material-ui/core";
import JobDescription from "../../components/JobDescription";
import styles from "../../styles/Home.module.css";
// import esEndpoint from "../api/elasticSearch";
// const searchkit = new SearchkitManager(esEndpoint);
import { gql, useQuery } from "@apollo/client";
import { useSearchkitVariables, withSearchkit } from "@searchkit/client";
import withApollo from "../../lib/withApollo";


const searchkit = new SearchkitManager(esEndpoint);


const JobHitsItem = ({ bemBlocks, result, selectedJob, setSelectedJob }) => {
  let url = result._source.original_post_url;
  const source = extend({}, result._source, result.highlight || {});
  // const company_search_url = `http://${host}:167.172.142.105/api/company/${source.company_name}`

const Cassandra = () => {
  const variables = useSearchkitVariables();
  const {
    previousData,
    data = previousData,
    loading,
  } = useQuery(QUERY, { variables });
  console.log(variables);

  if (loading || !data) {
    return <h1>loading...</h1>;
  }
  return (
    <>
      {data.results.hits.items.map((item) => {
        return <div key={item.id}>hit id: {item.id}</div>;
      })}
    </>
  );
};

export default withApollo(withSearchkit(Cassandra));

// const [selectedJob, setSelectedJob] = useState(null);
// const jobItem = (
//   <JobHitsItem setSelectedJob={setSelectedJob} selectedJob={selectedJob} />
// );

// return (
//   <SearchkitProvider searchkit={searchkit}>
//     <Layout className={classes.sk_layout}>
//       <TopBar>
//         <SearchBox
//           autofocus={true}
//           searchOnChange={true}
//           prefixQueryFields={["description^1"]}
//           mod={`${classes.sk_search_box__action} ${classes.searchBox}`}
//         />
//       </TopBar>
//       <LayoutBody>
//         <LayoutResults>
//           <ActionBar>
//             <ActionBarRow>
//               <HitsStats
//                 mod={classes.sk_hits_stats}
//                 translations={{
//                   "hitstats.results_found": "{hitCount} results found",
//                 }}
//               />
//               <ViewSwitcherToggle mod={classes.sk_view_switcher} />
//               <SortingSelector
//                 mod={`${classes.sk_sorting_selector} `}
//                 options={[
//                   { label: "Relevance", field: "_score", order: "desc" },
//                   {
//                     label: "Latest Releases",
//                     field: "external_api_published_at",
//                     order: "desc",
//                   },
//                   {
//                     label: "Earliest Releases",
//                     field: "external_api_published_at",
//                     order: "asc",
//                   },
//                 ]}
//               />
//             </ActionBarRow>
//             <ActionBarRow>
//               <GroupedSelectedFilters />
//               <ResetFilters mod={classes.sk_reset_filters} />
//             </ActionBarRow>
//           </ActionBar>
//           <Grid container spacing={2} className={styles.jobsContainer}>
//             <Grid
//               xs={6}
//               item
//               className={`${classes.sk_hits_stats__info} ${classes.sk_hits_stats}`}
//             >
//               <ViewSwitcherHits
//                 mod={`${classes.sk_hits_list}`}
//                 hitsPerPage={12}
//                 sourceFilter={[
//                   "external_api_name",
//                   "external_api_id",
//                   "original_post_url",
//                   "tags",
//                   "external_api_published_at",
//                   "description",
//                   "description_html",
//                   "position_name",
//                   "position_category",
//                   "company_name",
//                   "company_logo_url",
//                   "external_api_verified",
//                   "external_api_original",
//                   "external_api_updated_at",
//                   "job_post_image_url",
//                   "location",
//                   "company_url",
//                   "job_hours_type",
//                   "how_to_apply_html",
//                   "updated_at",
//                 ]}
//                 hitComponents={[
//                   {
//                     key: "list",
//                     title: "List",
//                     itemComponent: jobItem,
//                     defaultOption: true,
//                   },
//                 ]}
//                 scrollTo="body"
//               />
//             </Grid>
//             <Grid xs={6} item>
//               <JobDescription job={selectedJob} />
//             </Grid>
//           </Grid>
//           <NoHits suggestionsField={"position_name"} />
//           <Pagination showNumbers={true} />
//         </LayoutResults>
//       </LayoutBody>
//     </Layout>
//   </SearchkitProvider>
// );
// }
