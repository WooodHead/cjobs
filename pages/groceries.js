import { Grid, Card, CardContent, Typography } from "@material-ui/core";

export const getStaticProps = async () => {
  try {
    const res = await fetch(`http://localhost:3001/api/cassandra`);
    const groceries = await res.json();
    return {
      props: {
        groceries,
      },
    };
  } catch (error) {
    console.error("Error fetching homepage data", error);
  }
};

export default function Groceries({ groceries }) {
  console.log(groceries.rows);
  const cards = groceries.rows.map((item) => {
    return (
      <CardContent key={item.item_id}>
        <Typography variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{item.price_p_item}$</Typography>
      </CardContent>
    );
  });
  return (
    <>
      <Grid container spacing={10}>
        <Card sx={{ minWidth: 275 }}>{cards}</Card>
      </Grid>
    </>
  );
}
