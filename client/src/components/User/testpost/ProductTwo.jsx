import React from 'react'

function ProductTwo() {
  return (
<div className="mx-auto grid gap-y-1 w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:space-y-0 lg:grid-cols-4">
  {Array.from({ length: 10 }).map((_, i) => (
    <div
      key={i}
      className="relative aspect-[16/9] w-auto rounded-md md:aspect-auto md:h-400"
    >
      <img
        src="https://images.unsplash.com/photo-1588099768531-a72d4a198538?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NnwxMTM4MTU1NXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="AirMax Pro"
        className="z-0 h-full w-full rounded-md object-cover"
        style={{ maxHeight: '250px' }}
      />
    </div>
  ))}
</div>


  )
}

export default ProductTwo