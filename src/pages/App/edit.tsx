import React from 'react'
import { observer } from 'mobx-react';
import rootStore from '@/stores';

export default observer(() => {
  return <div>编辑应用{rootStore.app.appName}</div>
})
