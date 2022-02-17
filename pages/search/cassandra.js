import { extend } from 'lodash'
import classes from '../../styles/searchkit.module.css'
import {
  SearchkitManager, SearchkitProvider,
  SearchBox, RefinementListFilter, Pagination,
  HitsStats, SortingSelector, NoHits,
  ResetFilters, DynamicRangeFilter, RangeFilter,
  ViewSwitcherHits, ViewSwitcherToggle,
  GroupedSelectedFilters, InputFilter,
  Layout, TopBar, LayoutBody, LayoutResults,
  ActionBar, ActionBarRow, SideBar
} from 'searchkit'
import { Card, CardContent, Grid, Typography } from "@material-ui/core";



const index_name = "cassandra_job_posts"
// flask is providing a thin wrapper over es so we don't have to expose too much over cors on ES
// however, note that requests are made from browser NOT from container. So can't use docker
// networking to get url

// TODO use env vars for hostname
const esEndpoint = `http://167.172.142.105:5000/api/elasticsearch/${index_name}`
const searchkit = new SearchkitManager(esEndpoint)

// Rename
const MovieHitsGridItem = (props) => {
  const { bemBlocks, result } = props
  let url = result._source.url
  const source = extend({}, result._source, result.highlight)
  // console.log(source)
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit" style={{ position: 'relative' }}>
      <a href={url} style={{ height: '236px' }}>
        <img data-qa="poster" alt="No Logo Given!" className={bemBlocks.item("poster")} src={result._source.logo} width="170" style={{ margin: 'auto' }} />
        <div data-qa="position" className={bemBlocks.item("position")} dangerouslySetInnerHTML={{ __html: source.position }} style={{ position: 'absolute', top: '180px', left: '15px' }}>
        </div>
      </a>
    </div>
  )
}

// Rename
const MovieHitsListItem = (props) => {
  const { bemBlocks, result } = props
  let url = result._source.original_post_url
  const source = extend({}, result._source, result.highlight || {})
  // const company_search_url = `http://${host}:167.172.142.105/api/company/${source.company_name}`
  console.log(source)

  return (
    <Card>
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <div className={bemBlocks.item("poster")}>
        <img alt="No Logo Given!" data-qa="poster" src={source.company_logo_url || source.job_post_image_url} />
      </div>
      <div className={bemBlocks.item("details")}>
        <a href={url} >
          <h2 className={bemBlocks.item("title")}>{source.position_name}</h2>
        </a>
        <h3 className={bemBlocks.item("subtitle")}>
          <b>Company:</b>{source.company_name} <b>Date:</b> {source.external_api_published_at} <b>Tags:</b> {source.tags && source.tags.join(", ")} <b>Category:</b> {source.position_category}
        </h3>
        <div className={bemBlocks.item("text")} dangerouslySetInnerHTML={{__html:source.description_html}}></div>
      </div>
    </div>
    </Card>
  )
}


export default function Cassandra() {

  return <>
    <Grid xs={12} item>
    <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <TopBar>
            <SearchBox autofocus={true} searchOnChange={true} prefixQueryFields={["description^1"]}/>
          </TopBar>

        <LayoutBody>
          <LayoutResults>
            <ActionBar>

              <ActionBarRow>
                <HitsStats translations={{
                  "hitstats.results_found":"{hitCount} results found"
                }}/>
                <ViewSwitcherToggle/>
                <SortingSelector options={[
                  {label:"Relevance", field:"_score", order:"desc"},
                  {label:"Latest Releases", field:"external_api_published_at", order:"desc"},
                  {label:"Earliest Releases", field:"external_api_published_at", order:"asc"}
                ]}/>
              </ActionBarRow>

              <ActionBarRow>
                <GroupedSelectedFilters/>
                <ResetFilters/>
              </ActionBarRow>

            </ActionBar>
            <ViewSwitcherHits
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
                  {key:"list", title:"List", itemComponent:MovieHitsListItem, defaultOption:true}
                ]}
                scrollTo="body"
            />
            <NoHits suggestionsField={"position_name"}/>
            <Pagination showNumbers={true}/>
          </LayoutResults>

          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    </Grid>
    
    
  </>
}