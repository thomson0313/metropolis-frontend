'use client'

import { useEffect, useRef } from 'react'

interface Project {
  id: number
  ticker: string
  launchDate: string
  marketCap: number
  holders: number
  logoUrl: string
  category: string
}

interface BubbleMapProps {
  projects: Project[]
  chains: string[]
}

const BubbleMap: React.FC<BubbleMapProps> = ({ projects, chains }) => {
  const bubbleContainerRef = useRef<HTMLDivElement | null>(null)
  const bubbles: HTMLDivElement[] = []

  useEffect(() => {
    const bubbleContainer = bubbleContainerRef.current
    if (!bubbleContainer) return

    projects.forEach((project) => {
      const bubble = createBubble(project)
      bubbleContainer.appendChild(bubble)
    })

    function createBubble(project: Project) {
      const bubble = document.createElement('div')
      bubble.className =
        'absolute rounded-full border-2 border-primary-color flex flex-col justify-center items-center cursor-pointer text-text-color text-center select-none transform transition-transform duration-300 scale-100 hover:scale-110 hover:shadow-[0_0_20px_var(--secondary-color)] hover:bg-[rgba(255,105,180,0.3)]' +
        (project.marketCap <= 1500000
          ? ' bg-[radial-gradient(_var(--tw-gradient-stops))] from-[rgba(255,253,149,0)] from-0% to-[rgba(255,253,149,0.24)] to-100% border-[#FFFD95]'
          : project.marketCap >= 6000000
            ? ' bg-[url("../../public/assets/img/crypto_token/background.svg")] bg-cover bg-center bg-no-repeat border-none p-5'
            : ' bg-[radial-gradient(_var(--tw-gradient-stops))] from-[rgba(224,61,178,0)] from-0% to-[rgba(224,61,178,0.2)] to-100% border-[#E03DB2]')

      const size =
        Math.sqrt(project.marketCap) / 18 +
        33 +
        (project.marketCap >= 6000000 ? 40 : 0)
      bubble.style.width = `${size}px`
      bubble.style.height = `${size}px`
      bubble.style.position = 'absolute'

      bubble.style.left = `${Math.random() * (window.innerWidth - size)}px`
      bubble.style.top = `${Math.random() * (window.innerHeight - 77 - size)}px`

      const content = document.createElement('div')
      content.className =
        'w-full h-full flex flex-col justify-center items-center overflow-hidden'
      content.dataset.category = project.category

      const logoElement = document.createElement('img')
      const tickerElement = document.createElement('div')

      const randomChain = chains[Math.floor(Math.random() * chains.length)]

      logoElement.src = './assets/img/crypto_token/' + project.logoUrl
      tickerElement.textContent = project.ticker

      content.appendChild(logoElement)
      content.appendChild(tickerElement)

      bubble.appendChild(content)

      fitTextToBubble(tickerElement, project.ticker, size)
      makeDraggable(bubble)
      animateBubble(bubble)
      bubbles.push(bubble)

      return bubble
    }

    function fitTextToBubble(
      tickerElement: HTMLElement,
      ticker: string,
      bubbleSize: number,
    ) {
      const maxFontSize = bubbleSize / 6
      let fontSize = maxFontSize

      tickerElement.style.fontSize = `${fontSize}px`

      while (tickerElement.scrollWidth > tickerElement.offsetWidth) {
        fontSize -= 1
        tickerElement.style.fontSize = `${fontSize}px`
      }
    }

    function makeDraggable(element: HTMLDivElement) {
      let isDragging = false
      let offsetX = 0
      let offsetY = 0

      element.addEventListener('mousedown', function (event) {
        isDragging = true
        offsetX = event.clientX - element.getBoundingClientRect().left
        offsetY = event.clientY - element.getBoundingClientRect().top
        element.style.transition = 'none'
      })

      document.addEventListener('mousemove', function (event) {
        if (isDragging) {
          const newX = event.clientX - offsetX
          const newY = event.clientY - offsetY

          element.style.left = `${newX}px`
          element.style.top = `${newY}px`
        }
      })

      document.addEventListener('mouseup', function () {
        isDragging = false
        element.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'
      })
    }

    function animateBubble(bubble: HTMLDivElement) {
      let speed = Math.random() * 0.7 + 0.3
      const direction = Math.random() < 0.5 ? -1 : 1
      let isPaused = false

      function moveBubble() {
        if (!isPaused) {
          const currentTop = parseFloat(bubble.style.top)
          const newTop = currentTop + speed * direction

          if (
            newTop <= 0 ||
            newTop >= window.innerHeight - 77 - bubble.offsetHeight
          ) {
            speed *= -1
          }

          bubble.style.top = `${newTop}px`

          const newLeft =
            parseFloat(bubble.style.left) + (Math.random() - 0.5) * 1
          if (
            newLeft >= 0 &&
            newLeft <= window.innerWidth - bubble.offsetWidth
          ) {
            bubble.style.left = `${newLeft}px`
          }
        }
        requestAnimationFrame(moveBubble)
      }

      bubble.addEventListener('mouseenter', () => {
        isPaused = true
      })

      bubble.addEventListener('mouseleave', () => {
        isPaused = false
      })

      moveBubble()
    }

    return () => {}
  }, [projects, chains])

  return (
    <div
      id="bubble-container"
      className="relative h-full w-full"
      ref={bubbleContainerRef}
    />
  )
}

export default BubbleMap
