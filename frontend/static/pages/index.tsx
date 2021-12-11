import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>WriteProse</title>
        <meta name="description" content="Write and share prose" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div className="flex flex-col items-center justify-center font-mono mt-24 text-center place-content-evenly space-y-10">
          <h1 className="mx-auto text-7xl">WriteProse<span className="blinking-cursor text-7xl">_</span> </h1>
          <p className="max-w-md">Write Prose is an app you can use to write prose in Markdown and share with anyone!</p>
          <h1 className="">Write and Share:</h1>
          <div className="typewriter mb-0" style={{ marginTop: 0}}><h1>Prose, Code, Notes, Documentation and more!</h1></div>
          <button className="px-24 h-10 bg-blue-600 text-blue-100 transition-color duration-150s rounded-lg focus:shadow-outline hover:bg-blue-700">Go to the App</button>
        </div>
      </main>
    </div>
  )
}

export default Home
