import { useRef, useEffect } from 'react'
import { observer } from 'mobx-react';
import engine from 'vitis-lowcode-engine'
import { getComponents } from '../../services/businessUnit'
import stores from '../../stores'

export default observer(() => {
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    engine.init(container.current);
    (async () => {
      if (stores.app.BUName) {
        const result = await getComponents(stores.app.BUName);
        engine.material.load(result.map(item => ({ npm: item.packageName, version: item.version })));
      }
    })();
  }, []);

  return <div ref={container} style={{height: '100%'}} >ddd</div>
})
