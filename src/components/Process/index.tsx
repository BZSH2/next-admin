'use client'

import '@logicflow/core/dist/index.css'
import '@logicflow/extension/lib/style/index.css'
import { useEffect, useRef } from 'react'
import { dndPanelItems, processData } from './config'

type LogicFlowWithDnd = {
  render: (data?: Process.GraphData) => void
  destroy: () => void
  setPatternItems: (items: typeof dndPanelItems) => void
}

type LogicFlowCtor = new (options: {
  container: HTMLElement
  grid?: boolean
  keyboard?: { enabled?: boolean }
  plugins?: unknown[]
}) => LogicFlowWithDnd

declare global {
  interface Window {
    Core?: { LogicFlow?: LogicFlowCtor }
    Extension?: { DndPanel?: unknown }
  }
}

const CORE_SCRIPT_ID = 'logicflow-core-script'
const EXT_SCRIPT_ID = 'logicflow-extension-script'
const CORE_SCRIPT_URL = 'https://unpkg.com/@logicflow/core@2.1.11/dist/index.min.js'
const EXT_SCRIPT_URL = 'https://unpkg.com/@logicflow/extension@2.1.15/dist/index.min.js'
let logicFlowLoader: Promise<{ LogicFlow: LogicFlowCtor; DndPanel: unknown }> | null = null

const ensureScript = (id: string, src: string) =>
  new Promise<void>((resolve, reject) => {
    const existed = document.getElementById(id) as HTMLScriptElement | null
    if (existed?.dataset['loaded'] === 'true') {
      resolve()
      return
    }
    const script = existed ?? document.createElement('script')
    const onLoad = () => {
      script.dataset['loaded'] = 'true'
      resolve()
    }
    const onError = () => reject(new Error(`Failed to load script: ${src}`))
    script.addEventListener('load', onLoad, { once: true })
    script.addEventListener('error', onError, { once: true })
    if (existed) return
    script.id = id
    script.src = src
    script.async = true
    document.body.appendChild(script)
  })

const resolveLogicFlowRuntime = async () => {
  if (!logicFlowLoader) {
    logicFlowLoader = (async () => {
      await ensureScript(CORE_SCRIPT_ID, CORE_SCRIPT_URL)
      await ensureScript(EXT_SCRIPT_ID, EXT_SCRIPT_URL)
      const LogicFlow = window.Core?.LogicFlow
      const DndPanel = window.Extension?.DndPanel
      if (!LogicFlow || !DndPanel) throw new Error('LogicFlow runtime is not available')
      return { LogicFlow, DndPanel }
    })()
  }
  return logicFlowLoader
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const lfRef = useRef<LogicFlowWithDnd | null>(null)

  useEffect(() => {
    let destroyed = false

    const init = async () => {
      if (!containerRef.current || destroyed) return
      const { LogicFlow, DndPanel } = await resolveLogicFlowRuntime()
      if (!containerRef.current || destroyed) return
      const lf = new LogicFlow({
        container: containerRef.current,
        grid: true,
        keyboard: { enabled: true },
        plugins: [DndPanel],
      })
      lfRef.current = lf
      lf.render(processData)
      lf.setPatternItems(dndPanelItems)
    }
    void init()

    return () => {
      destroyed = true
      lfRef.current?.destroy()
      lfRef.current = null
    }
  }, [])

  return <div ref={containerRef} className="min-h-520px h-full w-full" />
}
