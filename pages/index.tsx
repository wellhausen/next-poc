import Head from 'next/head';
import SearchBar from '../components/SearchBar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Thirsty</title>
      </Head>

      <main>
        <div>
          <SearchBar />
        </div>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 3;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

