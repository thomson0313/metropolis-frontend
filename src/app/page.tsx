import HomePageContainer from './_containers/HomePageContainer'
import BubbleMap from './_components/bubble-map'

import { projects } from './projects'
import Rewards from './_components/rewards'

export default function Home() {
  const chains = ['ETH', 'BNB', 'SOL']

  return (
    <HomePageContainer>
      <main className="flex h-auto w-full flex-col items-center justify-between scroll-auto">
        <div className='flex flex-col w-full'>
          <div className='flex'>
            <Rewards />
          </div>
          <div className='flex'>
            <BubbleMap projects={projects} chains={chains} />
          </div>
        </div>
      </main>
    </HomePageContainer>
  )
}
