import Head from 'next/head'
import VideoCapture from '../components/videoCapture'
export default function Home() {
  return (
    <div>
      <Head>
        <title>Synesthesia</title>
        <meta name="description" content="synethesia simulator" />
      </Head>

      <main>
        <VideoCapture/>
      </main>
      <footer>
     
      </footer>
    </div>
  )
}
