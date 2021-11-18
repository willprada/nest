import Head from "next/head";
import Browser from "../components/browser";
import Referrals from "../components/referrals";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Website basic scraper</title>
        <meta
          name="description"
          content="App to scrap hiperlinks from websites"
        />
      </Head>

      <main>
        <div className="block columns my-2">
          <div className="column is-half is-offset-one-quarter">
            <Browser />
            <Referrals />
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};


export default Home;