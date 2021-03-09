import { Edge, Node, ClusterNode } from '@swimlane/ngx-graph';

export const nodes: Node[] = [
    {
        id: 'first',
        label: 'Task1 (Form)',
        data: {
            status: 'finished'
        }
    }, {
        id: 'second',
        label: 'Task2 (Button)',
        data: {
            status: 'finished'
        }
    }, {
        id: 'c1',
        label: 'Task3 (Text)',
        data: {
            status: 'doing'
        }
    }, {
        id: 'c2',
        label: 'Task4 (Card)',
        data: {
            status: 'undo'
        }
    },
    {
        id: 'task5',
        label: 'Task5 (button)',
        data: {
            status: 'undo'
        }
    },
    {
        id: 'task6',
        label: 'Task6 (text)',
        data: {
            status: 'undo'
        }
    }

];

export const clusters: ClusterNode[] = [
    {
        id: 'third',
        label: 'C',
        childNodeIds: ['c1', 'c2']
    }
]

export const links: Edge[] = [
    {
        id: 'a',
        source: 'first',
        target: 'second',
        label: 'login'
    }, {
        id: 'b',
        source: 'first',
        target: 'c1',
        label: 'login'
    }, {
        id: 'd',
        source: 'first',
        target: 'c2',
        label: 'login'
    }
    , {
        id: 'e',
        source: 'c2',
        target: 'task5',
        label: 'getDepartment'
    }
    , {
        id: 'f',
        source: 'c2',
        target: 'task6',
        label: 'getDepartment'
    }

];