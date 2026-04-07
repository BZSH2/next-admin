import type { ShapeItem } from '@logicflow/extension'

/**
 * 示例流程数据
 * - 三个节点：开始 -> 审批 -> 完成
 * - 两条折线边：用于演示基础连线效果
 */
export const processData: Process.GraphData = {
  /** 节点定义：id 唯一，x/y 为画布坐标 */
  nodes: [
    { id: 'start', type: 'rect', x: 200, y: 120, text: '开始' },
    { id: 'approve', type: 'rect', x: 420, y: 120, text: '审批' },
    { id: 'done', type: 'rect', x: 640, y: 120, text: '完成' },
  ],
  /** 边定义：通过 sourceNodeId / targetNodeId 建立节点关系 */
  edges: [
    { sourceNodeId: 'start', targetNodeId: 'approve', type: 'polyline' },
    { sourceNodeId: 'approve', targetNodeId: 'done', type: 'polyline' },
  ],
}

export const dndPanelItems: ShapeItem[] = [
  {
    type: 'circle',
    label: '发起',
    text: '发起人',
  },
  {
    type: 'rect',
    label: '审批',
    text: '审批节点',
  },
  {
    type: 'diamond',
    label: '条件',
    text: '条件分支',
  },
  {
    type: 'rect',
    label: '抄送',
    text: '抄送节点',
  },
  {
    type: 'circle',
    label: '结束',
    text: '结束节点',
  },
]
