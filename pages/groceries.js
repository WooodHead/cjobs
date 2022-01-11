import { Button, Grid } from "@material-ui/core"

// export const getStaticProps = async () => {
//     try {
//         const res = await fetch(`http://localhost:3001/api/cassandra`)
//         const groceries = await res.json()
//         return {
//             props: {
//                 groceries,
//             },
//         }
//     } catch (error) {
//         console.error("Error fetching homepage data", error);
//     }
// }

export default function Groceries() {
    // console.log(groceries.rows)
    return <>
        <Grid>
            <Button variant="contained">Click</Button>
        </Grid>
    </>
}