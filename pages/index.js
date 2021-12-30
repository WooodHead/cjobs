import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cassandra Jobs</title>
        <meta name="We connect you to Cassandra jobs" content="Welcome to Cassandra.Jobs, a curated job board dedicated solely to Cassandra to help Apache Cassandra developers, administrators, and architects find their dream job" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    </div>
  )
}
