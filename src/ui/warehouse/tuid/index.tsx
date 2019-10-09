import * as React from 'react';
import { TuidUI } from 'tonva';

const warehouse: TuidUI = {
    content: (values: any) => {
        let { name } = values;
        return <div>
            {name}
        </div>
    }
}

export default {
    warehouse: warehouse,
}
