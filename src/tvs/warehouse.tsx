import * as React from 'react';

const tvWarehouse = (values: any) => {
    let { name } = values;
    return <div>
        {name}
    </div>
}

export const warehouse = {
    warehouse: tvWarehouse,
}
