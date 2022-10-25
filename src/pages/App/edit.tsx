import { useRef, useEffect } from 'react'
import { observer } from 'mobx-react';
import engine from 'vitis-lowcode-engine'

export default observer(() => {
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    engine.init(container.current)
  }, []);

  return <div ref={container} />
})
