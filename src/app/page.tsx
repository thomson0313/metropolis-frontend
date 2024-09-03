import HomePageContainer from './_containers/HomePageContainer'
import BubbleMap from './_components/bubble-map'

import { projects } from './projects'

export default function Home() {
  const chains = ['ETH', 'BNB', 'SOL']

  return (
    <HomePageContainer>
      <main className="flex h-full w-full flex-col items-center justify-between">
        <BubbleMap projects={projects} chains={chains} />
      </main>
    </HomePageContainer>
  )
}
