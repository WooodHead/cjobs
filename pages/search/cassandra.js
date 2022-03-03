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
import esEndpoint from "../api/elasticSearch";

// const index_name = "cassandra_job_posts";
// const esEndpoint = `http://${process.env.API_KEY}/api/elasticsearch/${index_name}`;
const searchkit = new SearchkitManager(esEndpoint);

// Rename
// const JobHitsItem = (props) => {
//   const { bemBlocks, result } = props
//   let url = result._source.url
//   const source = extend({}, result._source, result.highlight)
//   // console.log(source)
//   return (
//     <Box className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit" style={{ position: 'relative' }}>
//       <a href={url} style={{ height: '236px' }}>
//         <img data-qa="poster" alt="No Logo Given!" className={bemBlocks.item("poster")} src={result._source.logo} width="170" style={{ margin: 'auto' }} />
//         <Box data-qa="position" className={bemBlocks.item("position")} dangerouslySetInnerHTML={{ __html: source.position }} style={{ position: 'absolute', top: '180px', left: '15px' }}>
//         </Box>
//       </a>
//     </Box>
//   )
// }

// Rename
const JobHitsItem = ({ bemBlocks, result, selectedJob, setSelectedJob }) => {
  let url = result._source.original_post_url;
  const source = extend({}, result._source, result.highlight || {});
  // const company_search_url = `http://${host}:167.172.142.105/api/company/${source.company_name}`

  const onCardClick = (item) => {
    setSelectedJob(item);
  };

  return (
    <Card
      variant="outlined"
      onClick={() => onCardClick(source)}
      className={classes.cardItem}
      sx={{ minWidth: 275 }}
    >
      <Box
        className={bemBlocks.item().mix(bemBlocks.container("item"))}
        data-qa="hit"
      >
        <CardContent>
          <Box className={bemBlocks.item("details")}>
            <h2 className={bemBlocks.item("title")}>{source.position_name}</h2>
            <p className={bemBlocks.item("subtitle")}>
              <b>Company: </b>
              {source.company_name} <b>Date: </b>{" "}
              {source.external_api_published_at} <b>Tags: </b>{" "}
              {source.tags && source.tags.join(", ")} <b>Category: </b>{" "}
              {source.position_category}
            </p>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default function Cassandra() {
  const [selectedJob, setSelectedJob] = useState(null);
  const jobItem = (
    <JobHitsItem setSelectedJob={setSelectedJob} selectedJob={selectedJob} />
  );

  return (
    <SearchkitProvider searchkit={searchkit}>
      <Layout className={classes.sk_layout}>
        <TopBar>
          <SearchBox
            autofocus={true}
            searchOnChange={true}
            prefixQueryFields={["description^1"]}
            mod={`${classes.sk_search_box__action} ${classes.searchBox}`}
          />
        </TopBar>
        <LayoutBody>
          <LayoutResults>
            <ActionBar>
              <ActionBarRow>
                <HitsStats
                  mod={classes.sk_hits_stats}
                  translations={{
                    "hitstats.results_found": "{hitCount} results found",
                  }}
                />
                <ViewSwitcherToggle mod={classes.sk_view_switcher} />
                <SortingSelector
                  mod={`${classes.sk_sorting_selector} `}
                  options={[
                    { label: "Relevance", field: "_score", order: "desc" },
                    {
                      label: "Latest Releases",
                      field: "external_api_published_at",
                      order: "desc",
                    },
                    {
                      label: "Earliest Releases",
                      field: "external_api_published_at",
                      order: "asc",
                    },
                  ]}
                />
              </ActionBarRow>
              <ActionBarRow>
                <GroupedSelectedFilters />
                <ResetFilters mod={classes.sk_reset_filters} />
              </ActionBarRow>
            </ActionBar>
            <Grid container spacing={2} className={styles.jobsContainer}>
              <Grid
                xs={6}
                item
                className={`${classes.sk_hits_stats__info} ${classes.sk_hits_stats}`}
              >
                <ViewSwitcherHits
                  mod={`${classes.sk_hits_list}`}
                  hitsPerPage={12}
                  sourceFilter={[
                    "external_api_name",
                    "external_api_id",
                    "original_post_url",
                    "tags",
                    "external_api_published_at",
                    "description",
                    "description_html",
                    "position_name",
                    "position_category",
                    "company_name",
                    "company_logo_url",
                    "external_api_verified",
                    "external_api_original",
                    "external_api_updated_at",
                    "job_post_image_url",
                    "location",
                    "company_url",
                    "job_hours_type",
                    "how_to_apply_html",
                    "updated_at",
                  ]}
                  hitComponents={[
                    {
                      key: "list",
                      title: "List",
                      itemComponent: jobItem,
                      defaultOption: true,
                    },
                  ]}
                  scrollTo="body"
                />
              </Grid>
              <Grid xs={6} item>
                <JobDescription job={selectedJob} />
              </Grid>
            </Grid>
            <NoHits suggestionsField={"position_name"} />
            <Pagination showNumbers={true} />
          </LayoutResults>
        </LayoutBody>
      </Layout>
    </SearchkitProvider>
  );
}
