export interface ISerie {
    type: 'line'| 'bar'
    data: any[]
    label?: {
        show: true,
        position: 'top',
    }
    stack?: string
    areaStyle?: {}
    lineStyle?: {}
    itemStyle?: {}
}