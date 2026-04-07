declare namespace Process {
  type GraphData = {
    nodes: Array<{
      id: string
      type: string
      x: number
      y: number
      text?: string
    }>
    edges: Array<{
      id?: string
      type?: string
      sourceNodeId: string
      targetNodeId: string
      text?: string
    }>
  }
}
