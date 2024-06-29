const printTree = require('../services/printTree');
describe('printTree', () => {
    beforeEach(() => {
        jest.spyOn(global.console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should print root node correctly', () => {
        const data = { name: 'root', items: [] };
        printTree({ data });
        expect(console.log).toHaveBeenCalledWith('    root');
    });

    it('should print tree structure with correct custom prefix', () => {
        const data = { name: 'root', items: [] };
        const prefix = 'testPrefix';
        printTree({ data, prefix });
        expect(console.log).toHaveBeenCalledWith(`${prefix}    root`);
    });

    it('should print tree structure with not a first item', () => {
        const data = { name: 'root', items: [] };
        printTree({ data, isFirst: false});
        expect(console.log).toHaveBeenCalledWith('└── root');
    });

    it('should print tree structure with not a first and not a last item', () => {
        const data = { name: 'root', items: [
                { name: 'child1', items: [] }
            ] };
        printTree({ data, isFirst: false, isLast: false});
        expect(console.log).toHaveBeenNthCalledWith(1, '├── root');
        expect(console.log).toHaveBeenNthCalledWith(2, '│   └── child1');
    });

    it('should print tree structure correctly', () => {
        const data = {
            name: 'root',
            items: [
                { name: 'child1', items: [] },
                { name: 'child2', items: [
                        { name: 'grandchild1', items: [] }
                    ] }
            ]
        };
        printTree({ data });

        expect(console.log).toHaveBeenNthCalledWith(1, '    root');
        expect(console.log).toHaveBeenNthCalledWith(2, '    ├── child1');
        expect(console.log).toHaveBeenNthCalledWith(3, '    └── child2');
        expect(console.log).toHaveBeenNthCalledWith(4, '        └── grandchild1');
    });

    it('should print tree structure correctly without any items in data', () => {
        const data = { name: 'root' };
        printTree({ data });
        expect(console.log).toHaveBeenCalledWith(`    root`);
    });
});