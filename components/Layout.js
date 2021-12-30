import styles from '../styles/Home.module.css'
import Head from 'next/head'

const Layout = ({ children }) => {
    return (
      <>
      <Head>
        <title>Cassandra Jobs</title>
        <meta name="We connect you to Cassandra jobs" content="Welcome to Cassandra.Jobs, a curated job board dedicated solely to Cassandra to help Apache Cassandra developers, administrators, and architects find their dream job" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className={styles.container}>
          <main className={styles.main}>
            {children}
          </main>
        </div>
      </>
    )
  }
  
  export default Layout