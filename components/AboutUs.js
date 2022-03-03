import { Container, Grid } from '@material-ui/core';
import classes from '../styles/AboutUs.module.css';

function AboutUs() {
  return (
    <Container maxWidth='lg'>
      <Grid className={classes.content}>
        <h1 className={classes.h1}>About Cassandra.Link</h1>
        <p>
          {
            'Welcome to Cassandra.Link, a knowledge base with videos, articles, and open source projects to help Apache Cassandra developers, administrators, and architects learn, participate, master, and then contribute to the Apache Cassandra community'
          }
        </p>
        <p>
          {
            "Apache Cassandra is one of the most forward looking Databases in the world. It is designed for now and the future. Our goal is to build a highly curated knowledge base and news feed so that anyone who's interested can keep their ear to the ground on what's happening with Cassandra and anything else that claims to be like Cassandra. This means more than Apache Cassandra today because CQL is used in Scylla, Yugabyte, Elassandra, and CosmosDB."
          }
        </p>
        <p>
          {'Most of us above work for '}
          <a
            className={classes.a}
            href='https://anant.us/'
            target='_blank'
            rel='noreferrer'
          >
            Anant Corporation
          </a>
          ,
          {
            " but that doesn't mean you have to work with us to work on this project. If you are interested in contributing, please fork the awesome-cassandra "
          }
          <a
            className={classes.a}
            href='https://github.com/Anant/awesome-cassandra'
            target='_blank'
            rel='noreferrer'
          >
            repository
          </a>
          {
            " and add content there, or create an issue with an idea that you have for the project. Sorry but we have to have some filter so that dead-beats don't waste our precious time."
          }
        </p>
        <p>
          {
            'All of the content is open source, but the system that builds this site is internal to Anant. We have open sourced parts of it at the '
          }
          <a
            className={classes.a}
            href='https://github.com/Appleseed'
            target='_blank'
            rel='noreferrer'
          >
            Appleseed Project
          </a>
        </p>
        <h2 className={classes.h2}>The Team</h2>
        <ul className={classes.ul}>
          <li className={classes.li}>Editor / Curator : Rahul Singh</li>
          <li className={classes.li}>Project Manager: Arpan Patel</li>
          <li className={classes.li}>
            Interface: Rahul Singh, Ryan Quey, Arpan Patel, Josh Barnes
          </li>
          <li className={classes.li}>
            Software: Ryan Quey, Arpan Patel, Josh Barnes, Stefan Nikolovski
          </li>
          <li className={classes.li}>
            Database: Rahul Singh, Jagannath Bilgi, Ryan Quey, Stefan Nikolovski
          </li>
          <li className={classes.li}>
            Systems : Jagannath Bilgi, Rahul Singh, Ryan Quey
          </li>
        </ul>
        <h2 className={classes.h2}>Alumini</h2>
        <ul className={classes.ul}>
          <li className={classes.li}>Project Manager: Tanaka Mapondera</li>
          <li className={classes.li}>
            Interface: Mohammad Danish Yousuf, Tanaka Mapondera, Rishi Nair
          </li>
          <li className={classes.li}>
            Software: Mohammad Danish Yousuf, Rishi Nair
          </li>
        </ul>
      </Grid>
    </Container>
  );
}

export default AboutUs;
