import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <>
      <div className="px-4">
        <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">ZONE</h1>
          <span className="max-w-[750px] text-center text-lg font-light text-foreground" data-br=":r2l:" data-brr="1">
            Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
          </span>
          <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
            <Button asChild size="sm">
              <Link href="/zone">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/record">Record</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}
